const express = require('express')
const fs = require("fs")
const rawData = fs.readFileSync("server/databaseStructure.json")
const data = JSON.parse(rawData)
const DataBase = express.Router()

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

DataBase.get(['/db/chats','/db/groups'], (req, res) => {
    res.json(data.chats)
})

DataBase.get(['/db/chats/:chat','/db/groups/:chat'], (req, res) => {
    const chat = req.params.chat
    const chats = data.chats
    let found = false
    chats.map(c => {
        if(c.groupId===Number(chat)){
            found = true
            res.json(c)
        }
    })
    if(!found)res.status(401).json({error: "No group with that ID exists"})
})

DataBase.get(['/db/:user/chats','/db/:user/groups'], (req, res) => {
    const user = req.params.user
    const chats = data.chats
    let usersChats = []
    chats.map(c => {
        c.members.map(m => {
            if(m.id===Number(user)){
                usersChats.push(c)
            }
        })
    })
    if(usersChats.length===0){
        res.status(401).json({error: "This user has no groups yet."})
    }else {
        res.json(usersChats)
    }
})

module.exports = DataBase