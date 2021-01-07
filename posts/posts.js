const express = require('express');
const db = require('../data/db');
const comments = require('./comments/comments');
const router = express.Router();

router.use('/',comments)

router.get('/', (req,res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).send("Server Error in Data Retrieval")
            console.log(error)
        })
})

router.get('/:id', (req,res) => {
    const id = req.params.id
    db.findById(id)
        .then(post => {
            console.log("POST: ",post)
            !post.id ? 
            (res.status(404).json({ message: "The post with the specified ID does not exist." }) )  
            : 
            ( res.status(200).json(post) )

        })
        .catch(error => {
            res.status(500).send("Server 500 error!")
            console.log(error)
        })
})

router.post('/', (req,res) => {
    console.log("REQUESTS: " , req.body)
    const newPost = req.body
    
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else{
        db.insert(newPost)
            .then(p => {
                res.status(201).json(p)
            })
            .catch(err => {
                res.status(500).send("Error Posting! Server Issue")
            })
    }
})

router.delete('/:id', (req,res) => { 
    const { id } = req.params;

    db.remove(id)
        .then(post => {
            !post ? 
            ( res.status(404).json({ message: "The post with the specified ID does not exist." }) ) 
            : 
            ( res.sendStatus(204) )
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

router.put('/:id', (req,res)=> {
    const postUpdate = req.body;

    (!postUpdate.title && !postUpdate.contents) ? (
        res.status(400).send("Incorrect information inputted"))
        :
        (db.update(req.params.id,postUpdate)
            .then(post => {
                !post ? 
                ( res.status(404).json({ message: "The post with the specified ID does not exist." }) ) 
                : 
                (res.status(200).json(post))
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err)
            }))
})

module.exports = router;