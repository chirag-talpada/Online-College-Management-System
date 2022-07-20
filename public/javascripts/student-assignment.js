$(document).ready(function(){

    var course=$("#student-assignment-course").val();

    $.ajax({
        url:"/admin/subject-semesterddl",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtcourse:course}),

        success:function(data)
        {
            if(data!=" ")
            {

                $('#student-assignment-semesterddl').children('option:not(:first)').remove();
                
                var i;

                for(i=1;i<=data.semester;i++)
                {

                    $('#student-assignment-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                  
                }
                
            }
            else
            {
                alert("something is wrong");
            }

        }
    });


    $("#student-assignment-dispbtn").click(function(){

        var semesterddl=$('#student-assignment-semesterddl').val();
        var course=$("#student-assignment-course").val();
        var batch=$("#student-assignment-batch").val();


        if(semesterddl==null)
        {
            $('.student-assignment-error').css("display","inline");
            $('.student-assignment-error').text("(Select Semester)");
        }
        else
        {
            $('.student-assignment-error').css("display","none");
            $.ajax({
                url:"/student/assignment-find",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsem:semesterddl,txtbatch:batch}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                        data.forEach(function(row){

                            $.ajax({
                                url:"/student/get-fname",
                                method:"POST",
                                contentType:"application/json",
                                data:JSON.stringify({txtid:row.facultyid}),
                        
                                success:function(data1)
                                {
                                    if(data1!=" ")
                                    {
                                        $("#student-assignment-disparea").append("<div id='student-assignmentdiv'><h5>"+row.date+"</h5><h4>Send By "+data1.faculty_name+"</h4><h3>"+row.subject_name+"-"+row.subject_code+"</h3><div>"+row.assignment_details+"</div></div>");                        

                                    }
                                    else
                                    {
                                        alert("something is wrong!");
                                    }
                        
                                }
                            });
                                                

                            
                        });
                        
                    }
                    else
                    {
                        alert("Data not Found");
                        $("#student-assignment-disparea").html("");
                    }
        
                }
            });
                
        }

    });
 
    

});