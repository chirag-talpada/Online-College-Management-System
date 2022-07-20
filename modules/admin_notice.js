var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var noticeschema=mongoose.Schema({

    details:{
        type:String,
        required:true
       
    },
    receiver:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    upload_date:{
        type:Date,
        default:Date.now
    },
    date:{
        type:String,
    }
});

var noticemodel=mongoose.model('notice',noticeschema);

module.exports=noticemodel;