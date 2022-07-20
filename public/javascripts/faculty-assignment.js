$(document).ready(function(){

    $('#faculty-assignment-courseddl').change(function(){
        
        var course=$('#faculty-assignment-courseddl').val();        
        var batch_year=$('#faculty-assignment-academicyearddl').val();


        $('#faculty-assignment-scodeddl').val(" ");
        $('#faculty-assignment-txtsname').val(" ");
        $('#faculty-assignment-semesterddl').val(" ");
        $('#faculty-assignment-scodeddl').children('option:not(:first)').remove();        

        if(batch_year==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Academic Year First)");
        }
        else
        {
            $('.faculty-assignment-error').css("display","none");

        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#faculty-assignment-semesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#faculty-assignment-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
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

    $('#faculty-assignment-semesterddl').change(function(){
        
        var batchddl=$('#faculty-assignment-academicyearddl').val();
        var courseddl=$('#faculty-assignment-courseddl').val();
        var semesterddl=$('#faculty-assignment-semesterddl').val();

        $('#faculty-assignment-scodeddl').val(" ");
        $('#faculty-assignment-txtsname').val(" ");
        

        if(batchddl==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Academic Year)");
        }
        else
        {
            $('.faculty-assignment-error').css("display","none");
            var fid=$("#faculty-assignment-fid").val();
            $.ajax({
                url:"/faculty/subjectassign-scodeddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl,txtfid:fid}),
        
                success:function(data)
                {
                    if(data.length!=0)
                    {
    
                        $('#faculty-assignment-scodeddl').children('option:not(:first)').remove();
                        
                        data.forEach(function(row){
                            $('#faculty-assignment-scodeddl').append("<option value='"+row.subject_code+"' >"+row.subject_code+"</option>");
                        });
                        
                    }
                    else
                    {
                        alert("Subject Not Found");
                        $('#faculty-assignment-scodeddl').children('option:not(:first)').remove();
                    }
        
                }
            });
    
        }


        
    });


    $('#faculty-assignment-academicyearddl').change(function(){
    
        $('#faculty-assignment-semesterddl').children('option:not(:first)').remove();
        $('#faculty-assignment-scodeddl').children('option:not(:first)').remove();
        $('#faculty-assignment-scodeddl').val(" ");
        $('#faculty-assignment-txtsname').val(" ");
        $('#faculty-assignment-semesterddl').val(" ");
        $('#faculty-assignment-courseddl').val(" ");
        $('.faculty-assignment-error').css("display","none");
    }); 

    $('#faculty-assignment-scodeddl').change(function(){
        
            var scode=$('#faculty-assignment-scodeddl').val();
            
            $.ajax({
                url:"/admin/subjectname-ddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtscode:scode}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
    
                        $('#faculty-assignment-txtsname').val(data.subject_name);
                        
                    }
                    else
                    {
                        alert("something is wrong");
                    }
        
                }
            });
    
    });

    
    $('#faculty-assignment-savefrm').on("submit",function(e){

        e.preventDefault();

 
        
        var course=$('#faculty-assignment-courseddl').val();        
        var batch_year=$('#faculty-assignment-academicyearddl').val();
        var semesterddl=$('#faculty-assignment-semesterddl').val();
        var scode=$('#faculty-assignment-scodeddl').val();

        if(batch_year==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Academic Year)");
        }
        else if(course==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Course)");
        }
        else if(semesterddl==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Semester)");
        }
        else if(scode==null)
        {
            $('.faculty-assignment-error').css("display","inline");
            $('.faculty-assignment-error').text("(Select Subject Code)");
        }
        else
        {
            
            var sname=$("#faculty-assignment-txtsname").val();
            var adetail=CKEDITOR.instances.faculty_assignment_txtdetails.getData();
            var fid=$("#faculty-assignment-fid").val();
            $('.faculty-assignment-error').css("display","none");

            $.ajax({
                url:"/faculty/assignment-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtscode:scode,txtsname:sname,txtbatch:batch_year,txtcourse:course,txtsemester:semesterddl,txtadetail:adetail,txtfid:fid}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                      
                        alert(data);
                        window.location.href="/faculty/assignment";
                    }
                    else
                    {
                        $('.faculty-assignment-error').css("display","inline");
                        $('.faculty-assignment-error').text("(Assignment Already Submitted! Edit Assignment if you want to change something. )");
                    }
        
                }
    
            });
    
        }


    });

    $('#faculty-assignment-displaycourseddl').change(function(){
        
        var course=$('#faculty-assignment-displaycourseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#faculty-assignment-displaysemesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#faculty-assignment-displaysemesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });
        

    });


    $('#faculty-assignment-displaybtn').click(function(){
        
        var course=$('#faculty-assignment-displaycourseddl').val();
        var semester=$('#faculty-assignment-displaysemesterddl').val();
        var batch=$('#faculty-assignment-displayacademicyearddl').val();
        
        if(batch==null)
        {
            $('.faculty-assignment-displayddlerror').css("display","inline");
            $('.faculty-assignment-displayddlerror').text("(Select Academic Year)");
        }
        else if(course==null)
        {
            
            $('.faculty-assignment-displayddlerror').css("display","inline");
            $('.faculty-assignment-displayddlerror').text("(Select Course)");
        }
        else if(semester==null)
        {
            $('.faculty-assignment-displayddlerror').css("display","inline");
            $('.faculty-assignment-displayddlerror').text("(Select Semester)");
        }
        else
        {
            $('.faculty-assignment-displayddlerror').css("display","none");
            var fid=$("#faculty-assignment-fid").val();

            $.ajax({
                url:"/faculty/assignment-display",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsemester:semester,txtbatch:batch,txtfid:fid}),
        
                success:function(data)
                {

                    if(data.length!=0)
                    {
                        $('#subjectassign-displaydatatable tbody').children().remove();
                        
                        data.forEach(function(row){
                            $('#subjectassign-displaydatatable tbody').append("<tr><td>"+ row.subject_code +"</td><td>"+ row.subject_name +"</td><td><a class='admin-event-viewimg' target='_blank' href='/faculty/assignment-data/"+row._id+"'>view</a></td><td>"+ row.date +"</td><td> <button class='subjectassign-editbtn' data-editid='"+ row._id +"' >edit</button>   <button class='subjectassign-deletebtn' data-deleteid='"+ row._id +"' >delete</button>  </td></tr>");
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


    $('.assignment-updatecancel').click(function(){

        $('#faculty-assignment-editpanel').css("display","none");
        $('#faculty-assignment-addpanel').css("display","block");

    
    }); 

 
    $(document).on("click",".subjectassign-editbtn",function(){
        
        $('#faculty-assignment-editpanel').css("display","block");
        $('#faculty-assignment-addpanel').css("display","none");

        var aid=$(this).data("editid");

        $.ajax({
            url:"/faculty/assignment-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:aid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    
                    CKEDITOR.instances.faculty_assignment_edittxtdetails.setData(data.assignment_details);
                    $('#admin-assignment-editidtxt').val(data._id);

                    $('html').animate({scrollTop:0,scrollLeft:0},300);

                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });     

    
    });    


    $('#faculty-assignment-updatefrm').on("submit",function(e){

        e.preventDefault();

        var adetail=CKEDITOR.instances.faculty_assignment_edittxtdetails.getData();
        
        var updateid=$('#admin-assignment-editidtxt').val();

       
        $.ajax({

            url:"/faculty/assignment-update",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtadetail:adetail,txtid:updateid}),
        
            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/faculty/assignment";
                    alert(data);
                }
                else
                {
                    alert("Something is wrong!");
                }
        
            }
        });
    
    });


    $(document).on("click",".subjectassign-deletebtn",function(){

        var deleteid=$(this).data("deleteid");

        $.ajax({
            url:"/faculty/assignment-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:deleteid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/faculty/assignment";
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


