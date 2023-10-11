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

DataBase.post('/db/users', (req, res) => {
    const body = req.body
    const newUser = {
        userId: data.nextUserId,
        username: body.username,
        password: body.password
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
        res.status(401).json({error: "This user has no groups yet."})
    }else {
        res.json(usersgroups)
    }
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
                reactions: []
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

DataBase.post('/db/groups/:group/:message/react', (req, res) => {
    const body = req.body
    const group = req.params.group
    const message = req.params.message
    let foundGroup = false
    let foundMessage = false
    data.groups.map((g) => {
        if(g.groupId===Number(group)){
            foundGroup = true
            g.messages.map((m) => {
                if(m.messageId===Number(message)){
                    foundMessage = true
                    m.reactions.map((r) => {
                        if(body.authorId===r.author){
                            if(body.icon===r.icon){
                                //delete reaction
                            }else{
                                //re-label reaction
                            }
                        }
                    })
                    const newReaction = {
                        icon: body.icon,
                        author: body.authorId
                    }
                    m.reactions.push(newReaction)
                }
            })
        }
    })
    if(!foundGroup)res.status(401).json({error: "No group with that ID exists"})
    if(!foundMessage)res.status(401).json({error: "No message with that ID exists"})
    writeFile(data, (error) => {
        if(error){
            res.status(404).send("Message not Sent")
            return
        }
        res.send("Message Sent")
    })
})

module.exports = DataBase