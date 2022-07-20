var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var subjectschema=mongoose.Schema({

    subject_code:{
        type:String,
        required:true
       
    },
    subject_name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    batch_year:{
        type:Number,
        required:true
    }
});

var subjectmodel=mongoose.model('subject',subjectschema);

module.exports=subjectmodel;