var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var timetableschema=mongoose.Schema({

    details:{
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

var timetablemodel=mongoose.model('timetable',timetableschema);

module.exports=timetablemodel;