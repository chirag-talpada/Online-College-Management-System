

$(document).ready(function(){

    $('#subject-assign-facultyddl').change(function(){
        
        var fid=$('#subject-assign-facultyddl').val();
        
        $.ajax({
            url:"/admin/facultyname-ddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtfid:fid}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#assign-subject-txtfname').val(data.faculty_name);
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });

    });


    $('#subject-assign-courseddl').change(function(){
        
        var course=$('#subject-assign-courseddl').val();
        
        var batch_year=$('#subject-assign-academicyearddl').val();

        $('#subject-assign-semesterddl').val(" ");
        $('#assign-subject-txtsname').val(" ");
        $('#subject-assign-scodeddl').val(" ");
        
        $('#subject-assign-scodeddl').children('option:not(:first)').remove();

        if(batch_year==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Academic Year First)");
        }
        else
        {
            $('.admin-assignsuberror').css("display","none");

        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#subject-assign-semesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#subject-assign-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });
        }

    });


    $('#subjectassign-displaycourseddl').change(function(){
        
        var course=$('#subjectassign-displaycourseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#subjectassign-displaysemesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#subjectassign-displaysemesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });
        

    });



    $('#subject-assign-semesterddl').change(function(){
        
        var batchddl=$('#subject-assign-academicyearddl').val();
        var courseddl=$('#subject-assign-courseddl').val();
        var semesterddl=$('#subject-assign-semesterddl').val();

        $('#assign-subject-txtsname').val(" ");
        $('#subject-assign-scodeddl').val(" ");
        

        if(batchddl==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Academic Year)");
        }
        else
        {
            $('.admin-assignsuberror').css("display","none");
            
            $.ajax({
                url:"/admin/subjectassign-scodeddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl}),
        
                success:function(data)
                {
                    if(data.length!=0)
                    {
    
                        $('#subject-assign-scodeddl').children('option:not(:first)').remove();
                        
                        data.forEach(function(row){
                            $('#subject-assign-scodeddl').append("<option value='"+row.subject_code+"' >"+row.subject_code+"</option>");
                        });
                        
                    }
                    else
                    {
                        alert("Subject Not Found");
                        $('#subject-assign-scodeddl').children('option:not(:first)').remove();
                    }
        
                }
            });
    
        }


        
    });

    $('#subject-assign-academicyearddl').change(function(){
    
        $('#subjectassign-displaysemesterddl').children('option:not(:first)').remove();
        $('#subject-assign-scodeddl').children('option:not(:first)').remove();
        $('#subject-assign-courseddl').val(" ");
        $('#subject-assign-semesterddl').val(" ");
        $('#assign-subject-txtsname').val(" ");
        $('#subject-assign-scodeddl').val(" ");
        $('.admin-assignsuberror').css("display","none");
    }); 

    $('#subject-assign-scodeddl').change(function(){
        
    var scode=$('#subject-assign-scodeddl').val();
        
        $.ajax({
            url:"/admin/subjectname-ddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtscode:scode}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#assign-subject-txtsname').val(data.subject_name);
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });

    });


    $('#subjectassign-savebtn').click(function(){

        var fid=$('#subject-assign-facultyddl').val();
        var course=$('#subject-assign-courseddl').val();        
        var batch_year=$('#subject-assign-academicyearddl').val();
        var semesterddl=$('#subject-assign-semesterddl').val();
        var scode=$('#subject-assign-scodeddl').val();

        if(fid==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Faculty ID)");
        }
        else if(batch_year==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Academic Year)");
        }
        else if(course==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Course)");
        }
        else if(semesterddl==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Semester)");
        }
        else if(scode==null)
        {
            $('.admin-assignsuberror').css("display","inline");
            $('.admin-assignsuberror').text("(Select Subject Code)");
        }
        else
        {
            var fname=$("#assign-subject-txtfname").val();
            var sname=$("#assign-subject-txtsname").val();
            $('.admin-assignsuberror').css("display","none");

            $.ajax({
                url:"/admin/assignsubject-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtfid:fid,txtfname:fname,txtscode:scode,txtsname:sname,txtbatch:batch_year,txtcourse:course,txtsemester:semesterddl}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                      
                        alert(data);
                        window.location.href="/admin/assign_subject";
                    }
                    else
                    {
                        $('.admin-assignsuberror').css("display","inline");
                        $('.admin-assignsuberror').text("(already Subject Assigned )");
                    }
        
                }
    
            });
    
        }


    });


    $('#subjectassign-displaybtn').click(function(){
        
        var course=$('#subjectassign-displaycourseddl').val();
        var semester=$('#subjectassign-displaysemesterddl').val();
        var batch=$('#subjectassign-displayacademicyearddl').val();
        
        if(batch==null)
        {
            $('.subjectassign-displayddlerror').css("display","inline");
            $('.subjectassign-displayddlerror').text("(Select Academic Year)");
        }
        else if(course==null)
        {
            
            $('.subjectassign-displayddlerror').css("display","inline");
            $('.subjectassign-displayddlerror').text("(Select Course)");
        }
        else if(semester==null)
        {
            $('.subjectassign-displayddlerror').css("display","inline");
            $('.subjectassign-displayddlerror').text("(Select Semester)");
        }
        else
        {
            $('.subjectassign-displayddlerror').css("display","none");
            
            $.ajax({
                url:"/admin/subjectassign-display",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsemester:semester,txtbatch:batch}),
        
                success:function(data)
                {

                    if(data.length!=0)
                    {
                        $('#subjectassign-displaydatatable tbody').children().remove();
                        
                        data.forEach(function(row){
                            $('#subjectassign-displaydatatable tbody').append("<tr><td>"+ row.subject_code +"</td><td>"+ row.subject_name +"</td><td>"+ row.facultyid +"</td><td>"+ row.faculty_name +"</td><td> <button class='subjectassign-deletebtn' data-sdeleteid='"+ row._id +"' >delete</button>  </td></tr>");
                        });

                    }
                    else
                    {
                        
                        $('#subjectassign-displaydatatable tbody').children().remove();
                        $('#subjectassign-displaydatatable tbody').append("<tr><td colspan='5'>Data Not Found</td></tr>");
                        alert("data Not found");
                    }
        
                }
            });
    
            

        }

    });

    $(document).on("click",".subjectassign-deletebtn",function(){

        var subjectid=$(this).data("sdeleteid");

        $.ajax({
            url:"/admin/subjectassign-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtsubjectid:subjectid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/assign_subject";
                    alert(data);

                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });

    });





});