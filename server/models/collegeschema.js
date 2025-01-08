const mongoose=require("mongoose");
const collegeschema=new mongoose.Schema({
    collegename:{
        type:String
    },
    availabledepartment:{
   type:[String]
    },
    place:{
        type:String
    }

})
const college=mongoose.model("College",collegeschema);
module.exports=college;