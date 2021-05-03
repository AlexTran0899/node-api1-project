// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

//get
server.get('/api/user', (req, res) => {
    User.find()
      .then(dogs => {
        console.log(dogs)
        res.json(dogs)
      })
      .catch(err => {
        res.status(500).json({
          error: 'something went bad getting all dogs',
          message: err.message,
          stack: err.stack,
        })
      })
  })

//get by id

server.get('/api/user/:id', async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status.json({
                message: `id ${req.params.id} does not exist`,
            })
        } else {
            res.json(user)
        }
    }catch(err){
        res.status(500).json({
            error: "something went bad getting that user stuff",
            message: err.message,
            stack: err.stack
        })
    }
})


// post
server.post('/api/user', async(req, res)=>{
    try{
        const newUserData = req.body
        if(!newUserData.name || !newUserData.bio){
            res.status(422).json({
                message: " name and bio are require"
            })
        }else{
            const newUser = await User.insert(newUserData)
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({
            error: "something went bad getting that user stuff",
            message: err.message,
            stack: err.stack
        })
    }
})


// put

server.put('/api/user/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const {name,bio} = req.body
        if(!name || !bio){
            res.status(422).json({
                message: "name and bio are require!"
            })
        }else{
            const updateUser = await User.update(id, {name, bio})
            if (!updateUser){
                res.status(404).json({
                    message: `user with id ${req.params.id} does not exist`
                })
            }else {
                res.json(updateUser)
            }
        }
    }catch(err){
        res.status(500).json({
            error: "something went bad getting that user stuff",
            message: err.message,
            stack: err.stack
        })
    }
})

//delete

server.delete('/api/user/:id', (req,res)=>{
    User
    .remove(req.params.id)
    .then(data =>{
        console.log("deleted", data)
        res.json(data)
    })
    .catch(err => {
    res.status(500).json({
        error: "something went bad getting that user stuff",
        message: err.message,
        stack: err.stack
    })})

})


module.exports = server; // EXPORT YOUR SERVER instead of {}
