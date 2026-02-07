const mongoose=require('mongoose')
const url="mongodb://127.0.0.1:27017/hp"
mongoose.connect(url)
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log(err))