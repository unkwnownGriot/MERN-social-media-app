const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { findByIdAndUpdate } = require('../models/User')

// metrre à jour l'utilisateur 
router.put('/:id',async (req,res)=>{
   if(req.params.id === req.body.userId || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch(err){
                return res.status(500).json(err)
            }
        }
            try{
                const udpdateUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json('account updated')
            }catch(err){
                return res.status(500).json(err)
            }
        
   }else{
       return res.status(403).json('you can only update your account buddy')
   }
})

// supprimer l'utilisateur
router.delete('/:id',async (req,res)=>{
    if(req.params.id === req.body.userId || req.body.isAdmin){
            try{
                 const deleteUser = await User.findByIdAndDelete(req.params.id)
                 res.status(200).json('account deleted successfully')
             }catch(err){
                 return res.status(500).json(err)
             }
         
    }else{
        return res.status(403).json('you can only delete your account buddy')
    }
 })



// avoir un utilisateur
router.get('/',async (req,res)=>{
    const userId = req.query.userId
    const username =req.query.username
    try{
        const user  = userId ?
         await User.findById(userId):
         await User.findOne({username:username})

        const {password,updatedAt,__v,...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})
// avoir les amis du currentUser
router.get("/friends/:userId", async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(followerId=>{
                return User.findById(followerId)
            })
        )
        let friendList =[]
        friends.map(friend=>{
            const {_id,username,profilePicture} = friend
            friendList.push({_id,username,profilePicture})
        })

        return res.status(200).json(friendList)

    }catch(err){
        res.status(500).json(err)
    }
})




// s'abonner à un utilisateur
router.put('/:id/follow',async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
           const userToFollow =  await User.findById(req.params.id)
           const currentUser =  await User.findById(req.body.userId)
           if(!userToFollow.followers.includes(req.body.userId)){
                    await userToFollow.updateOne({ $push: { followers : req.body.userId } })
                    await currentUser.updateOne({ $push: { followings : req.params.id } })
                   res.status(200).json("user has been followed") 
           }else{
               return res.status(403).json('you already follow this account')
           }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json('you can not follow your account')
    }
})
// se désabonner à un utilisateur
router.put('/:id/unfollow',async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
           const userToFollow =  await User.findById(req.params.id)
           const currentUser =  await User.findById(req.body.userId)
           if(userToFollow.followers.includes(req.body.userId)){
                    await userToFollow.updateOne({ $pull: { followers : req.body.userId } })
                    await currentUser.updateOne({ $pull: { followings : req.params.id } })
                   res.status(200).json("user has been unfollowed") 
           }else{
               return res.status(403).json("you don't follow this account")
           }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json('you can not unfollow your account')
    }
})




module.exports = router