var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var courseschema=mongoose.Schema({

    course_name:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true
    }
});

var coursemodel=mongoose.model('course',courseschema);

module.exports=coursemodel;