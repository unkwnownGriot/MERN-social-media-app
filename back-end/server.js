const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth') 
const postRoute = require('./routes/post') 
const app = express()
dotenv.config()

mongoose.connect(process.env.DATABASE_URL, (err)=>{
    if(err){
        console.log(err)
    }else console.log('connected')
})
// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)



app.listen(8080,()=>console.log('server running'))