const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth') 
const postRoute = require('./routes/post') 
const multer = require('multer')
const app = express()
dotenv.config()
const path = require('path')

mongoose.connect(process.env.DATABASE_URL, (err)=>{
    if(err){
        console.log(err)
    }else console.log('connected')
})

app.use('/images',express.static(path.join(__dirname,"public/images")))

// middleware
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(req.body.name)
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        console.log(req.body.name)
        cb(null,req.body.name)
    }
})
const upload = multer({storage})
app.post('/api/upload',upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("file uploaded sucessfully")
    }catch(err){
        console.log(err)
        
    }
})

app.use(morgan("common"))
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)





app.listen(8080,()=>console.log('server running'))