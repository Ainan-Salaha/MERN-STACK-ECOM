const mongoose= require('mongoose')
require('dotenv').config()
const productSchema= require('./models/product')
const producT =require('./sample/Product')
const database= require('./connection/db')


database()
const uploadData= async()=>{
    try {
        await productSchema.deleteMany()
        await productSchema.insertMany(producT)
        console.log("done")
        process.exit()

    } catch (error) {
        console.log(`uploader.js --> ${error}`)
    }
}

const deleteData= async()=>{
    try {
        await productSchema.deleteMany()
        console.log("done")
        process.exit()

    } catch (error) {
        console.log(`uploader.js --> ${error}`)
    }
}


if (process.argv[2] === "-d"){
    deleteData()
}
else{
    uploadData()
}