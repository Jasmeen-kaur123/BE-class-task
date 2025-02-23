//QUERY PARAMETER
const express=require("express");

// console.log(typeof(express));
const app=express();
// console.log(app);

app.get("/search",(req,res)=>{    
    console.log(req.query);
    let NAME=req.query.name;
    let age=req.query.age;
    console.log(typeof(age));//string
    //to convert string into int
    //use parse int

res.send('Searching something ${NAME} with ${age}');
});


app.listen(3000,()=>{    
    console.log("Server is running at port 3000");
});