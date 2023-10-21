const express = require("express");
const fs = require("fs");
const rawData = fs.readFileSync("server/databaseStructure.json");
const data = JSON.parse(rawData);
const DataBase = express.Router();

const writeFile = (newData, returnFunction) => {
  fs.writeFile(
    "./server/databaseStructure.json",
    JSON.stringify(newData),
    returnFunction
  );
};

DataBase.get("/api/", (req, res) => {
  res.json(data);
});
DataBase.get("/api/users", (req, res) => {
  res.json(data.users);
});
//What is this one doing?
DataBase.put("/api/users/id", (req, res) => {
  const body = req.body;
  data.users.map((u) => {
    if (body.email)
      if (u.email === body.email) {
        res.json({ id: u.userId });
      } else if (body.username) {
        let countUserNames = 0;
        if (u.username === body.username)
          data.users.map((u2) => {
            if (u2.username === u.username) countUserNames += 1;
          });
        if (countUserNames >= 2) {
          res.status(405).json({
            error:
              "Too many users with that name exist, please qurey with an email address.",
          });
        } else {
          res.json({ id: u.userId });
        }
      }
  });
  res.status(405).json({ error: "User is un-findble" });
});
//refactored
DataBase.get("/api/users/:user", (req, res) => {
  const userId = Number(req.params.user);
  if (!userId) {
    return res.status(400).json({ error: "A valid user ID is required" });
  }
  const user = data.users.find((u) => u.userId === userId);
  if (!user) {
    return res.status(404).json({ error: "No user with that ID exists" });
  }
  res.json(user);
});
//GroupList with specific content for sidebar might not like this approach consult with Andrew
DataBase.get("/api/:user/groups", (req, res) => {
  const userId = Number(req.params.user);
  if (!userId) {
    return res.status(400).json({ error: "User ID must be a valid number" });
  }
  const usersGroups = data.groups
    .filter((group) => group.members.some((member) => member.id === userId))
    .map((group) => {
      let lastMessage = null;
      if (group.messages && group.messages.length > 0) {
        const sortedMessages = group.messages.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        lastMessage = sortedMessages[0];
      }
      return {
        groupId: group.groupId,
        name: group.name,
        lastMessage: lastMessage
          ? {
              messageId: lastMessage.messageId,
              content: lastMessage.content,
              authorId: lastMessage.authorId,
              createdAt: lastMessage.createdAt,
            }
          : null, //return null if no messages
        isGroup: group.isGroup,
      };
    });
  if (!usersGroups.length) {
    return res.status(404).json({ error: "No groups found for this user" });
  }
  res.json(usersGroups);
});

//refactored
DataBase.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Email or Password is wrong" });
  }
  res.json({
    userID: user.userId,
    username: user.username,
  });
});
//refactored
// DataBase.get("/api/:user/groups", (req, res) => {
//   const userId = Number(req.params.user);
//   if (!userId) {
//     return res.status(400).json({ error: "User ID must be a valid number" });
//   }
//   const usersGroups = data.groups.filter((group) =>
//     group.members.some((member) => member.id === userId)
//   );
//   if (!usersGroups.length) {
//     return res.status(404).json({ error: "No groups found for this user" });
//   }
//   res.json(usersGroups);
// });
//refactored
DataBase.put("/api/user/username", (req, res) => {
  const { userId, username } = req.body;
  if (!userId || !username) {
    return res.status(400).send("User ID and username are required");
  }
  const userIndex = data.users.findIndex((u) => u.userId === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "No user with that ID exists" });
  }
  data.users[userIndex].username = username;
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Username not changed");
    }
    res.send("Username Changed");
  });
});
//refactored
DataBase.put("/api/user/password", (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).send("User ID and password required");
  }
  const userIndex = data.users.findIndex((u) => u.userId === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "No user with that ID exists" });
  }
  data.users[userIndex].password = password;
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Password not changed");
    }
    res.send("Password Changed");
  });
});
//refactored
DataBase.post("/api/register/user", (req, res) => {
  const { username, email, password } = req.body;
  const emailExists = data.users.some((user) => user.email === email);
  if (emailExists) {
    res.status(400).send("Email already in use");
  } else {
    const newUser = {
      userId: data.nextUserId++,
      username,
      password,
      email,
    };
    data.users.push(newUser);
    writeFile(data, (error) => {
      if (error) {
        res.status(500).send("Internal Server Error: User not saved");
        return;
      }
      res.send("User Registered");
    });
  }
});
//refactored
DataBase.delete("/api/users/:user", (req, res) => {
  const userId = Number(req.params.user);
  if (!userId) {
    return res.status(400).send("User ID is required");
  }
  const userIndex = data.users.findIndex((u) => u.userId === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "No user with that ID exists" });
  }
  data.users.splice(userIndex, 1);
  writeFile(data, (error) => {
    if (error) {
      return res.status(500).send("Internal Server Error: User not deleted");
    }
    res.status(200).send("User Deleted");
  });
});
//////////////////////////////////////////////Groups///////////////////////////////////////////////////////////
DataBase.get("/api/groups", (req, res) => {
  res.json(data.groups);
});
//refactored
DataBase.get("/api/groups/:group", (req, res) => {
  const groupId = Number(req.params.group);
  if (!groupId) {
    return res.status(400).json({ error: "A valid group ID is required" });
  }
  const group = data.groups.find((g) => g.groupId === groupId);
  if (!group) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  res.json(group);
});
//Might remove this
DataBase.get("/api/groups/:group/isOneToOne", (req, res) => {
  const group = req.params.group;
  let found = false;
  let countMembers = 0;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      found = true;
      g.members.map((m) => {
        countMembers += 1;
      });
    }
  });
  if (!found) res.status(401).json({ error: "No group with that ID exists" });
  if (countMembers === 2) res.json({ chat: true });
  res.json({ chat: false });
});
//refactored
DataBase.post("/api/group", (req, res) => {
  const { members, name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "The 'name' of the group is required." });
  }
  if (!Array.isArray(members) || members.length < 2) {
    return res
      .status(400)
      .json({ error: "A group should have at least two member." });
  }
  const hasInvalidMember = members.some(
    (member) => !member.id || !member.nickname
  );
  if (hasInvalidMember) {
    return res
      .status(400)
      .json({ error: "Every member needs to have an 'id' and a 'nickname'." });
  }
  // Determine if it's a group based on the number of members
  const isGroup = members.length > 2;
  const newGroup = {
    groupId: data.nextGroupId++,
    name: name,
    nextMessageId: 0,
    messages: [],
    members: members,
    isGroup: isGroup,
  };
  data.groups.push(newGroup);
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Unable to save group");
    }
    res.status(201).json(newGroup);
  });
});
//refactored
DataBase.delete("/api/groups/:group", (req, res) => {
  const groupId = Number(req.params.group);
  const groupIndex = data.groups.findIndex((g) => g.groupId === groupId);
  if (groupIndex === -1) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  data.groups.splice(groupIndex, 1);
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Unable to delete group");
    }
    res.status(200).send("Group deleted successfully");
  });
});

// Don't worry about this for now
DataBase.put("/api/groups/:group/renameMember", (req, res) => {
  const body = req.body;
  const group = req.params.group;
  const user = body.memberId;
  let foundGroup = false;
  let foundUser = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      const newMembers = [];
      g.members.map((m) => {
        if (m.id === Number(user)) {
          foundUser = true;
          const newMember = {
            id: m.id,
            nickname: body.memberName,
          };
          newMembers.push(newMember);
        } else {
          newMembers.push(m);
        }
      });
      g.mambers = newMembers;
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundUser)
    res
      .status(401)
      .json({ error: "No user with that ID exists in this group" });
  writeFile(data, (error) => {
    if (error) {
      res.status(404).send("Group not Updated");
      return;
    }
    res.send("Group Updated");
  });
});
//refactored
DataBase.post("/api/groups/:group/invite", (req, res) => {
  const groupId = Number(req.params.group);
  const { memberId, memberName } = req.body;
  if (!groupId || !memberId || !memberName) {
    return res.status(400).json({
      error: "Valid group ID, member ID, and member name are required",
    });
  }
  const group = data.groups.find((g) => g.groupId === groupId);
  if (!group) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  if (!group.isGroup) {
    return res.status(400).json({
      error: "Members cannot be added to this entity because it is not a group",
    });
  }
  const isMemberAlready = group.members.some(
    (member) => member.id === memberId
  );
  if (isMemberAlready) {
    return res
      .status(409)
      .json({ error: "User is already a member of this group" });
  }
  const newMember = {
    id: memberId,
    nickname: memberName,
  };
  group.members.push(newMember);
  writeFile(data, (error) => {
    if (error) {
      return res.status(500).send("Internal Server Error: Unable to update group");
    }
    res.status(200).send("Group Updated");
  });
});
//refactored
DataBase.delete("/api/groups/:group/ban/:user", (req, res) => {
  const groupId = Number(req.params.group);
  const userId = Number(req.params.user);
  if (!groupId || !userId) {
    return res.status(400).json({ error: "Valid group ID and user ID are required" });
  }
  const group = data.groups.find((g) => g.groupId === groupId);
  if (!group) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  const userIndex = group.members.findIndex((member) => member.id === userId);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ error: "No user with that ID exists in this group" });
  }
  group.members.splice(userIndex, 1);
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Unable to update group");
    }
    res.status(200).send("User banned from group");
  });
});
//Might remove this
DataBase.get("/api/groups/:group/latest/message", (req, res) => {
  const group = req.params.group;
  let found = false;
  let latest = { messageId: -1 };
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      found = true;
      g.messages.map((m) => {
        if (latest.messageId === -1 || m.time > latest.time) {
          latest = m;
        }
      });
    }
  });
  if (!found) res.status(401).json({ error: "No group with that ID exists" });
  res.json(latest);
});
///refactored
DataBase.put("/api/groups/:group/:message/edit", (req, res) => {
  const { content } = req.body;
  const groupId = Number(req.params.group);
  const messageId = Number(req.params.message);
  if (!content) {
    return res.status(400).json({ error: "Content for update is required" });
  }
  const group = data.groups.find((g) => g.groupId === groupId);
  if (!group) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  const messageIndex = group.messages.findIndex(
    (m) => m.messageId === messageId
  );
  if (messageIndex === -1) {
    return res.status(404).json({ error: "No message with that ID exists" });
  }
  const updatedAtISO = new Date().toISOString().split(".")[0] + "Z";
  group.messages[messageIndex].content = content;
  group.messages[messageIndex].updatedAt = updatedAtISO;
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error: Unable to update message" });
    }
    res.status(200).json({ message: "Message Updated" });
  });
});

//refactored
DataBase.post("/api/groups/:group/post", (req, res) => {
  const { content, authorId, author } = req.body;
  const groupId = Number(req.params.group);
  if (!content || !authorId || !author) {
    return res.status(400).json({
      error: "Content, author ID, and author name are required",
    });
  }
  const group = data.groups.find((g) => g.groupId === groupId);
  if (!group) {
    return res.status(404).json({ error: "No group with that ID exists" });
  }
  const createdAtISO = new Date().toISOString().split(".")[0] + "Z";
  const newMessage = {
    messageId: group.nextMessageId,
    content: content,
    authorID: authorId,
    author: author, // username
    reactions: [],
    createdAt: createdAtISO,
    updatedAt: createdAtISO,
  };
  group.messages.push(newMessage);
  group.nextMessageId++;
  writeFile(data, (error) => {
    if (error) {
      return res
        .status(500)
        .send("Internal Server Error: Unable to post message");
    }
    res.status(200).send("Message Posted");
  });
});
//To be refactored : Currently not a feature in the front end
DataBase.delete("/api/groups/:group/:message/delete", (req, res) => {
  const group = req.params.group;
  const message = req.params.message;
  let foundGroup = false;
  let foundMessage = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      const newMessages = [];
      g.messages.map((m) => {
        if (m.messageId === Number(message)) {
          foundMessage = true;
        } else {
          newMessages.push(m);
        }
      });
      if (foundMessage) {
        g.messages = newMessages;
        writeFile(data, (error) => {
          if (error) {
            res.status(404).send("Message not Removed");
            return;
          }
          res.send("Message Removed");
        });
      }
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundMessage)
    res.status(401).json({ error: "No message with that ID exists" });
});

DataBase.get("/api/groups/:group/:message/react/:user", (req, res) => {
  const group = req.params.group;
  const message = req.params.message;
  const user = req.params.user;
  let foundGroup = false;
  let foundMessage = false;
  let foundUser = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      g.mambers.map((m) => {
        if (m.id === Number(user)) {
          foundUser = true;
        }
      });
      if (foundUser) {
        g.messages.map((m) => {
          if (m.messageId === Number(message)) {
            foundMessage = true;
            m.reactions.map((r) => {
              if (Number(user) === r.author) {
                res.json({ icon: r.icon });
              }
            });
            res.json(null);
          }
        });
      }
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundUser)
    res
      .status(401)
      .json({ error: "No user with that ID is part of this group" });
  if (!foundMessage)
    res.status(401).json({ error: "No message with that ID exists" });
});
DataBase.put("/api/groups/:group/:message/react", (req, res) => {
  const body = req.body;
  const group = req.params.group;
  const message = req.params.message;
  let foundGroup = false;
  let foundMessage = false;
  let foundUser = false;
  let foundReaction = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      g.mambers.map((m) => {
        if (m.id === body.authorId) {
          foundUser = true;
        }
      });
      if (foundUser) {
        g.messages.map((m) => {
          if (m.messageId === Number(message)) {
            foundMessage = true;
            let newReactions = [];
            m.reactions.map((r) => {
              if (body.authorId === r.author) {
                foundReaction = true;
                const newReaction = {
                  icon: body.icon,
                  author: r.author,
                };
                newReactions.push(newReaction);
              } else {
                newReactions.push(r);
              }
            });
            m.reactions = newReactions;
            if (!foundReaction) {
              res
                .status(401)
                .json({ error: "This user has no reaction to edit" });
            } else {
              writeFile(data, (error) => {
                if (error) {
                  res.status(404).send("Reaction not Changed");
                  return;
                }
                res.send("Reaction Changed");
              });
            }
          }
        });
      }
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundUser)
    res
      .status(401)
      .json({ error: "No user with that ID is part of this group" });
  if (!foundMessage)
    res.status(401).json({ error: "No message with that ID exists" });
});
//UNtested
DataBase.post("/api/groups/:group/:message/react", (req, res) => {
  const body = req.body;
  const group = req.params.group;
  const message = req.params.message;
  let foundGroup = false;
  let foundMessage = false;
  let foundUser = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      g.mambers.map((m) => {
        if (m.id === body.authorId) {
          foundUser = true;
        }
      });
      if (foundUser) {
        g.messages.map((m) => {
          if (m.messageId === Number(message)) {
            m.reactions.map((r) => {
              if (body.authorId === r.author) {
                res.status(401).json({
                  error: "This user already has a reaction to this message",
                });
              }
            });
            const newReaction = {
              icon: body.icon,
              author: body.authorId,
            };
            m.reactions.push(newReaction);
            writeFile(data, (error) => {
              if (error) {
                res.status(404).send("Reaction not Added");
                return;
              }
              res.send("Reaction Added");
            });
          }
        });
      }
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundUser)
    res
      .status(401)
      .json({ error: "No user with that ID is part of this group" });
  if (!foundMessage)
    res.status(401).json({ error: "No message with that ID exists" });
});
//UnTESTED
DataBase.delete("/api/groups/:group/:message/react", (req, res) => {
  const body = req.body;
  const group = req.params.group;
  const message = req.params.message;
  let foundGroup = false;
  let foundMessage = false;
  let foundUser = false;
  let foundReaction = false;
  data.groups.map((g) => {
    if (g.groupId === Number(group)) {
      foundGroup = true;
      g.mambers.map((m) => {
        if (m.id === body.authorId) {
          foundUser = true;
        }
      });
      if (foundUser) {
        g.messages.map((m) => {
          if (m.messageId === Number(message)) {
            foundMessage = true;
            let newReactions = [];
            m.reactions.map((r) => {
              if (body.authorId === r.author) {
                foundReaction = true;
              } else {
                newReactions.push(r);
              }
            });
            m.reactions = newReactions;
            if (!foundReaction) {
              res
                .status(401)
                .json({ error: "This user has no reaction to remove" });
            } else {
              writeFile(data, (error) => {
                if (error) {
                  res.status(404).send("Reaction not Removed");
                  return;
                }
                res.send("Reaction Removed");
              });
            }
          }
        });
      }
    }
  });
  if (!foundGroup)
    res.status(401).json({ error: "No group with that ID exists" });
  if (!foundUser)
    res
      .status(401)
      .json({ error: "No user with that ID is part of this group" });
  if (!foundMessage)
    res.status(401).json({ error: "No message with that ID exists" });
});
module.exports = DataBase;
