const express = require('express')
const fs = require("fs")
const rawData = fs.readFileSync("server/databaseStructure.json")
const data = JSON.parse(rawData)
const DataBase = express.Router()

const writeFile = (newData, returnFunction) => {
    fs.writeFile('./server/databaseStructure.json', JSON.stringify(newData), returnFunction);
}

DataBase.get('/db/', (req, res) => {
    res.json(data)
})
DataBase.get('/db/users', (req, res) => {
    res.json(data.users)
})
DataBase.put('/db/users/id', (req, res) => {
    const body = req.body
    data.users.map((u) => {
        if(body.email)if(u.email === body.email){
            res.json({id: u.userId})
        }
        else if(body.username){
            let countUserNames = 0
            if(u.username === body.username) data.users.map((u2) => {
                if(u2.username === u.username) countUserNames += 1
            })
            if(countUserNames>=2){
                res.status(405).json({error: "Too many users with that name exist, please qurey with an email address."})
            }
            else{
                res.json({id: u.userId})
            }
        }
    })
    res.status(405).json({error: "User is un-findble"})
})
DataBase.get('/db/users/:user', (req, res) => {
    const user = req.params.user
    const users = data.users
    let found = false
    users.map(u => {
        if(u.userId===Number(user)){
            found = true
            res.json(u)
        }
    })
    if(!found)res.status(401).json({error: "No user with that ID exists"})
})
DataBase.get('/db/login', (req, res) => {
    const {email, password} = req.body
    const users = data.users
    let found = false
    users.map(u => {
        if(u.email===email && u.password===password) {
            found = true
            res.json({
                "username": u.username,
                "userID": u.userId
            })
        }
    })
    if(!found)res.status(401).json({error: "Email or Password is wrong"})
})
DataBase.get(['/db/:user/groups'], (req, res) => {
    const user = req.params.user
    const groups = data.groups
    let usersgroups = []
    groups.map(c => {
        c.members.map(m => {
            if(m.id===Number(user)){
                usersgroups.push(c)
            }
        })
    })
    if(usersgroups.length===0){
        res.send(null)
    }else {
        res.json(usersgroups)
    }
})
DataBase.put('/db/users/username', (req, res) => {
    const body = req.body
    const user = body.userId
    let found = false
    const newUsers = []
    const newGroups = []
    data.users.map((u) => {
        if(u.userId===user){
            found = true
            const newUser = {
                userId: u.userId,
                username: body.username,
                password: u.password
            }
            newUsers.push(newUser)
        }else{
            newUsers.push(u)
        }
    })
    if(!found)res.status(401).json({error: "No user with that ID exists"})
    data.groups = newGroups
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Username not Changed")
            return
        }
        res.send("Username Changed")
    })
})
DataBase.put('/db/users/password', (req, res) => {
    const body = req.body
    const user = body.userId
    let found = false
    const newUsers = []
    const newGroups = []
    data.users.map((u) => {
        if(u.userId===user){
            found = true
            const newUser = {
                userId: u.userId,
                username: u.username,
                password: body.password
            }
            newUsers.push(newUser)
        }else{
            newUsers.push(u)
        }
    })
    if(!found)res.status(401).json({error: "No user with that ID exists"})
    data.groups = newGroups
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Password not Changed")
            return
        }
        res.send("Password Changed")
    })
})
DataBase.post('/db/users', (req, res) => {
    const body = req.body
    const newUser = {
        userId: data.nextUserId,
        username: body.username,
        password: body.password,
        email: body.email
    }
    data.users.push(newUser)
    data.nextUserId+=1
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("User not Saved")
            return
        }
        res.send("User Saved")
    })
})
DataBase.delete('/db/users/:user', (req, res) => {
    const user = req.params.user
    let found = false
    const newUsers = []
    const newGroups = []
    data.users.map((u) => {
        if(u.userId===Number(user)){
            found = true
        }else{
            newUsers.push(u)
        }
    })
    if(!found)res.status(401).json({error: "No user with that ID exists"})
    data.groups = newGroups
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("User not Deleted")
            return
        }
        res.send("User Deleted")
    })
})
DataBase.get('/db/groups', (req, res) => {
    res.json(data.groups)
})
DataBase.get('/db/groups/:group', (req, res) => {
    const group = req.params.group
    const groups = data.groups
    let found = false
    groups.map(c => {
        if(c.groupId===Number(group)){
            found = true
            res.json(c)
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
})
DataBase.get('/db/groups/:group/isOneToOne', (req, res) => {
    const group = req.params.group
    let found = false
    let countMembers = 0
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            found = true
            g.members.map((m) => {
                countMembers += 1
            })
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
    if(countMembers===2)res.json({chat: true})
    res.json({chat: false})
})
DataBase.post('/db/groups', (req, res) => {
    const body = req.body
    const newGroup = {
        groupId: data.nextGroupId,
        nextMessageId: 0,
        messages: [],
        mambers: [
            {
                id: body.founderId,
                nickname: body.founderName
            }
        ]
    }
    data.groups.push(newGroup)
    data.nextGroupId+=1
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Group not Saved")
            return
        }
        res.send("Group Saved")
    })
})
DataBase.delete('/db/groups/:group', (req, res) => {
    const group = req.params.group
    let found = false
    const newGroups = []
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            found = true
        }else{
            newGroups.push(g)
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
    data.groups = newGroups
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Group not Updated")
            return
        }
        res.send("Group Updated")
    })
})
DataBase.put('/db/groups/:group/rename', (req, res) => {
    const body = req.body
    const group = req.params.group
    const user = body.memberId
    let foundGroup = false
    let foundUser = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            const newMembers = []
            g.members.map((m) => {
                if(m.id===Number(user)){
                    foundUser = true
                    const newMember = {
                        id: m.id,
                        nickname: body.memberName
                    }
                    newMembers.push(newMember)
                }else{
                    newMembers.push(m)
                }
            })
            g.mambers = newMembers
        }
    })
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID exists in this group"})
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Group not Updated")
            return
        }
        res.send("Group Updated")
    })
})
DataBase.post('/db/groups/:group/invite', (req, res) => {
    const body = req.body
    const group = req.params.group
    let found = false
    const newMember = {
        id: body.memberId,
        nickname: body.memberName
    }
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            found = true
            g.members.push(newMember)
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Group not Updated")
            return
        }
        res.send("Group Updated")
    })
})
DataBase.delete('/db/groups/:group/ban/:user', (req, res) => {
    const body = req.body
    const group = req.params.group
    const user = body.memberId
    let foundGroup = false
    let foundUser = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            const newMembers = []
            g.members.map((m) => {
                if(m.id===Number(user)){
                    foundUser = true
                }else{
                    newMembers.push(m)
                }
            })
            g.mambers = newMembers
        }
    })
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID exists in this group"})
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Group not Updated")
            return
        }
        res.send("Group Updated")
    })
})
DataBase.get('/db/groups/:group/latest/message', (req, res) => {
    const group = req.params.group
    let found = false
    let latest = {messageId: -1,}
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            found = true
            g.messages.map((m) => {
                if((latest.messageId===-1)||(m.time > latest.time)){
                    latest = m
                }
            })
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
    res.json(latest)
})
DataBase.put('/db/groups/:group/:message/edit', (req, res) => {
    const body = req.body
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            const newMessages = []
            g.messages.map((m) => {
                if(m.messageId===Number(message)){
                    foundMessage = true
                    const newMessage = {
                        messageId: m.messageId,
                        content: body.content,
                        author: m.author,
                        reactions: m.reactions,
                        time: m.time
                    }
                    newMessages.push(newMessage)
                }else{
                    newMessages.push(m)
                }
            })
            if(foundMessage){
                g.messages = newMessages
                writeFile(data, (error) => {
                    if(error){
                        res.status(404).send("Message not Sent")
                        return
                    }
                    res.send("Message Sent")
                })}
        }
    })
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
DataBase.post('/db/groups/:group/post', (req, res) => {
    const body = req.body
    const group = req.params.group
    let found = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            found = true
            const newMessage = {
                messageId: g.nextMessageId,
                content: body.content,
                author: body.authorId,
                reactions: [],
                time: body.timestamp
            }
            g.messages.push(newMessage)
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Message not Sent")
            return
        }
        res.send("Message Sent")
    })
})
DataBase.delete('/db/groups/:group/:message/delete', (req, res) => {
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            const newMessages = []
            g.messages.map((m) => {
                if(m.messageId===Number(message)){
                    foundMessage = true
                }else{
                    newMessages.push(m)
                }
            })
            if(foundMessage){
                g.messages = newMessages
                writeFile(data, (error) => {
                    if(error){
                        res.status(404).send("Message not Removed")
                        return
                    }
                    res.send("Message Removed")
                })}
        }
    })
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
DataBase.get('/db/groups/:group/:message/react/:user', (req, res) => {
    const group = req.params.group
    const message = req.params.message
    const user = req.params.user
    let foundGroup = false
    let foundMessage = false
    let foundUser = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            g.mambers.map((m) => {
                if(m.id===Number(user)){
                    foundUser = true
                }
            })
            if(foundUser){
                g.messages.map((m) => {
                    if(m.messageId===Number(message)){
                        foundMessage = true
                        m.reactions.map((r) => {
                            if(Number(user)===r.author){
                                res.json({icon: r.icon})
                            }
                        })
                        res.json(null)
    }})}}})
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID is part of this group"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
DataBase.put('/db/groups/:group/:message/react', (req, res) => {
    const body = req.body
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    let foundUser = false
    let foundReaction = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            g.mambers.map((m) => {
                if(m.id===body.authorId){
                    foundUser = true
                }
            })
            if(foundUser){
                g.messages.map((m) => {
                    if(m.messageId===Number(message)){
                        foundMessage = true
                        let newReactions = []
                        m.reactions.map((r) => {
                            if(body.authorId===r.author){
                                foundReaction = true
                                const newReaction = {
                                    icon: body.icon,
                                    author: r.author
                                }
                                newReactions.push(newReaction)
                            }else{
                                newReactions.push(r)
                            }
                        })
                        m.reactions = newReactions
                        if(!foundReaction){
                            res.status(401).json({error: "This user has no reaction to edit"})
                        }else{
                            writeFile(data, (error) => {
                                if(error){
                                    res.status(404).send("Reaction not Changed")
                                    return
                                }
                                res.send("Reaction Changed")
    })}}})}}})
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID is part of this group"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
DataBase.post('/db/groups/:group/:message/react', (req, res) => {
    const body = req.body
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    let foundUser = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            g.mambers.map((m) => {
                if(m.id===body.authorId){
                    foundUser = true
                }
            })
            if(foundUser){
                g.messages.map((m) => {
                    if(m.messageId===Number(message)){
                        m.reactions.map((r) => {
                            if(body.authorId===r.author){
                                res.status(401).json({error: "This user already has a reaction to this message"})
                            }
                        })
                        const newReaction = {
                            icon: body.icon,
                            author: body.authorId
                        }
                        m.reactions.push(newReaction)
                        writeFile(data, (error) => {
                            if(error){
                                res.status(404).send("Reaction not Added")
                                return
                            }
                            res.send("Reaction Added")
    })}})}}})
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID is part of this group"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
DataBase.delete('/db/groups/:group/:message/react', (req, res) => {
    const body = req.body
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    let foundUser = false
    let foundReaction = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            g.mambers.map((m) => {
                if(m.id===body.authorId){
                    foundUser = true
                }
            })
            if(foundUser){
                g.messages.map((m) => {
                    if(m.messageId===Number(message)){
                        foundMessage = true
                        let newReactions = []
                        m.reactions.map((r) => {
                            if(body.authorId===r.author){
                                foundReaction = true
                            }else{
                                newReactions.push(r)
                            }
                        })
                        m.reactions = newReactions
                        if(!foundReaction){
                            res.status(401).json({error: "This user has no reaction to remove"})
                        }else{
                            writeFile(data, (error) => {
                                if(error){
                                    res.status(404).send("Reaction not Removed")
                                    return
                                }
                                res.send("Reaction Removed")
    })}}})}}})
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundUser)res.status(401).json({error: "No user with that ID is part of this group"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
})
module.exports = DataBase