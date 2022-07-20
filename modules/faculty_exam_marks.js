var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var exam_marksschema=mongoose.Schema({

    
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
    student_name:{
        type:String,
        required:true
    },
    stdid:{
        type:String,
        required:true
    },
    totalmarks:{
        type:Number,
        required:true
    },
    obtainedmarks:{
        type:Number,
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

var exammodel=mongoose.model('exam_marks',exam_marksschema);

module.exports=exammodel;