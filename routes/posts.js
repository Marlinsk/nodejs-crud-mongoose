const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({ message: error });
    }
});

// Create a Post
router.post('/', async (req,res) => {
    const post = new Post({
        name: req.body.name,
        mythology: req.body.mythology,
        description: req.body.description
    });
    
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(error) {
        res.json({ message: error });
    }
});

// Get specific post
router.get('/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);    
    } catch (error) {
        res.json({ message: error });
    }
    
});

// Update a post
router.patch('/:postId', async (req,res) => {
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.postId}, 
            { $set: { name: req.body.name }},
            { $set: { mythology: req.body.mythology }},
            { $set: { description: req.body.description }}
            );
        res.json(updatePost);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete a post
router.delete('/:postId', async (req,res) =>{
    try {    
        const removedPost =  await Post.remove({_id: req.params.postId});
        res.json(removedPost);    
    } catch (error) {
        res.json({ message: error });
    }
})

module.exports = router;