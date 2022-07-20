var express = require('express');
const admin_model = require('../modules/admin_model.js');
const faculty_model=require('../modules/faculty_model.js')
const student_model=require('../modules/student_model.js')
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  
  //destroying the session if the user already loggedin and trying to access login page
  req.session.destroy(function(err){

    if(err)
    {
      throw err;
    }
  });
  res.render('index');
});

router.post('/login',function(req,res,next){

  var txtusername=req.body.username;
  var txtpassword=req.body.password;
  var role=req.body.type;
  

  //recognize the user type
  
  if(role=="admin")
  {
    var loginprocess=admin_model.findOne({username:txtusername,password:txtpassword});

    loginprocess.exec((err,data)=>{
      if(err) throw err;
  
      if(data)
      {

        req.session.username=data.username;
        req.session.userid=data._id;
        res.send(" ");
      }
      else
      {
          res.send("login failed");
      }
    });
  }//if faculty
  else if(role=="faculty")
  {

    var loginprocess=faculty_model.findOne({facultyid:txtusername,password:txtpassword});

    loginprocess.exec((err,data)=>{
      if(err) throw err;
  
      if(data)
      {

        req.session.username=data.faculty_name;
        req.session.userid=data._id;
        res.send(" ");
      }
      else
      {
          res.send("login failed");
      }
    });
  }//if student
  else if(role=="student")
  {
    var loginprocess=student_model.findOne({stdid:txtusername,password:txtpassword});

    loginprocess.exec((err,data)=>{
      if(err) throw err;
  
      if(data)
      {
      
        req.session.username=data.student_name;
        req.session.userid=data._id;
        res.send(" ");
      }
      else
      {
      
          res.send("login failed");
      }
    });
  }

  

});

module.exports = router;
