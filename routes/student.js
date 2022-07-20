var express = require('express');
var batchmodel=require("../modules/batch_year.js")
var coursemodel=require("../modules/course_model.js");
var assignmentmodel=require("../modules/faculty_assignment.js");
var studentmodel=require("../modules/student_model.js");
var exammodel = require('../modules/faculty_exam_marks.js');
var noticemodel=require("../modules/admin_notice.js");
var eventmodel=require("../modules/admin_event.js");
var subjectmodel=require("../modules/subject_model.js");
var timetablemodel=require("../modules/admin_timetable.js");
var facultymodel=require("../modules/faculty_model.js");

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

    var studentdata=studentmodel.findOne({_id:userid});

    studentdata.exec((err,data)=>{
        if(err) throw err;

        res.render('student',{username:user,student:data});

    });
    
});
//============================================
//=======student profile =====================

router.post('/student-password',authenticate_user,function(req,res,next){

    var currentpass=req.body.currentpass;
    var newpass=req.body.newpassword;
    var user=req.session.userid;
  
    var getpass=studentmodel.findOne({_id:user});
  
    getpass.exec((err,data)=>{
  
      if(err) throw err;
  
      if(currentpass!=data.password)
      {
        res.send(" ");
      }
      else
      {
       
        var id=req.session.userid;
        var updatepass=studentmodel.findByIdAndUpdate(id,{password:newpass});
  
        updatepass.exec((err1,data1)=>{
  
          if(err1) throw err1;
  
          res.send("Password Updated");
        });
        
      }
  
    });
  
});

//========student subject========================================

router.get('/subject',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;
    var userid=req.session.userid;

    var studentdata=studentmodel.findOne({_id:userid});

    studentdata.exec((err,data)=>{
        if(err) throw err;
        res.render('student-subject',{username:user,student:data});

    });
    
});

router.post('/subject-find',authenticate_user, function(req, res, next) {

    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;

    var subdata=subjectmodel.find({course:txtcourse,batch_year:txtbatch,semester:txtsem});    

    subdata.exec((err,data)=>{

        if(err) throw err;

        if(data.length==0)
        {
            res.send(" ");
        }
        else
        {
            res.send(data);
        }

    });

});
//=============timetable======================

router.get('/timetable',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;
    var userid=req.session.userid;

    var studentdata=studentmodel.findOne({_id:userid});

    studentdata.exec((err,data)=>{
        if(err) throw err;
        res.render('student-timetable',{username:user,student:data});

    });
    
});

router.post('/timetable-find',authenticate_user, function(req, res, next) {
    
    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;

    var timetabdata=timetablemodel.findOne({course:txtcourse,batch_year:txtbatch,semester:txtsem});

    timetabdata.exec((err,data)=>{

        if(err) throw err;

        if(data==null)
        {
            res.send(" ");
        }
        else
        {
            res.send(data);
        }

    });

});
//==========student assignment================

router.get('/assignment',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;
    var userid=req.session.userid;

    var studentdata=studentmodel.findOne({_id:userid});

    studentdata.exec((err,data)=>{
        if(err) throw err;
        res.render('student-assignment',{username:user,student:data});

    });
    
});


router.post('/assignment-find',authenticate_user, function(req, res, next) {
    
    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;

    var timetabdata=assignmentmodel.find({course:txtcourse,batch_year:txtbatch,semester:txtsem});

    timetabdata.exec((err,data)=>{

        if(err) throw err;

        if(data.length==0)
        {
            res.send(" ");
        }
        else
        {
            res.send(data);
        }

    });

});

router.post('/get-fname',authenticate_user, function(req, res, next) {
    
    var fid=req.body.txtid;

    var getfname=facultymodel.findOne({facultyid:fid});

    getfname.exec((err,data)=>{
        if(err) throw err;

        if(data==null)
        {
            res.send(" ");
        }
        else
        {
            res.send(data);
        }
    });

});
//=========== exam marks ======================

router.get('/exam_marks',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;
    var userid=req.session.userid;

    var studentdata=studentmodel.findOne({_id:userid});

    studentdata.exec((err,data)=>{
        if(err) throw err;
        res.render('student-exam_marks',{username:user,student:data});

    });
    
});

router.post("/subjectddl",authenticate_user,function(req,res,next){

    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;
    

    var scode=subjectmodel.find({course:txtcourse,semester:txtsem,batch_year:txtbatch});
  
    scode.exec((err,data)=>{
  
      if(err) throw err;

        res.send(data);
     
    });
  
});

router.post('/exam-find',authenticate_user, function(req, res, next) {
    
    var txtcourse=req.body.txtcourse;
    var txtbatch=req.body.txtbatch;
    var txtsem=req.body.txtsem;
    var txtscode=req.body.txtscode;
    var txtsid=req.body.txtsid;

    var examdata=exammodel.findOne({course:txtcourse,batch_year:txtbatch,semester:txtsem,subject_code:txtscode,stdid:txtsid});

    examdata.exec((err,data)=>{

        if(err) throw err;

        if(data==null)
        {
            res.send(" ");
        }
        else
        {
            res.send(data);
        }

    });

});

//============student notice==================

router.get('/notice',authenticate_user, function(req, res, next) {
 
    var user=req.session.username;
  
    var noticedata=noticemodel.find({receiver:{$in:["all","students"]}}).sort({upload_date:-1});
  
  
    noticedata.exec((err,data)=>{
      if(err) throw err;
      res.render('student-notice',{username:user,notice:data});
    });
    
  
  });
  
//===============student event ================

router.get('/event',authenticate_user, function(req, res, next) {
 
    var user=req.session.username;
  
    var eventdata=eventmodel.find({}).sort({upload_date:-1});
  
  
    eventdata.exec((err,data)=>{
      if(err) throw err;
      res.render('student-event',{username:user,event:data});
    });
    
  
  });
  
//=============================================
//logour Router for student
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
