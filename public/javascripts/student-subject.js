$(document).ready(function(){

    var course=$("#student-subject-course").val();

    $.ajax({
        url:"/admin/subject-semesterddl",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtcourse:course}),

        success:function(data)
        {
            if(data!=" ")
            {

                $('#student-semesterddl').children('option:not(:first)').remove();
                
                var i;

                for(i=1;i<=data.semester;i++)
                {

                    $('#student-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                  
                }
                
            }
            else
            {
                alert("something is wrong");
            }

        }
    });


    $("#student-subject-dispbtn").click(function(){

        var semesterddl=$('#student-semesterddl').val();
        var course=$("#student-subject-course").val();
        var batch=$("#student-subject-batch").val();


        if(semesterddl==null)
        {
            $('.student-subject-error').css("display","inline");
            $('.student-subject-error').text("(Select Semester)");
        }
        else
        {
            $('.student-subject-error').css("display","none");
            $.ajax({
                url:"/student/subject-find",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsem:semesterddl,txtbatch:batch}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
        
                        $('#subject-displaydatatable tbody').children().remove();
                        
                        data.forEach(function(row){
                            $('#subject-displaydatatable tbody').append("<tr><td>"+ row.subject_code +"</td><td>"+ row.subject_name +"</td></tr>");
                        });

                        
                    }
                    else
                    {
                        $('#subject-displaydatatable tbody').children().remove();
                        $('#subject-displaydatatable tbody').append("<tr><td colspan='2' align='center'>Data Not Found</td></tr>");
                        alert("Data not Found");
                    }
        
                }
            });
                
        }

    });

});