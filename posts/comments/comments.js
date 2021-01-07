const express = require('express');
const db = require('../../data/db');

const router = express.Router();

router.get('/:id/comments', (req,res) => {
    db.findPostComments(req.params.id)
        .then(comments => {
            !comments.id ? 
            (res.status(404).json({ message: "The post with the specified ID does not exist." }))
            :
            ( res.status(200).json(comments) )
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Error Getting Comments")
        })
})

router.post('/:id/comments',(req,res) => {
    const newComment = req.body
    console.log(newComment)
    newComment.post_id = req.params.id
    !newComment.text ? (
        res.status(400).send("Enter a text and post")
    ):(

        db.insertComment(newComment)
            .then(comm => {
                console.log(comm)
                res.status(201).json(comm)
            })
            .catch(err => {
                console.log(err)
                err.errno === 19 ? 
                (res.status(404).json({ message: "The post with the specified ID does not exist." }))
                :
                (res.status(500).json({ error: "There was an error while saving the comment to the database" }))
                
            })
    )
})
//Still to add more error handling to POST
module.exports = router