var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var studentschema=mongoose.Schema({

    student_name:{
        type:String,
        required:true
       
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
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
    stdid:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    stdno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        default:'S123'
    }
});

var studentmodel=mongoose.model('student',studentschema);

module.exports=studentmodel;