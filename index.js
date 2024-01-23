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
const upload = multer({storage:storage}).single("Image");

app.post("/",async(req,res)=>{
    // const data=new student(req.body)
    // const result=await data.save()
    // res.send(result)
upload(req,res, async(err)=>
{
    const std=new student({
        name:req.body.name,
        image:"localhost:4000/uploads/"+req.file.filename
    })
     await std.save()
    res.send("File Uploaded")
})

}).listen(4000)