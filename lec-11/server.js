const express=require('express');
const app=express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/index',(req,res)=>{
    res.render('index.ejs');
});
app.get('/random',(req,res)=>{
  //data fetch karne ka from database or file
  //.................
  let data=["apple","banana","mango","grapes","orange"];
   let url=req.url;
   let student={
         name:"Rahul",
         age:20,
         city:"Delhi"
   }
    res.render('random.ejs',{fruits:data,URL:url,student:student});
});

app.listen(3000,()=>{
    console.log("server is running at 3000");
});
    