const express=require("express");
const app=express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
  res.send("hello Jasmeen");
})

app.get("/",(req,res)=>{
  res.render(index);

})

app.get("/g23",(req,res)=>{
  console.log("get request on /23");
  console.log(req.query);
  res.send("hello 23 get method");
})

app.post("/g23",(req,res)=>{
  console.log("POST request on /23");
  console.log(req.body);
  res.send("hello 23 post method");
})

app.listen(3000,()=>{
  console.log("server is running");
})
