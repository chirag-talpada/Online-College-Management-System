$(document).ready(function(){

    var defaultsubjectcode;
    var defaultsubjectname;
    
    $('#subject-courseddl').change(function(){
        
        var course=$('#subject-courseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#subject-semesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#subject-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });

    });

   
    $('#subject-displaycourseddl').change(function(){
        
        var course=$('#subject-displaycourseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#subject-displaysemesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#subject-displaysemesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });

    });


    $('#subject-addfrm').on("submit",function(e){

        e.preventDefault();
        
        var course=$('#subject-courseddl').val();
        var semester=$('#subject-semesterddl').val();
        var batch=$('#subject-academicyearddl').val();
        var subjectcode=$('#subject-txtsubjectcode').val();
        var subjectcodeupper=subjectcode.toUpperCase();


        if(course==null)
        {
            
            $('.subject-ddlerror').css("display","inline");
            $('.subject-ddlerror').text("(Select Course)");
        }
        else if(semester==null)
        {
            $('.subject-ddlerror').css("display","inline");
            $('.subject-ddlerror').text("(Select Semester)");
        }
        else if(batch==null)
        {
            $('.subject-ddlerror').css("display","inline");
            $('.subject-ddlerror').text("(Select Academic Year)");
        }
        else
        {
            $('.subject-ddlerror').css("display","none");
            
            $.ajax({
                url:"/admin/subject-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtsubjectcode:subjectcodeupper,txtsubjectname:$('#subject-txtsubjectname').val(),txtcourse:course,txtsemester:semester,txtbatch:batch}),
        
                success:function(data)
                {
                    if(data=="Subject Saved")
                    {
                        $('.subject-nameerror').css("display","none");
                        window.location.href="/admin/subject";
                        alert(data); 
                    }
                    else if(data=="code")
                    {
                        $('.subject-nameerror').css("display","inline");
                        $('.subject-nameerror').text("Subject Code is already exist with same course or semester and batch");
                    }
                    else if(data=="name")
                    {
                        $('.subject-nameerror').css("display","inline");
                        $('.subject-nameerror').text("Subject name is already exist with same course,semester and batch");
                    }
                    else
                    {
                        alert("something is wrong");
                    }
        
                }
            });
    
            

        }
    });

    $('#subject-updatefrm').on("submit",function(e){

             e.preventDefault();
        
      
            var subjectcode=$('#subject-edittxtsubjectcode').val();
            var subjectcodeupper=subjectcode.toUpperCase();
            var sname=$('#subject-edittxtsubjectname').val();

            if(subjectcode==defaultsubjectcode && sname==defaultsubjectname)
            {
                window.location.href="/admin/subject";
            }
            else
            {
                $.ajax({
                    url:"/admin/subject-update",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({txtsubjectcode:subjectcodeupper,txtsubjectname:$('#subject-edittxtsubjectname').val(),txtid:$('#subject-editid').val(),txtcourse:$('#subject-editcourse').val(),txtsemester:$('#subject-editsemester').val(),txtbatch:$('#subject-editbatch').val()}),
            
                    success:function(data)
                    {
                        if(data=="updated")
                        {
                            $('.subject-editnameerror').css("display","none");
                            window.location.href="/admin/subject";
                            alert(data); 
                        }
                        else if(data=="code")
                        {
                            $('.subject-editnameerror').css("display","inline");
                            $('.subject-editnameerror').text("Subject Code is already exist with same course,semester and batch");
                        }
                        else if(data=="name")
                        {
                            $('.subject-editnameerror').css("display","inline");
                            $('.subject-editnameerror').text("Subject name is already exist with same course,semester and batch");
                        }
                        else
                        {
                            alert("something is wrong");
                            $('.subject-editnameerror').css("display","none");
                        }
            
                    }
                });
    
            }
            
                
            
    });


    $('#subject-displaybtn').click(function(){
        
        var course=$('#subject-displaycourseddl').val();
        var semester=$('#subject-displaysemesterddl').val();
        var batch=$('#subject-displayacademicyearddl').val();
        

        if(course==null)
        {
            
            $('.subject-displayddlerror').css("display","inline");
            $('.subject-displayddlerror').text("(Select Course)");
        }
        else if(semester==null)
        {
            $('.subject-displayddlerror').css("display","inline");
            $('.subject-displayddlerror').text("(Select Semester)");
        }
        else if(batch==null)
        {
            $('.subject-displayddlerror').css("display","inline");
            $('.subject-displayddlerror').text("(Select Academic Year)");
        }
        else
        {
            $('.subject-displayddlerror').css("display","none");
            
            $.ajax({
                url:"/admin/subject-display",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsemester:semester,txtbatch:batch}),
        
                success:function(data)
                {

                    if(data.length!=0)
                    {
                        $('#subject-displaydatatable tbody').children().remove();
                        
                        data.forEach(function(row){
                            $('#subject-displaydatatable tbody').append("<tr><td>"+ row.subject_code +"</td><td>"+ row.subject_name +"</td><td> <button class='subject-editbtn' data-subject='"+ row._id +"' >edit</button> <button class='subject-deletebtn' data-subjectdeleteid='"+ row._id +"' >delete</button>  </td></tr>");
                        });

                    }
                    else
                    {
                        
                        $('#subject-displaydatatable tbody').children().remove();
                        $('#subject-displaydatatable tbody').append("<tr><td colspan='3'>Data Not Found</td></tr>");
                        alert("data Not found");
                    }
        
                }
            });
    
            

        }

    });



    $(document).on("click",".subject-editbtn",function(){
        
        $('#subject-editpanel').css("display","block");
        $('#subject-savepanel').css("display","none");


        var subjectid=$(this).data("subject");

        $.ajax({
            url:"/admin/subject-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:subjectid}),

            success:function(data)
            {
                if(data.length!=0)
                {
                    
                    $('#subject-edittxtsubjectcode').val(data.subject_code);
                    $('#subject-edittxtsubjectname').val(data.subject_name);
                    $('#subject-editid').val(data._id);                 
                    $('#subject-editcourse').val(data.course);
                    $('#subject-editsemester').val(data.semester);
                    $('#subject-editbatch').val(data.batch_year);
                    $('html').animate({scrollTop:0},300);

                    defaultsubjectcode=data.subject_code;
                    defaultsubjectname=data.subject_name;


                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });     



    });    

    $(document).on("click",".subject-deletebtn",function(){

        var subjectid=$(this).data("subjectdeleteid");

        $.ajax({
            url:"/admin/subject-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtsubjectid:subjectid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/subject";
                    alert(data);

                }
                else
                {
                    alert("Failed to delete! data exists for this subject");
                }
            }
                            
        });

    });


    $('.subject-updatecancel').click(function(){

        $('#subject-editpanel').css("display","none");
        $('#subject-savepanel').css("display","block");
        $('.subject-editnameerror').css("display","none");
    
    }); 
    


});