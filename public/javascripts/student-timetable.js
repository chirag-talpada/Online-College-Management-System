$(document).ready(function(){

    var course=$("#student-timetable-course").val();

    $.ajax({
        url:"/admin/subject-semesterddl",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtcourse:course}),

        success:function(data)
        {
            if(data!=" ")
            {

                $('#student-timetable-semesterddl').children('option:not(:first)').remove();
                
                var i;

                for(i=1;i<=data.semester;i++)
                {

                    $('#student-timetable-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                  
                }
                
            }
            else
            {
                alert("something is wrong");
            }

        }
    });


    $("#student-timetable-dispbtn").click(function(){

        var semesterddl=$('#student-timetable-semesterddl').val();
        var course=$("#student-timetable-course").val();
        var batch=$("#student-timetable-batch").val();


        if(semesterddl==null)
        {
            $('.student-timetable-error').css("display","inline");
            $('.student-timetable-error').text("(Select Semester)");
        }
        else
        {
            $('.student-timetable-error').css("display","none");
            $.ajax({
                url:"/student/timetable-find",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsem:semesterddl,txtbatch:batch}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                        $("#student-timetable-displaydatatable").html(data.details);
                        
                    }
                    else
                    {
                        alert("Data not Found");
                        $("#student-timetable-displaydatatable").html("");
                    }
        
                }
            });
                
        }

    });
 


});