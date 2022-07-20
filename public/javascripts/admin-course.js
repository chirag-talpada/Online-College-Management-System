$(document).ready(function(){
 
    var course_update;

    $('#course-txtyear').on("keyup",function(){

    
        var year=$('#course-txtyear').val();
      
        if(isNaN(year))
        {
            $('.course-erroryear').css("display","inline");
           
        }
        else
        {
                $('.course-erroryear').css("display","none");

                var value=(year*2);
                if(value!=0)
                {
                    $('#course-txtsemester').val(value);
                }
                else
                {
                    $('#course-txtsemester').val("");
                }            
        }

    });
    $('#course-edittxtyear').on("keyup",function(){

    
        var year=$('#course-edittxtyear').val();
      
        if(isNaN(year))
        {
            $('.course-editerroryear').css("display","inline");
           
        }
        else
        {
                $('.course-editerroryear').css("display","none");

                var value=(year*2);
                if(value!=0)
                {
                    $('#course-edittxtsemester').val(value);
                }
                else
                {
                    $('#course-edittxtsemester').val("");
                }            
        }

    });

    $('#course-savefrm').on("submit",function(e){

        e.preventDefault();

        var year=$('#course-txtyear').val();
        
        if(isNaN(year))
        {
            $('.course-erroryear').css("display","inline");
           
        }
        else
        {
      
            var course=$('#course-txtcourse').val();
            var courseupper=course.toUpperCase();

            $.ajax({
                url:"/admin/course-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtyear:year,txtcourse:courseupper,txtsemester:$('#course-txtsemester').val()}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                        window.location.href="/admin/course";
                        alert(data);
                    }
                    else
                    {
                        $('.course-errorname').css("display","inline");
                    }
        
                }
            });
        }
    


    });

    $('#course-editfrm').on("submit",function(e){

        e.preventDefault();

        var year=$('#course-edittxtyear').val();
        
        if(isNaN(year))
        {
            $('.course-editerroryear').css("display","inline");
           
        }
        else
        {
      
            var course=$('#course-edittxtcourse').val();
            var courseupper=course.toUpperCase();

            $.ajax({
                url:"/admin/course-update",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtyear:year,txtcourse:courseupper,txtsemester:$('#course-edittxtsemester').val(),courseid:$("#course-updatecourseid").val(),updatedcourse:course_update}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
                        window.location.href="/admin/course";
                        alert(data);
                    }
                    else
                    {
                        $('.course-editerrorname').css("display","inline");
                    }
        
                }
            });
        }
    


    });

    $(document).on("click",".course-deletebtn",function(){

        var courseid=$(this).data("id");

        $.ajax({
            url:"/admin/course-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourseid:courseid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/course";
                    alert(data);

                }
                else
                {
                    alert("Failed to delete! data Exists for this Course");
                }
            }
                            
        });

    });

    $(document).on("click",".course-editbtn",function(){
        
        $('#course-editpanel').css("display","block");
        $('#course-savepanel').css("display","none");

        var courseid=$(this).data("editid");

        $.ajax({
            url:"/admin/course-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourseid:courseid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    course_update=data.course_name;
                    $('#course-edittxtcourse').val(data.course_name);
                    $('#course-edittxtyear').val(data.year);
                    $('#course-edittxtsemester').val(data.semester);
                    $('#course-updatecourseid').val(data._id);

                    $('html').animate({scrollTop:0},300);

                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });     

    
    });    

   $('.course-updatecancel').click(function(){

    $('#course-editpanel').css("display","none");
    $('#course-savepanel').css("display","block");
    $('.course-editerrorname').css("display","none");

   }); 


});