const router = require('express').Router()
const { promise } = require('bcrypt/promises')
const Post = require('../models/Post')
const User = require('../models/User')


// créer un post
router.post('/',async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    }catch(err){
        res.status(500).json(err)
    }
})


// mettre à jour un post
router.put('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body})
        res.status(200).json("the post has been updated")
    }else{
        return res.status(403).json('you can only update your post')
    }
}catch(err){
    res.status(500).json(err)
    }
    
})
// supprimer un post
router.delete('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
    if(post.userId === req.body.userId){
        await post.deleteOne()
        res.status(200).json("the post has been deleted")
    }else{
        return res.status(403).json('you can only delete your post')
    }
}catch(err){
    res.status(500).json(err)
    }
    
})


// liker ou siliker un post
router.put('/:id/like',async (req,res)=>{
   try{
    const post = await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({ $push:{ likes:req.body.userId } })
        res.status(200).json('post has been liked')
    }else{
        await post.updateOne({ $pull:{ likes:req.body.userId } })
        res.status(200).json('post has been disliked')
    }
   }catch(err){
       res.status(500).json(err)
   }
})
// avoir un post
router.get('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})


// avoir  les post du currentUser
router.get('/timeline/all',async(req,res)=>{
    try{
       const currentUser = await User.findById(req.body.userId)
       const userPosts = await Post.find({ userId : currentUser._id })
       const friendPosts = await Promise.all(
           currentUser.followings.map(friendId=>{
              return  Post.find({ userId:friendId })
           })
       )
       res.json(userPosts.concat(...friendPosts))

    }catch(err){
        return res.status(500).json(err)
    }
})


module.exports = router