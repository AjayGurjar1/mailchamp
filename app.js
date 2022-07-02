//jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res){
   res.sendFile(__dirname+ "/signup.html");
})

app.post("/" , function(req , res){
    const firstname=req.body.fname; 
    const lastname=req.body.lname; 
    const email=req.body.email;

    const data={
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                     FNAME: firstname,
                     LNAME: lastname
                }
            }
        ]
    };

    const jsonData =JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/edd383bee1"
    const Options= {
        method: "POST",
        auth:"ajay1:a200706b839a113a10e8b03fae75581c-us18"
    }
   const request= https.request(url,Options,function(response){
    
    if(response.statusCode===200){
        res.sendFile(__dirname+ "/success.html");

    }else{
        res.sendFile(__dirname+ "/failure.html");
    }
    
    response.on("data" , function(data){
            console.log(JSON.parse(data));
          })
    })
    
request.write(jsonData);
request.end();
});


app.post("/fialure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("listning on port 3000 ...");
});
