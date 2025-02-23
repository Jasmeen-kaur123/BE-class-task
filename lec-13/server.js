const express=require("express");
const app=express();
app.use('/static',express.static('public'));
app.get("/",(req,res)=>{
  res.send("hello Jasmeen");
})

app.listen(3000,()=>{
  console.log("server is running");
})
