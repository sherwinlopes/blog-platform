const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/',async(req, res) => {
    const{title, content, author} = req.body;

    try{
        const newPost = new Post({title, content, author});
        await newPost.save();
        res.status(201).json({message: 'Post created successfully'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to save post at backend'});
    }
});


router.get('/', async (req,res) => {
    try{
        const posts = await Post.find().sort({ created: -1});
        res.json(posts);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Failed to fecth from backend'});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ error: 'Post not found'});
        }
        res.json(post);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to fecth from backend'});
    }
});

module.exports = router;