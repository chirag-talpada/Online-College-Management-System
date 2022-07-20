var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var eventschema=mongoose.Schema({

    event_name:{
        type:String,
        required:true
       
    },
    event_g:{
        type:String,
        required:true
    },
    start_time:{
        type:String,
        required:true
    },
    end_time:{
        type:String,
        required:true
    },
    e_date:{
        type:Date,
        required:true
    },
    e_stringdate:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    upload_date:{
        type:String,
        required:true
    }
});

var eventmodel=mongoose.model('event',eventschema);

module.exports=eventmodel;