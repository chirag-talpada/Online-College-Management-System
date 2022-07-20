var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var assignsubschema=mongoose.Schema({

    faculty_name:{
        type:String,
        required:true
       
    },
    facultyid:{
        type:String,
        required:true
    },
    subject_name:{
        type:String,
        required:true
    },
    subject_code:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    batch_year:{
        type:Number,
        required:true
    },
    semester:{
        type:String,
        required:true,
    }
});

var assignsubmodel=mongoose.model('assign_subject',assignsubschema);

module.exports=assignsubmodel;