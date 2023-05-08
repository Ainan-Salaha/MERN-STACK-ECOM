const mongoose= require('mongoose')


const connection= async()=>{
    try {
        console.log("Connecting...")
        await mongoose.connect(process.env.URL)
        console.log("Connnected to db")
    } catch (error) {
        console.log(`db.js->${error}`)
    }
}

module.exports= connection