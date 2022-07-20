var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var facultyschema=mongoose.Schema({

    faculty_name:{
        type:String,
        required:true
       
    },
    dob:{
        type:String,
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
    qualification:{
        type:String,
        required:true
    },
    joindate:{
        type:String,
        required:true
    },
    facultyid:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    fno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        default:'F123'
    }
});

var facultymodel=mongoose.model('faculty',facultyschema);

module.exports=facultymodel;