$(document).ready(function(){

    var course=$("#student-exam-course").val();

    $.ajax({
        url:"/admin/subject-semesterddl",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtcourse:course}),

        success:function(data)
        {
            if(data!=" ")
            {

                $('#student-exam-semesterddl').children('option:not(:first)').remove();
                
                var i;

                for(i=1;i<=data.semester;i++)
                {

                    $('#student-exam-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                  
                }
                
            }
            else
            {
                alert("something is wrong");
            }

        }
    });


    $('#student-exam-semesterddl').change(function(){
        
        var batchddl=$('#student-exam-batch').val();
        var courseddl=$('#student-exam-course').val();
        var semesterddl=$('#student-exam-semesterddl').val();
       
      
            $.ajax({
                url:"/student/subjectddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl}),
        
                success:function(data)
                {
                    if(data.length!=0)
                    {
    
                        $('#student-exam-subjectddl').children('option:not(:first)').remove();
                        
                        data.forEach(function(row){
                            $('#student-exam-subjectddl').append("<option value='"+row.subject_code+"' >"+row.subject_code+"</option>");
                        });
                        
                    }
                    else
                    {
                        
                        alert("Subject Not Found");
                        $('#student-exam-sname').val("");
                        $('#student-exam-subjectddl').val(" ");
                        $('#student-exam-subjectddl').children('option:not(:first)').remove();
                        
                    }
        
                }
            });
    
      

        
    });


    $('#student-exam-subjectddl').change(function(){
        
            var scode=$('#student-exam-subjectddl').val();
            $('.student-exam-error').css("display","none");
            $.ajax({
                url:"/admin/subjectname-ddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtscode:scode}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
    
                        $('#student-exam-sname').val(data.subject_name);
                        
                    }
                    else
                    {
                        alert("something is wrong");
                    }
        
                }
            });
    
    });
    

    $("#student-exam-dispbtn").click(function(){

        var semesterddl=$('#student-exam-semesterddl').val();
        var course=$("#student-exam-course").val();
        var batch=$("#student-exam-batch").val();
        var scode=$("#student-exam-subjectddl").val();
        var sid=$("#student-exam-stdid").val();


        if(semesterddl==null)
        {
            $('.student-exam-error').css("display","inline");
            $('.student-exam-error').text("(Select Semester)");
        }
        else if(scode==null)
        {
            $('.student-exam-error').css("display","inline");
            $('.student-exam-error').text("(Select Subject Code)");
        }
        else
        {
            $('.student-exam-error').css("display","none");
            $.ajax({
                url:"/student/exam-find",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsem:semesterddl,txtbatch:batch,txtscode:scode,txtsid:sid}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                        
                            $.ajax({
                                url:"/student/get-fname",
                                method:"POST",
                                contentType:"application/json",
                                data:JSON.stringify({txtid:data.facultyid}),
                        
                                success:function(data1)
                                {
                                    if(data1!=" ")
                                    {
                                        $("#student-exam-resultarea").html("<div id='student-assignmentdiv'><h5>"+data.date+"</h5><h4>Send By "+data1.faculty_name+"</h4><h3>"+data.subject_name+"-"+data.subject_code+"</h3><div><table id='student-examtable'><tr><td>Student Name</td><td>:&nbsp;&nbsp;"+data.student_name+"</td></tr><tr><td>Total Marks</td><td>:&nbsp;&nbsp;"+data.totalmarks+"</td></tr><tr><td>Obtained Marks</td><td>:&nbsp;&nbsp;"+data.obtainedmarks+"</td></tr></table></div></div>");                        

                                    }
                                    else
                                    {
                                        alert("something is wrong!");
                                    }
                        
                                }
                            });
                        
                    }
                    else
                    {
                        alert("Data not Found");
                        $("#student-exam-resultarea").html("");
                        $("#student-exam-subjectddl").val(" ");
                        $('#student-exam-semesterddl').val(" ");
                        $('#student-exam-sname').val("");
                    }
        
                }
            });
                
        }

    });
 


});