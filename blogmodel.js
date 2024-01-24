const mongoose= require("mongoose");
const blogSchema = new mongoose.Schema({
 //b=blog=>
bid:Number,
bname:String,
bdesc:String,
bcat:String,
bimage:String

})
module.exports=mongoose.model("students",blogSchema)


