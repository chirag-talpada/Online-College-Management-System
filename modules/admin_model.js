
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useUnifiedTopology:true,useNewUrlParser:true});

var adminschema=mongoose.Schema({

    username:{
        type:String,
        default:'admin123'
    },
    password:{
        type:String,
        default:'admin123'
    },
    fullname:{
        type:String
    },
    mobileno:{
        type:Number
    },
    email:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','female']
    }
});

var adminmodel=mongoose.model('admin',adminschema);

module.exports=adminmodel;




// for creating the table


// var datasave=new adminmodel({

//     username:"admin123",
//     password:"admin123"

// });

// datasave.save((err,data)=>{

//     if(err) throw err;

// });



// for checking the connection

// var check=adminmodel.findOne({username:"admin1243",password:"admin123"});

// check.exec((err,data)=>{

//     if(err) throw err;

//     if(data)
//     {
//         console.log("success  " +data);
//     }
//     else
//     {
//         console.log("Failed  "+data);
//     }
// });






























