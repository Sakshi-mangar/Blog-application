const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))
require("./DB/db")
app.use(express.json())
app.use(require('./Routes/route'))
require("dotenv").config();
const PORT=process.env.PORT || 4000


app.listen(PORT,()=>{
      console.log(`Server Started at port ${PORT}`)
})