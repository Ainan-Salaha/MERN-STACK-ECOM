const express= require("express")
const app= express(); 
const cors= require('cors')
require('dotenv').config()
const PORT= process.env.PORT ||8080
const connection= require('./connection/db')
const UserRoute= require('./routes/UserRoute')
const ProductRoute= require('./routes/ProductRoute')
const path =require('path')

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'./build')))

app.use('/',UserRoute)
app.use('/',ProductRoute)

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./build/index.html'))
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
    connection()
})