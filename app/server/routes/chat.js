const express = require('express')
const router = express.Router()
const Chat = require('./../models/chat')

//Get all the chats
router.get('/', async(req, res)=> {
    try {
        const chats = await Chat.find()
        res.json(chats)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Creating a Chat

router.post('/', async (req, res) => {
    const chat = new Chat({
      name: req.body.name,
    })
    try {
      const newChat = await chat.save()
      res.status(201).json(newChat)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

module.exports = router;
