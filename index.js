const express=require("express")
const app=express()
const cors=require("cors")
require("./mongoose")
app.use(express.json())
app.use(cors())
const student=require("./blogmodel")
const multer=require("multer")
app.use(express.static("public"))

const storage=multer.diskStorage({
    //cb=callback
    destination:(req,File,cb)=>{
        cb(null,"public/uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage}).single("bimage");
//create blog
app.post("/",async(req,res)=>{
    // const data=new student(req.body)
    // const result=await data.save()
    // res.send(result)
upload(req,res, async(err)=>
{
    const std=new student({
        bid:req.body.bid,
        bname:req.body.bname,
        bdesc:req.body.bdesc,
        bcat:req.body.bcat,
        bimage:"https://blogapi-3vfy.onrender.com/uploads/"+req.file.filename
    })
     await std.save()
    res.send("File Uploaded")
})


})
//see all blog
app.get("/",async(req,res)=>{
    const data=await student.find()
    res.send(data)
})
//update blog
app.put("/",upload,async(req,res)=>{
    const data=await student.updateOne({bid:req.body.bid},{$set:{bname:req.body.bname}})
    res.send(data)
})
//delete blog
app.delete("/",async(req,res)=>{
    const data=await student.deleteOne({bid:req.body.bid})
    res.send(data)
})
app.listen(4000)