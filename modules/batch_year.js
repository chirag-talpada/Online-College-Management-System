var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/cms",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

var batch_yearschema=mongoose.Schema({

    batch_year:{
        type:Number,
        required:true,
        index:{
            unique:true
        }
    },
    details:{
        type:String
    }
});

var batchmodel=mongoose.model('batch_year',batch_yearschema);

module.exports=batchmodel;