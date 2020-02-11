const express = require('express')

const Posts = require('./data/db')

const router = express.Router()

router.get('/', (req, res) => {
    const pag = req.query

    console.log('pagination', pag)
    Posts.find(pag)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log('error 500', err)
            res.status(500).json({ error: 'The posts information could not be retrieved.'})
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then (post => {
            if(post){
                res.status(200).json(post)
            }else{
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({ error: 'The comments information could not be retrieved.' })
        })
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then (post => {
            if(post){
                res.status(200).json(post)
            }else{
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({ error: 'The post information could not be retrieved.' })
        })
})

router.post('/', (req, res) => {
    const postInfo = req.body
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
    }else{
        Posts.insert(postInfo)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: 'There was an error while saving the post to the database' })
            })
    }
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(removed => {
            if (removed === undefined){
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }else{
                res.status(200).json(removed)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'The post could not be removed'})
        })
})

router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
        .then(post => {
            if(post === undefined){
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }else if(!req.body.title || !req.body.contents){
                res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
            }else{
                res.status(200).json(post)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'The post information could not be modified.' })
        })
})

module.exports = router