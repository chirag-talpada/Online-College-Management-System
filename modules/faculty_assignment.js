var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var assignmentschema=mongoose.Schema({

    
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
    },
    assignment_details:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    facultyid:{
        type:String,
        required:true
    }
});

var assignmentmodel=mongoose.model('assignment',assignmentschema);

module.exports=assignmentmodel;