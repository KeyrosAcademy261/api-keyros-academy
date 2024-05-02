require ('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const videoRoutes = require("../routes/videoRoutes")
const userRoutes = require("../routes/userRoute")
const webinaireRoutes = require('../routes/webinaireRoutes')
const messageRoutes = require("../routes/messageRoutes");
const cors = require('cors')

const PORT = process.env.PORT
const app = express()

app.use(express.json())


app.use(cors())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    const allowedOrigins = 'http://keyros-academy.com'
    const origin = req.headers.origin
    if(allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Orign', origin)
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
    next()
})

//middleware of video
app.use('/api/levels', videoRoutes)

//middleware of user
app.use('/api/users', userRoutes)

//middleware of webinaire
app.use('/api/webinaires', webinaireRoutes)

//middleware of message
app.use('/messages', messageRoutes)

//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(
        app.listen(PORT,()=>{console.log( `Serveur connecter sur le DB et écoute le port : ${PORT}`)})
    )
    .catch((error)=>{
        console.log(error)
    })
