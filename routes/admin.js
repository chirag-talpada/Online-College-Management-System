var express = require('express');
const adminmodel = require('../modules/admin_model.js');
var batchmodel=require("../modules/batch_year.js")
var coursemodel=require("../modules/course_model.js");
var subjectmodel=require("../modules/subject_model.js");
var studentmodel=require("../modules/student_model.js");
var facultymodel=require("../modules/faculty_model.js");
var assignsubmodel=require("../modules/assign_subject.js");
var timetablemodel=require("../modules/admin_timetable.js");
var noticemodel=require("../modules/admin_notice.js");
var eventmodel=require("../modules/admin_event.js");
var exammodel = require('../modules/faculty_exam_marks.js');
var assignmentmodel=require("../modules/faculty_assignment.js");

var fs=require('fs');


var msgval="";

var multer=require('multer');
var path=require('path');

//multer function for upload

var storage=multer.diskStorage({
  destination:"./public/eventphotos/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

//middlewear for upload

var upload=multer({
  storage:storage
}).single('admin_event_filephoto');



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

/* GET admin home page. */
router.get('/',authenticate_user, function(req, res, next) {
    
    var user=req.session.username;

    var admin_data=adminmodel.findOne({username:user});

    admin_data.exec((err,data)=>{

      if(err) throw err;
      
      res.render('admin',{username:user,admin_details:data});
    });

    

 });

 //=============profile routers=====================

router.post('/profile-username',authenticate_user,function(req,res,next){

  var updatedusername=req.body.updatedusername;
  var id=req.session.userid;

  var updateuser=adminmodel.findByIdAndUpdate(id,{username:updatedusername});

  updateuser.exec((err,data)=>{

    if(err) throw err;

   
    req.session.username=updatedusername;
    res.send("success");

  });

});
  

router.post('/profile-password',authenticate_user,function(req,res,next){

  var currentpass=req.body.currentpass;
  var newpass=req.body.newpassword;
  var user=req.session.username;

  var getpass=adminmodel.findOne({username:user});

  getpass.exec((err,data)=>{

    if(err) throw err;

    if(currentpass!=data.password)
    {
      res.send(" ");
    }
    else
    {
     
      var id=req.session.userid;
      var updatepass=adminmodel.findByIdAndUpdate(id,{password:newpass});

      updatepass.exec((err1,data1)=>{

        if(err1) throw err1;

        res.send("Password Updated");
      });
      
    }

  });



});


router.post('/profile-personal',authenticate_user,function(req,res,next){

  var fname=req.body.fullnametxt;
  var mobile=req.body.mobiletxt;
  var emailid=req.body.emailtxt;
  var gen=req.body.genderval;
  var id=req.session.userid;

  var updateadmin=adminmodel.findByIdAndUpdate(id,{fullname:fname,mobileno:mobile,email:emailid,gender:gen});

  updateadmin.exec((err,data)=>{

    if(err) throw err;

    res.send("details updated");
  });
  

});
//===========================================

//============batch-year routers=============


router.get("/batch_year",authenticate_user,function(req,res,next){

  var user=req.session.username;

  var batchdata=batchmodel.find({});

  batchdata.exec((err,data)=>{
      if(err) throw err;

      res.render('admin-batch_year',{username:user,batch:data});

  });

  

});

router.post("/batch_year-save",authenticate_user,function(req,res,next){

  var txtyear=req.body.txtbatch_year;
  var txtdetails=req.body.txtdetail;

  var savebatch=new batchmodel({
      batch_year:txtyear,
      details:txtdetails
  });

  var checkunique=batchmodel.findOne({batch_year:txtyear});

  checkunique.exec((err,data)=>{

    if(err) throw err;

    if(data)
    {
      res.send(" ");
    }
    else
    {
      savebatch.save((err1,data1)=>{

        if(err1) throw err1;
    
        res.send("Saved")
      });
    }

  });

  

});

router.post("/batch-year-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtbatchid;

  var deletebatch= batchmodel.findByIdAndRemove(id);
  

  var batchname=batchmodel.findOne({_id:id});
  batchname.exec((err1,data1)=>{
    if(err1) throw err1;

    

    var stddata=studentmodel.findOne({batch_year:data1.batch_year});
    var subdata=subjectmodel.findOne({batch_year:data1.batch_year});
    var ttdata=timetablemodel.findOne({batch_year:data1.batch_year});
    var edata=exammodel.findOne({batch_year:data1.batch_year});
    var adata=assignmentmodel.findOne({batch_year:data1.batch_year});
    var assignsubdata=assignsubmodel.findOne({batch_year:data1.batch_year});

    stddata.exec((err2,data2)=>{
      if(err2) throw err2;
      subdata.exec((err3,data3)=>{
        if(err3) throw err3;
        ttdata.exec((err4,data4)=>{
          if(err4) throw err4;
          edata.exec((err5,data5)=>{
            if(err5) throw err5;
            adata.exec((err6,data6)=>{
              if(err6) throw err6;
              assignsubdata.exec((err7,data7)=>{
                if(err7) throw err7;
                
                if(data2!=null || data3!=null || data4!=null || data5!=null || data6!=null || data7!=null)
                {
                  res.send(" ");
                }
                else
                {
                  deletebatch.exec((err)=>{
                    if(err) throw err;
                
                    res.send("Deleted Successfully");
                  });
                
                }              
          
              });          
        
            });        
      
          });
                
    
        });    
  
      });  

    });


  });
  

  
});

//==================================================

//==============course routers======================

router.get("/course",authenticate_user,function(req,res,next){

  var user=req.session.username;
  
  var coursedata=coursemodel.find({});

  coursedata.exec((err,data)=>{
    if(err) throw err;
   
    res.render('admin-course',{username:user,course:data});

  });

  

});

router.post("/course-save",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtyear=req.body.txtyear;
  var txtsemester=req.body.txtsemester;

  var savecourse=new coursemodel({
    course_name:txtcourse,
    year:txtyear,
    semester:txtsemester
  });

  var checkcourse=coursemodel.findOne({course_name:txtcourse});

  checkcourse.exec((err,data)=>{

    if(err) throw err;

    if(data)
    {
        res.send(" ");
    }
    else
    {
      savecourse.save((err,data)=>{

        if(err) throw err;

        res.send("Saved")
      });
    }

  });


});

router.post("/course-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtcourseid;
  
  var deletecourse= coursemodel.findByIdAndRemove(id);

  var coursename=coursemodel.findOne({_id:id});
  coursename.exec((err1,data1)=>{
    if(err1) throw err1;

    

    var stddata=studentmodel.findOne({course:data1.course_name});
    var subdata=subjectmodel.findOne({course:data1.course_name});
    var ttdata=timetablemodel.findOne({course:data1.course_name});
    var edata=exammodel.findOne({course:data1.course_name});
    var adata=assignmentmodel.findOne({course:data1.course_name});
    var assignsubdata=assignsubmodel.findOne({course:data1.course_name});

    stddata.exec((err2,data2)=>{
      if(err2) throw err2;
      subdata.exec((err3,data3)=>{
        if(err3) throw err3;
        ttdata.exec((err4,data4)=>{
          if(err4) throw err4;
          edata.exec((err5,data5)=>{
            if(err5) throw err5;
            adata.exec((err6,data6)=>{
              if(err6) throw err6;
              assignsubdata.exec((err7,data7)=>{
                if(err7) throw err7;
                
                if(data2!=null || data3!=null || data4!=null || data5!=null || data6!=null || data7!=null)
                {
                  res.send(" ");
                
                }
                else
                {
                  
                  deletecourse.exec((err)=>{
                    if(err) throw err;
                
                    res.send("Deleted Successfully");
                  });
                
                
                }              
          
              });          
        
            });        
      
          });
                
    
        });    
  
      });  

    });


  });



  
});

router.post("/course-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtcourseid;
  
  var editcourse=coursemodel.findOne({_id:id});

  editcourse.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});

router.post("/course-update",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtyear=req.body.txtyear;
  var txtsemester=req.body.txtsemester;
  var id=req.body.courseid;
  var upcourse=req.body.updatedcourse;

  var updatecourse=coursemodel.findByIdAndUpdate(id,{course_name:txtcourse,year:txtyear,semester:txtsemester});


  var checkcourse=coursemodel.find({course_name:txtcourse});

  if(upcourse==txtcourse)
  {
    updatecourse.exec((err1,data1)=>{
      if(err1) throw err1;

      res.send("Course Updated Successfully");
     });
  }
  else
  {
    checkcourse.exec((err,data)=>{

      if(err) throw err;
      
      if(data.length>=1)
      {
          res.send(" ");
      }
      else
      {
         updatecourse.exec((err1,data1)=>{
          if(err1) throw err1;
  
          res.send("Course Updated Successfully");
         });
      }
  
    });
  
  }
  

});


//==================================================

//===============subject routers====================

router.get("/subject",authenticate_user,function(req,res,next){

  var user=req.session.username;
  var course=coursemodel.find({});
  var batch=batchmodel.find({});

  course.exec((err,data)=>{

    if(err) throw err;

    batch.exec((err1,data1)=>{
      if(err1) throw err1;

      res.render('admin-subject',{username:user,course:data,batch:data1});

    });

  });
  
});

router.post("/subject-semesterddl",authenticate_user,function(req,res,next){

  var course=req.body.txtcourse;

  var getsemester=coursemodel.findOne({course_name:course});

  getsemester.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});

router.post("/subject-save",authenticate_user,function(req,res,next){

    var txtsubjectcode=req.body.txtsubjectcode;
    var txtsubjectname=req.body.txtsubjectname;
    var txtcourse=req.body.txtcourse;
    var txtsemester=req.body.txtsemester;
    var txtbatch=req.body.txtbatch;

    var savesubject=new subjectmodel({
        subject_code:txtsubjectcode,
        subject_name:txtsubjectname,
        course:txtcourse,
        semester:txtsemester,
        batch_year:txtbatch
    });

    var checkcode=subjectmodel.findOne({subject_code:txtsubjectcode,course:txtcourse,batch_year:txtbatch});
    var checkname=subjectmodel.findOne({subject_name:txtsubjectname,course:txtcourse,semester:txtsemester,batch_year:txtbatch});


    checkcode.exec((err1,data1)=>{

      if(err1) throw err1;

      if(data1)
      {
        res.send("code");
      }
      else
      {
        checkname.exec((err2,data2)=>{
          if(err2) throw err2;

          if(data2)
          {
            res.send("name");
          }
          else
          {
            savesubject.save((err,data)=>{

              if(err) throw err;
        
              res.send("Subject Saved");
            });
        
          }
        });
      }
    });
    
});

router.post("/subject-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var editsubject=subjectmodel.findOne({_id:id});

  editsubject.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});


router.post("/subject-update",authenticate_user,function(req,res,next){

    var txtsubjectcode=req.body.txtsubjectcode;
    var txtsubjectname=req.body.txtsubjectname;
    var txtcourse=req.body.txtcourse;
    var txtsemester=req.body.txtsemester;
    var txtbatch=req.body.txtbatch;

    var id=req.body.txtid;

    

    var savesubject=subjectmodel.findByIdAndUpdate(id,{
        subject_code:txtsubjectcode,
        subject_name:txtsubjectname
        
    });

    var checkcode=subjectmodel.findOne({$and:[{subject_code:txtsubjectcode,course:txtcourse,semester:txtsemester,batch_year:txtbatch},{_id:{$ne:id}}]});
    var checkname=subjectmodel.findOne({$and:[{subject_name:txtsubjectname,course:txtcourse,semester:txtsemester,batch_year:txtbatch},{_id:{$ne:id}}]});


    checkcode.exec((err1,data1)=>{

      if(err1) throw err1;

    
      if(data1)
      {
        console.log(data1);
        res.send("code");
      }
      else
      {
        checkname.exec((err2,data2)=>{
          if(err2) throw err2;

          if(data2)
          {
            res.send("name");
          }
          else
          {


            var getcode=subjectmodel.findOne({_id:id});
            getcode.exec((err8,data8)=>{
              if(err8) throw err8;

             var upadte1=assignsubmodel.updateMany({subject_code:data8.subject_code},{$set:{subject_code:txtsubjectcode,subject_name:txtsubjectname}});
             var upadte2=assignmentmodel.updateMany({subject_code:data8.subject_code},{$set:{subject_code:txtsubjectcode,subject_name:txtsubjectname}});
             var upadte3=exammodel.updateMany({subject_code:data8.subject_code},{$set:{subject_code:txtsubjectcode,subject_name:txtsubjectname}});

             upadte1.exec((err10,data10)=>{
              if(err10) throw err10;
              
             });
             upadte2.exec((err11,data11)=>{
              if(err11) throw err11;

             });
             upadte3.exec((err12,data12)=>{
              if(err12) throw err12;

             });

            });
          


            savesubject.exec((err,data)=>{
              if(err) throw err;

              res.send("updated");
            });
        
          }
        });
      }
    });
    
});

router.post("/subject-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtsubjectid;
  
  var deletesubject= subjectmodel.findByIdAndRemove(id);


  
  var getcode=subjectmodel.findOne({_id:id});
  getcode.exec((err1,data1)=>{
    if(err1) throw err1;

    var edata=exammodel.findOne({subject_code:data1.subject_code});
    var adata=assignmentmodel.findOne({subject_code:data1.subject_code});
    var assignsubdata=assignsubmodel.findOne({subject_code:data1.subject_code});

    edata.exec((err2,data2)=>{
      if(err2) throw err2;
      adata.exec((err3,data3)=>{
        if(err3) throw err3;
        assignsubdata.exec((err4,data4)=>{
          if(err4) throw err4;
    
          if(data2!=null ||data3!=null ||data4!=null )
          {
            res.send(" ");
          }
          else
          {
            deletesubject.exec((err)=>{
              if(err) throw err;
          
              res.send("Deleted Successfully");
            });
          }
    
        });
    
        
  
      });
  


    });



  });

  

});


router.post("/subject-display",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtsemester=req.body.txtsemester;
  var txtbatch=req.body.txtbatch;

  var displaydata=subjectmodel.find({course:txtcourse,semester:txtsemester,batch_year:txtbatch});

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
//==================================================

//================student routers===================


router.get("/student",authenticate_user,function(req,res,next){

  var user=req.session.username;
  var course=coursemodel.find({});
  var batch=batchmodel.find({});

  course.exec((err,data)=>{

    if(err) throw err;

    batch.exec((err1,data1)=>{
      if(err1) throw err1;

      res.render('admin-student',{username:user,course:data,batch:data1});

    });
  });
  
});

router.post("/student-yearddl",authenticate_user,function(req,res,next){

    var year=req.body.txtyear;

    var getid=studentmodel.findOne({batch_year:year}).sort({stdno:-1}).limit(1);

    getid.exec((err,data)=>{

      if(err) throw err;

      if(data!=null)
      {
        res.send(data);
      }
      else
      {
        res.send("1");
      }
      

    });

});

router.post("/student-number",authenticate_user,function(req,res,next){

  var year=req.body.txtyear;

  var getid=studentmodel.find({batch_year:year}).sort({stdno:-1}).limit(1);

  getid.exec((err,data)=>{

    if(err) throw err;

    if(data.length!=0)
    {
      res.send("2");
    }
    else
    {
      res.send("1");
    }
    
  });

});

router.post("/student-save",authenticate_user,function(req,res,next){

  var txtsname=req.body.sname;
  var txtdob=req.body.sdob;
  var txtgender=req.body.sgender;
  var txtaddress=req.body.saddress;
  var txtemail=req.body.semail;
  var txtmobile=req.body.smno;
  var txtsbatch=req.body.sbatch;
  var txtscourse=req.body.scourse;
  var txtsid=req.body.sid;
  var txtsno=req.body.sno;

  var stdsave=new studentmodel({

    student_name:txtsname,
    dob:txtdob,
    gender:txtgender,
    address:txtaddress,
    email:txtemail,
    mobileno:txtmobile,
    course:txtscourse,
    batch_year:txtsbatch,
    stdid:txtsid,
    stdno:txtsno
  });

  var checkstdid=studentmodel.findOne({stdid:txtsid});

  checkstdid.exec((err1,data1)=>{

    if(err1) throw err1;

    if(data1!=null)
    {
      res.send(" ");
    }
    else
    {
      stdsave.save((err,data)=>{

        if(err) throw err;
    
        res.send("Saved Successfully");
    
      });
    
    }

  });
  
});

router.post("/student-display",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtbatch=req.body.txtbatch;

  var displaydata=studentmodel.find({course:txtcourse,batch_year:txtbatch});


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


router.post("/student-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var editstudent=studentmodel.findOne({_id:id});

  editstudent.exec((err,data)=>{
    if(err) throw err;
   
    res.send(data);
  });

});

router.post("/student-updatesave",authenticate_user,function(req,res,next){

  var txtsname=req.body.sname;
  var txtdob=req.body.sdob;
  var txtgender=req.body.sgender;
  var txtaddress=req.body.saddress;
  var txtemail=req.body.semail;
  var txtmobile=req.body.smno;
  
  var id=req.body.updateid;

  var savestudent=studentmodel.findByIdAndUpdate(id,{
      student_name:txtsname,
      dob:txtdob,
      gender:txtgender,
      address:txtaddress,
      email:txtemail,
      mobileno:txtmobile
  });

  var getid=studentmodel.findOne({_id:id});
  getid.exec((err1,data1)=>{
    if(err1) throw err1;

    var updatestd=exammodel.updateMany({stdid:data1.stdid},{$set:{student_name:txtsname}});
    updatestd.exec((err2,data2)=>{
      if(err2) throw err2;
    });
  });
  

  savestudent.exec((err,data)=>{
  if(err) throw err;

  res.send("Data updated");
       
  });
      
  
});

router.post("/student-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtstudentid;
  
  var deletes= studentmodel.findByIdAndRemove(id);

  var getid=studentmodel.findOne({_id:id});
  getid.exec((err1,data1)=>{
    if(err1) throw err1;

    var deletestd=exammodel.deleteMany({stdid:data1.stdid});

    deletestd.exec((err3,data3)=>{
      if(err3) throw err3;

    });

  });
  

  deletes.exec((err)=>{
    if(err) throw err;

    res.send("Deleted Successfully");
  });

});
//=================================================

//==============faculty router ======================

router.get("/faculty",authenticate_user,function(req,res,next){

  var user=req.session.username;
  var fdetails=facultymodel.find({});
  fdetails.exec((err,data)=>{
    if(err) throw err;

    res.render('admin-faculty',{username:user,fdata:data});

  });
  
});

router.post("/faculty-display",authenticate_user,function(req,res,next){

  
  var fdetails=facultymodel.find({});
  fdetails.exec((err,data)=>{
    if(err) throw err;

    if(data)
    {
      res.send(data);
    }
    else
    {
      res.send("not");
    }
    
    

  });
  
});



router.post("/faculty-gid",authenticate_user,function(req,res,next){

  var finfo=facultymodel.findOne({}).sort({fno:-1}).limit(1);

  finfo.exec((err,data)=>{
    if(err) throw err;

    
    if(data!=null)
    {
     
      res.send(data);
    }
    else
    {
      res.send("1");
    }

  });  

});

router.post("/faculty-save",authenticate_user,function(req,res,next){

  var txtfname=req.body.fname;
  var txtfdob=req.body.fdob;
  var txtfgender=req.body.fgender;
  var txtfaddress=req.body.faddress;
  var txtfemail=req.body.femail;
  var txtfmobile=req.body.fmno;
  var txtfqly=req.body.fqly;
  var txtfjoindate=req.body.fjoind;
  var txtfid=req.body.fid;
  var txtfno=req.body.fno;

  var facultysave=new facultymodel({

    faculty_name:txtfname,
    dob:txtfdob,
    gender:txtfgender,
    address:txtfaddress,
    email:txtfemail,
    mobileno:txtfmobile,
    qualification:txtfqly,
    joindate:txtfjoindate,
    facultyid:txtfid,
    fno:txtfno
  });

  

      facultysave.save((err,data)=>{

        if(err) throw err;
    
        res.send("Saved Successfully");
    
      });
    
  
});

router.post("/faculty-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtfid;
  
  var editf=facultymodel.findOne({_id:id});

  editf.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});

router.post("/faculty-update",authenticate_user,function(req,res,next){

  var txtfname=req.body.fname;
  var txtdob=req.body.fdob;
  var txtgender=req.body.fgender;
  var txtaddress=req.body.faddress;
  var txtemail=req.body.femail;
  var txtmobile=req.body.fmno;
  var txtqly=req.body.fqly;
  var txtjoin=req.body.fjoin;
  
  var id=req.body.updateid;

  var savefaculty=facultymodel.findByIdAndUpdate(id,{
      faculty_name:txtfname,
      dob:txtdob,
      gender:txtgender,
      address:txtaddress,
      email:txtemail,
      mobileno:txtmobile,
      qualification:txtqly,
      joindate:txtjoin
  });

  var getid=facultymodel.findOne({_id:id});
  getid.exec((err1,data1)=>{
    if(err1) throw err1;

    var updatef=assignsubmodel.updateMany({facultyid:data1.facultyid},{$set:{faculty_name:txtfname}});
    updatef.exec((err2,data2)=>{
      if(err2) throw err2;
    });

  });

  savefaculty.exec((err,data)=>{
  if(err) throw err;

  res.send("Data updated");
       
  });
      
  
});

router.post("/faculty-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtfid;
  
  var deletes= facultymodel.findByIdAndRemove(id);

  var getid=facultymodel.findOne({_id:id});
  getid.exec((err1,data1)=>{
    if(err1) throw err1;

    var assigns=assignsubmodel.findOne({facultyid:data1.facultyid});
    var assignment=assignmentmodel.findOne({facultyid:data1.facultyid});
    var examm=exammodel.findOne({facultyid:data1.facultyid});

    assigns.exec((err1,data1)=>{
      if(err1) throw err1;
      assignment.exec((err2,data2)=>{
        if(err2) throw err2;
        examm.exec((err3,data3)=>{
          if(err3) throw err3;

          if(data1!=null || data2!=null || data3!=null)
          {
            res.send(" ");
          }
          else
          {
            deletes.exec((err)=>{
              if(err) throw err;
          
              res.send("Deleted Successfully");
            });
          
          }
          
        });
      });  
    });
    

  });




  
});
//===================================================

//=============assign subject========================

router.get("/assign_subject",authenticate_user,function(req,res,next){

  var user=req.session.username;
  
  var fdata=facultymodel.find({});
  var cdata=coursemodel.find({});
  var bdata=batchmodel.find({});
  var sdata=subjectmodel.find({});

  fdata.exec((err1,data1)=>{
    if(err1) throw err1;
    cdata.exec((err2,data2)=>{
      if(err2) throw err2;
      bdata.exec((err3,data3)=>{
        if(err3) throw err3;
        
          res.render('admin-assign_sub',{username:user,faculty:data1,course:data2,batch:data3});
        

      });

    });

  });

  

});

router.post("/facultyname-ddl",authenticate_user,function(req,res,next){

  var fid=req.body.txtfid;

  var fname=facultymodel.findOne({facultyid:fid});

  fname.exec((err,data)=>{

    if(err) throw err;

    res.send(data);

  });

});

router.post("/subjectassign-scodeddl",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtbatch=req.body.txtbatch;
  var txtsem=req.body.txtsem;
  
  var scode=subjectmodel.find({course:txtcourse,semester:txtsem,batch_year:txtbatch});

  scode.exec((err,data)=>{

    if(err) throw err;

    res.send(data);

  });

});

router.post("/subjectname-ddl",authenticate_user,function(req,res,next){

  var scode=req.body.txtscode;

  var sname=subjectmodel.findOne({subject_code:scode});

  sname.exec((err,data)=>{

    if(err) throw err;

    res.send(data);

  });

});

router.post("/assignsubject-save",authenticate_user,function(req,res,next){

  var txtfid=req.body.txtfid;
  var txtfname=req.body.txtfname;
  var txtscode=req.body.txtscode;
  var txtsname=req.body.txtsname;
  var txtbatch=req.body.txtbatch;
  var txtcourse=req.body.txtcourse;
  var txtsemester=req.body.txtsemester;
 
  var assignsubsave=new assignsubmodel({

    faculty_name:txtfname,
    facultyid:txtfid,
    subject_name:txtsname,
    subject_code:txtscode,
    course:txtcourse,
    batch_year:txtbatch,
    semester:txtsemester
  });

  var checkmultidata=assignsubmodel.findOne({facultyid:txtfid,subject_code:txtscode,course:txtcourse,batch_year:txtbatch,semester:txtsemester});

  checkmultidata.exec((err1,data1)=>{
    if(err1) throw err1;
    

    if(data1==null)
    {
      
      var checkmultidata1=assignsubmodel.findOne({subject_code:txtscode,course:txtcourse,batch_year:txtbatch,semester:txtsemester});
      
      checkmultidata1.exec((err2,data2)=>{
        if(err2) throw err2;

        if(data2==null)
        {
          assignsubsave.save((err,data)=>{

            if(err) throw err;
        
            res.send("Saved Successfully");
        
          });
        }
        else
        {
          res.send(" ");
        }

      });
      
    
    }
    else
    {
      res.send(" ");
    }

  });

});

router.post("/subjectassign-display",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtsemester=req.body.txtsemester;
  var txtbatch=req.body.txtbatch;

  var displaydata=assignsubmodel.find({course:txtcourse,semester:txtsemester,batch_year:txtbatch});

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

router.post("/subjectassign-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtsubjectid;
  
  var deletesubjectassign= assignsubmodel.findByIdAndRemove(id);

  deletesubjectassign.exec((err)=>{
    if(err) throw err;

    res.send("Deleted Successfully");
  });

});
//==================================================
//============== Timetable Routers =================

router.get("/timetable",authenticate_user,function(req,res,next){

  var user=req.session.username;

  var batchdata=batchmodel.find({});
  var coursedata=coursemodel.find({});

  batchdata.exec((err,data)=>{
    if(err) throw err;

    coursedata.exec((err1,data1)=>{
      if(err1) throw err1;
      
      res.render('admin-timetable',{username:user,batch:data,course:data1});
    });

  });
    
});

router.post("/timetable-save",authenticate_user,function(req,res,next){

  var txtcourse=req.body.txtcourse;
  var txtbatch=req.body.txtbatch;
  var txtsem=req.body.txtsem;
  var txtdetails=req.body.txtdetails;

  var timetabdata=new timetablemodel({

    details:txtdetails,
    course:txtcourse,
    batch_year:txtbatch,
    semester:txtsem

  });

  var checktab=timetablemodel.findOne({course:txtcourse,batch_year:txtbatch,semester:txtsem});

  checktab.exec((err,data)=>{
    if(err) throw err;

    if(data==null)
    {
      
      timetabdata.save((err1,data)=>{

        if(err1) throw err1;
    
        res.send("Saved Successfully");
    
      });
    
    }
    else
    {
      res.send(" ");
    }

    
  });


});

router.post("/timetable-display",authenticate_user,function(req,res,next){

  
  var txtcourse=req.body.txtcourse;
  var txtsemester=req.body.txtsemester;
  var txtbatch=req.body.txtbatch;

  var displaydata=timetablemodel.find({course:txtcourse,semester:txtsemester,batch_year:txtbatch});

  displaydata.exec((err,data)=>{
    if(err) throw err;

    

    if(data.length!=0)
    { 
      res.send(data);
    }
    else
    {
     
      res.send("data not found");
    }

  });


});

router.post("/timetable-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var deletett= timetablemodel.findByIdAndRemove(id);

  deletett.exec((err)=>{
    if(err) throw err;

    res.send("Deleted Successfully");
  });

});
//==================================================

//============Notice routers =======================

router.get("/notice",authenticate_user,function(req,res,next){

  var user=req.session.username;
  var ndata=noticemodel.find({});

  ndata.exec((err,data)=>{

    if(err) throw err;

    res.render('admin-notice',{username:user,notice:data});
  });
      
  
    
});

router.post('/notice-save',function(req,res,next){

  var txtnsubject = req.body.txtnsubject;
  var txtreceiver = req.body.txtreceiver;
  var txtndetail  = req.body.txtndetail;
  var txtdate     = req.body.txtdate;

  var savenotice=new noticemodel({
      subject:txtnsubject,
      receiver:txtreceiver,
      details:txtndetail,
      date:txtdate
  });

  
  savenotice.save((err,data)=>{
    if(err) throw err;

    res.send("Notice Added Successfully");
  });

});

router.post("/notice-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var editn=noticemodel.findOne({_id:id});

  editn.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});


router.post("/notice-update",authenticate_user,function(req,res,next){

  var txtnsubject = req.body.txtnsubject;
  var txtreceiver = req.body.txtreceiver;
  var txtndetail  = req.body.txtndetail;
  var id=req.body.txtid;


  var updatenotice=noticemodel.findByIdAndUpdate(id,{subject:txtnsubject,receiver:txtreceiver,details:txtndetail});


  updatenotice.exec((err1,data1)=>{
      if(err1) throw err1;

      res.send("Notice Updated Successfully");

     });
  

});

router.post("/notice-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var deletetn= noticemodel.findByIdAndRemove(id);

  deletetn.exec((err)=>{
    if(err) throw err;

    res.send("Deleted Successfully");
  });

});

router.get("/notice-data/:id",authenticate_user,function(req,res,next){

  var did=req.params.id;

  var detail=noticemodel.findOne({_id:did});
  detail.exec((err,data)=>{
    if(err) throw err;

    res.render('admin-notice_details',{ndata:data});

  });

  

});


//===================================================

//================event router ======================

router.get("/event",authenticate_user,function(req,res,next){

  var user=req.session.username;
  
  var eventdata=eventmodel.find({});

  eventdata.exec((err,data)=>{
    if(err) throw err;

    res.render('admin-event',{username:user,msg:msgval,event:data});
    msgval="";

  });
  
});

router.get("/event-image/:imgurl",authenticate_user,function(req,res,next){

  var iurl=req.params.imgurl;

  res.render('event-image',{url:iurl});

});

router.post("/event-save",authenticate_user,upload,function(req,res,next){

 
  var txtename=req.body.admin_event_eventnametxt;
  var txtegname=req.body.admin_event_eventguidetxt;
  var txtstime=req.body.admin_event_eventstimetxt;
  var txtetime=req.body.admin_event_eventetimetxt;
  var txtedate=req.body.admin_event_datetxt;
  var txtdetails=req.body.admin_event_txtdetails;

  var txtimageurl=req.file.filename;

  var atxtedate=txtedate.split("-");
  var btxtedate=atxtedate[2]+"/"+atxtedate[1]+"/"+atxtedate[0];
  
  var currdate=new Date();
  var month=currdate.getMonth()+1;
  var day=currdate.getDate();
  var fulldate=(day<10?'0':'')+day+"/"+(month<10?'0':'')+month+"/"+currdate.getFullYear();

  var eventdata=new eventmodel({

    event_name:txtename,
    event_g:txtegname,
    start_time:txtstime,
    end_time:txtetime,
    e_date:txtedate,
    e_stringdate:btxtedate,
    imgurl:txtimageurl,
    details:txtdetails,
    upload_date:fulldate

  });

  eventdata.save((err,data)=>{
    if(err) throw err;
    msgval="Event Uploaded Successfully";
    res.redirect("/admin/event");
  });

});

router.post("/event-edit",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var edite=eventmodel.findOne({_id:id});

  edite.exec((err,data)=>{
    if(err) throw err;

    res.send(data);
  });

});

router.post("/event-update",authenticate_user,upload,function(req,res,next){

 
  var txtename=req.body.admin_event_editeventnametxt;
  var txtegname=req.body.admin_event_editeventguidetxt;
  var txtstime=req.body.admin_event_editeventstimetxt;
  var txtetime=req.body.admin_event_editeventetimetxt;
  var txtedate=req.body.admin_event_editdatetxt;
  var txtdetails=req.body.admin_event_edittxtdetails;

  var id=req.body.admin_event_editid;
  

  var atxtedate=txtedate.split("-");
  var btxtedate=atxtedate[2]+"/"+atxtedate[1]+"/"+atxtedate[0];
  
  var geturl=eventmodel.findOne({_id:id});

  if(req.file)
  {
    var txtimageurl=req.file.filename;
    geturl.exec((err1,data1)=>{
      if(err1) throw err1;
    
      var deleteimg=data1.imgurl;
      console.log(deleteimg);
    
       fs.unlink(path.join(__dirname,"../public/eventphotos/")+deleteimg,(err2)=>{
          if(err2) throw err2;
    
          console.log("deleted");
      });
    
    });

    var eventrecords={
      event_name:txtename,
      event_g:txtegname,
      start_time:txtstime,
      end_time:txtetime,
      e_date:txtedate,
      e_stringdate:btxtedate,
      imgurl:txtimageurl,
      details:txtdetails  
    }

  }
  else
  {
    var eventrecords={
      event_name:txtename,
      event_g:txtegname,
      start_time:txtstime,
      end_time:txtetime,
      e_date:txtedate,
      e_stringdate:btxtedate,
      details:txtdetails  
    }

  }

  
    
    
  
  var eventdata=eventmodel.findByIdAndUpdate(id,eventrecords);

  eventdata.exec((err,data)=>{
    if(err) throw err;
    msgval="Event Updated Successfully";
    res.redirect("/admin/event");
  });

});

router.post("/event-delete",authenticate_user,function(req,res,next){

  var id=req.body.txtid;
  
  var geturl=eventmodel.findOne({_id:id});

  geturl.exec((err1,data1)=>{
    if(err1) throw err1;

    var deleteimg=data1.imgurl;
    console.log(deleteimg);

    fs.unlink(path.join(__dirname,"../public/eventphotos/")+deleteimg,(err2)=>{
      if(err2) throw err2;

    });

  });



  var deletete= eventmodel.findByIdAndRemove(id);

  deletete.exec((err)=>{
    if(err) throw err;

    res.send("Deleted Successfully");
  });

});


//===================================================
 //logout router for deleting the session

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

  