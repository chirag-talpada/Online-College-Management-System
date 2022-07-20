var express = require('express');
var faculty_model=require('../modules/faculty_model.js')
var assignsubmodel=require("../modules/assign_subject.js");
var batchmodel=require("../modules/batch_year.js")
var coursemodel=require("../modules/course_model.js");
var assignmentmodel=require("../modules/faculty_assignment.js");
var studentmodel=require("../modules/student_model.js");
var exammodel = require('../modules/faculty_exam_marks.js');
var noticemodel=require("../modules/admin_notice.js");
var eventmodel=require("../modules/admin_event.js");

var router = express.Router();


//authentication function

function authenticate_user(req,res,next)
{
  if(req.session.userid)
  {
      next();
  }
  else
  {
    res.redirect('/');
  }
}


/* GET faculty home page. */
router.get('/',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;
    var userid=req.session.userid;

    var faculty_data=faculty_model.findOne({_id:userid});
    

    faculty_data.exec((err,data)=>{
      if(err) throw err;
      
      var assign_subdata=assignsubmodel.find({facultyid:data.facultyid});

      assign_subdata.exec((err1,data1)=>{
          if(err1) throw err1;
          console.log(data1);
        res.render('faculty',{username:user,faculty_details:data,teachsub:data1});
      });

     
    });
    

});

//=============== faculty profile ============================================

router.post('/faculty-password',authenticate_user,function(req,res,next){

    var currentpass=req.body.currentpass;
    var newpass=req.body.newpassword;
    var user=req.session.userid;
  
    var getpass=faculty_model.findOne({_id:user});
  
    getpass.exec((err,data)=>{
  
      if(err) throw err;
  
      if(currentpass!=data.password)
      {
        res.send(" ");
      }
      else
      {
       
        var id=req.session.userid;
        var updatepass=faculty_model.findByIdAndUpdate(id,{password:newpass});
  
        updatepass.exec((err1,data1)=>{
  
          if(err1) throw err1;
  
          res.send("Password Updated");
        });
        
      }
  
    });
  
});
//=============================================
//===========faculty assignment ===============

router.get('/assignment',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;

    var batchdata=batchmodel.find({});
    var coursedata=coursemodel.find({});

    var userid=req.session.userid;

    var faculty_data=faculty_model.findOne({_id:userid});
    

    faculty_data.exec((err2,data2)=>{
      if(err2) throw err2;
    

        batchdata.exec((err,data)=>{
            if(err) throw err;

            coursedata.exec((err1,data1)=>{
                if(err1) throw err1;
                res.render('faculty-assignment',{username:user,course:data1,batch:data,fid:data2.facultyid});
            });

        });
    });
});

router.post("/assignment-save",authenticate_user,function(req,res,next){

    var txtscode=req.body.txtscode;
    var txtsname=req.body.txtsname;
    var txtbatch=req.body.txtbatch;
    var txtcourse=req.body.txtcourse;
    var txtsemester=req.body.txtsemester;
    var txtadetail=req.body.txtadetail;
    var currdate=new Date();
    var month=currdate.getMonth()+1;
    var day=currdate.getDate();
    var fulldate=(day<10?'0':'')+day+"/"+(month<10?'0':'')+month+"/"+currdate.getFullYear();
    var txtfid=req.body.txtfid;

    var assignmentsave=new assignmentmodel({
  
      subject_name:txtsname,
      subject_code:txtscode,
      course:txtcourse,
      batch_year:txtbatch,
      semester:txtsemester,
      assignment_details:txtadetail,
      date:fulldate,
      facultyid:txtfid
    });
  
    var checkmultidata=assignmentmodel.findOne({subject_code:txtscode,course:txtcourse,batch_year:txtbatch,semester:txtsemester});
  
    checkmultidata.exec((err1,data1)=>{
      if(err1) throw err1;
      
  
      if(data1==null)
      {
        
        assignmentsave.save((err,data)=>{
  
          if(err) throw err;
      
          res.send("Saved Successfully");
      
        });
      
      }
      else
      {
        res.send(" ");
      }
  
    });
  
  });
  
  router.post("/subjectassign-scodeddl",authenticate_user,function(req,res,next){

    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;
    var txtfid=req.body.txtfid;

    var scode=assignsubmodel.find({course:txtcourse,semester:txtsem,batch_year:txtbatch,facultyid:txtfid});
  
    scode.exec((err,data)=>{
  
      if(err) throw err;
  
      res.send(data);
  
    });
  
});
  router.post("/exammarks-scodeddl",authenticate_user,function(req,res,next){

    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;
    var txtfid=req.body.txtfid;

    var scode=exammodel.distinct("subject_code",{course:txtcourse,semester:txtsem,batch_year:txtbatch,facultyid:txtfid});
  
    scode.exec((err,data)=>{
  
      if(err) throw err;
      
      res.send(data);
  
    });
  
});
  
router.post("/assignment-display",authenticate_user,function(req,res,next){

    var txtcourse=req.body.txtcourse;
    var txtsemester=req.body.txtsemester;
    var txtbatch=req.body.txtbatch;
    var txtid=req.body.txtfid;

    var displaydata=assignmentmodel.find({course:txtcourse,semester:txtsemester,batch_year:txtbatch,facultyid:txtid});
  
    displaydata.exec((err,data)=>{
      if(err) throw err;
  
      if(data)
      { 
        res.send(data);
      }
      else
      {
        res.send("not found");
      }
  
    });
  
  
});
  
router.post("/assignment-edit",authenticate_user,function(req,res,next){

    var id=req.body.txtid;
    
    var edita=assignmentmodel.findOne({_id:id});
  
    edita.exec((err,data)=>{
      if(err) throw err;
     
      res.send(data);
    });
  
});

router.post("/assignment-update",authenticate_user,function(req,res,next){

    var txtadetail  = req.body.txtadetail;
    var id=req.body.txtid;
  
  
    var updatea=assignmentmodel.findByIdAndUpdate(id,{assignment_details:txtadetail});
  
  
    updatea.exec((err1,data1)=>{
        if(err1) throw err1;
  
        res.send("Assignment Updated Successfully");
  
       });
    
  
});
  
router.post("/assignment-delete",authenticate_user,function(req,res,next){

    var id=req.body.txtid;
    
    var deleteta= assignmentmodel.findByIdAndRemove(id);
  
    deleteta.exec((err)=>{
      if(err) throw err;
  
      res.send("Deleted Successfully");
    });
  
});

router.get("/assignment-data/:id",authenticate_user,function(req,res,next){

  var did=req.params.id;

  var detail=assignmentmodel.findOne({_id:did});
  detail.exec((err,data)=>{
    if(err) throw err;

    
    res.render('assignment_details',{ndata:data.assignment_details});

  });

  

});


//============================================
//============exam marks =====================

router.get('/exam_marks',authenticate_user, function(req, res, next) {
 
  var user=req.session.username;

  var batchdata=batchmodel.find({});
  var coursedata=coursemodel.find({});

  var userid=req.session.userid;

  var faculty_data=faculty_model.findOne({_id:userid});
  

  faculty_data.exec((err2,data2)=>{
    if(err2) throw err2;
  

      batchdata.exec((err,data)=>{
          if(err) throw err;

          coursedata.exec((err1,data1)=>{
              if(err1) throw err1;
              res.render('faculty-exam_marks',{username:user,course:data1,batch:data,fid:data2.facultyid});
          });

      });
  });
 
});

router.post('/student-data',authenticate_user, function(req, res, next) {

  var txtbatch=req.body.txtbatch;
  var txtcourse=req.body.txtcourse;

  var stddata=studentmodel.find({course:txtcourse,batch_year:txtbatch});

  stddata.exec((err,data)=>{
    if(err) throw err;
    
    if(data.length!=0)
    {
      res.send(data);
    }
    else
    {
      res.send(" ");
    }
    
   
  });


  router.post('/studentexam-data',authenticate_user, function(req, res, next) {

    var txtbatch=req.body.txtbatch;
    var txtcourse=req.body.txtcourse;
    var txtsem=req.body.txtsem;
    var txtscode=req.body.txtscode;
  
    var stddata=exammodel.find({course:txtcourse,batch_year:txtbatch,semester:txtsem,subject_code:txtscode});
  
    stddata.exec((err,data)=>{
      if(err) throw err;
      
      if(data.length!=0)
      {
        res.send(data);
      }
      else
      {
        res.send(" ");
      }
      
     
    });
  
  
  });
  

});

router.post('/exammarks-save',authenticate_user, function(req, res, next) {

  var txtbatch=req.body.txtbatch;
  var txtcourse=req.body.txtcourse;
  var txtsem=req.body.txtsem;
  var txtsubcode=req.body.txtsubcode;
  var txtsubname=req.body.txtsubname;
  var txtstdname=req.body.txtstdname;
  var txtstdid=req.body.txtstdid;
  var txttotal=req.body.txttotal;
  var txtmarks=req.body.txtmarks;
  var txtfid=req.body.txtfid;
  var txtdate=req.body.txtdate;

  var examdata=new exammodel({
    subject_name:txtsubname,
    subject_code:txtsubcode,
    course:txtcourse,
    batch_year:txtbatch,
    semester:txtsem,
    student_name:txtstdname,
    stdid:txtstdid,
    totalmarks:txttotal,
    obtainedmarks:txtmarks,
    date:txtdate,
    facultyid:txtfid
  });

  examdata.save((err,data)=>{
    if(err) throw err;

    res.send("success");
  })

});

router.post('/exammarks-update',authenticate_user, function(req, res, next) {

  var txtmarks=req.body.txtmarks;
  var id=req.body.txtid;

  var updatedata=exammodel.findByIdAndUpdate(id,{

    obtainedmarks:txtmarks

  });

  updatedata.exec((err,data)=>{
    if(err) throw err;

    res.send("success");

  });

});

router.post('/exammarks-delete',authenticate_user, function(req, res, next) {


  var id=req.body.txtid;

  var ddata=exammodel.findByIdAndRemove(id);

  ddata.exec((err,data)=>{
    if(err) throw err;

    res.send("success");

  });

});



router.post('/check-exammarks',authenticate_user, function(req, res, next) {

  var txtbatch=req.body.txtbatch;
  var txtcourse=req.body.txtcourse;
  var txtsem=req.body.txtsem;
  var txtsubcode=req.body.txtscode;

  var edata=exammodel.find({batch_year:txtbatch,course:txtcourse,semester:txtsem,subject_code:txtsubcode});

  edata.exec((err,data)=>{
    if(err) throw err;

    if(data.length==0)
    {
      res.send("save");
    }
    else
    {
      res.send(data);
      
    }


  });

});
//=============================================
//=============notice router===================


router.get('/notice',authenticate_user, function(req, res, next) {
 
  var user=req.session.username;

  var noticedata=noticemodel.find({receiver:{$in:["all","faculty"]}}).sort({upload_date:-1});


  noticedata.exec((err,data)=>{
    if(err) throw err;
    res.render('faculty-notice',{username:user,notice:data});
  });
  

});



//=============================================
//=============event router===================


router.get('/event',authenticate_user, function(req, res, next) {
 
  var user=req.session.username;

  var eventdata=eventmodel.find({}).sort({upload_date:-1});


  eventdata.exec((err,data)=>{
    if(err) throw err;
    res.render('faculty-event',{username:user,event:data});
  });
  

});



//=============================================
//logour Router for faculty
//=============================================
router.post('/logout',function(req,res,next){

    req.session.destroy(function(err){
  
      if(err)
      {
        throw err;
      }
      else
      {
        res.redirect("/");
      }
    });
  
});
  

module.exports = router;
