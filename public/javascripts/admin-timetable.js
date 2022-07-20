$(document).ready(function(){

    var c=1;
    var d=1;
    $('#admin-timetab-courseddl').change(function(){
        
        var course=$('#admin-timetab-courseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#admin-timetab-semesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#admin-timetab-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });
        

    });

    $('#admin-timetable-displaycourseddl').change(function(){
        
        var course=$('#admin-timetable-displaycourseddl').val();
        
        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#admin-timetable-displaysemesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#admin-timetable-displaysemesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
                    }
                    
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });
        

    });

    
    $("#admin-timetab-addrowbtn").click(function(){

        $('.admin-timetaberror').css("display","none");
        var row;
        var type=$('#admin-timetable-rowtype').val();
        if(type=="data")
        {
         row="<tr><td><input type='text' class='timetxt-timetxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-montxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-tuetxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-wedtxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-thutxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-fritxt"+ c +" timetabletxt' ></td><td><input type='text'  class='timetxt-sattxt"+ c +" timetabletxt' ></td></tr>";
            
         $('#admin-timetabletab tbody').append(row);
         c++;
        }
        else{

         row="<tr><td><input type='text' class='timetxt-breaktxt"+ d +" timetabletxt' ></td><td colspan='6' align='center'>break</td></tr>";
         $('#admin-timetabletab tbody').append(row); 
         d++;  
        }
        
        
    });

    $("#admin-timetab-deleterowbtn").click(function(){

        $('#admin-timetabletab tbody tr:last').remove();
        
    });

    $("#admin-timetab-savebtn").click(function(){

        var totalelements=$('#admin-timetabletab tbody tr').length;
        
        if(totalelements==0)
        {
            alert("Timetable is Empty! Enter data")
            return false;
        }
       
        
        
        var batchddl=$("#admin-timetab-batchddl").val();
        var courseddl=$("#admin-timetab-courseddl").val();
        var semesterddl=$("#admin-timetab-semesterddl").val();

        if(batchddl==null)
        {
            $('.admin-timetaberror').css("display","inline");
            $('.admin-timetaberror').text("(Select Academic Year)");
        }
        else if(courseddl==null)
        {
            $('.admin-timetaberror').css("display","inline");
            $('.admin-timetaberror').text("(Select Course)");
        }
        else if(semesterddl==null)
        {
            $('.admin-timetaberror').css("display","inline");
            $('.admin-timetaberror').text("(Select Semester)");
        }
        else
        {

        $('#admin-timetab-showtable').html(" ");    

        $('.admin-timetaberror').css("display","none");

        $("#admin-timetabletab tfoot").remove();

        for(let i=1;i<c;i++)
        {  
           $(".timetxt-timetxt"+ i +"").attr("value",$(".timetxt-timetxt"+ i +"").val());
           $(".timetxt-montxt"+ i +"").attr("value",$(".timetxt-montxt"+ i +"").val());
           $(".timetxt-tuetxt"+ i +"").attr("value",$(".timetxt-tuetxt"+ i +"").val());
           $(".timetxt-wedtxt"+ i +"").attr("value",$(".timetxt-wedtxt"+ i +"").val());
           $(".timetxt-thutxt"+ i +"").attr("value",$(".timetxt-thutxt"+ i +"").val());
           $(".timetxt-fritxt"+ i +"").attr("value",$(".timetxt-fritxt"+ i +"").val());
           $(".timetxt-sattxt"+ i +"").attr("value",$(".timetxt-sattxt"+ i +"").val());
           
        }

        


        for(let j=1;j<d;j++)
        {
            $(".timetxt-breaktxt"+ j +"").attr("value",$(".timetxt-breaktxt"+ j +"").val());
        }

        $('#admin-timetabletab tbody .timetabletxt').attr('readonly',true);

        var timetable=$('#admin-timetabledata').html();
            $.ajax({
                url:"/admin/timetable-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl,txtdetails:timetable}),
        
                success:function(data)
                {
                    if(data!=" ")
                    { 
                        alert(data);
                        window.location.href="/admin/timetable";
                    }
                    else
                    {
                        alert("Timetable Already Exists");
                        window.location.href="/admin/timetable";
                    }
                }
            });
    
        }

    });


    $('#admin-timetable-displaybtn').click(function(){
        
        var course=$('#admin-timetable-displaycourseddl').val();
        var semester=$('#admin-timetable-displaysemesterddl').val();
        var batch=$('#admin-timetable-displayacademicyearddl').val();
        
        if(batch==null)
        {
            $('.admin-timetable-displayddlerror').css("display","inline");
            $('.admin-timetable-displayddlerror').text("(Select Academic Year)");
        }
        else if(course==null)
        {
            
            $('.admin-timetable-displayddlerror').css("display","inline");
            $('.admin-timetable-displayddlerror').text("(Select Course)");
        }
        else if(semester==null)
        {
            $('.admin-timetable-displayddlerror').css("display","inline");
            $('.admin-timetable-displayddlerror').text("(Select Semester)");
        }
        else
        {
            $('.admin-timetable-displayddlerror').css("display","none");
            
            $.ajax({
                url:"/admin/timetable-display",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:course,txtsemester:semester,txtbatch:batch}),
        
                success:function(data)
                {
                    if(data=="data not found")
                    {
                        alert(data);
                        window.location.href="/admin/timetable";
                    }
                    else
                    {
                        $('#admin-timetab-showtable').html(data[0].details);
                        $('#admin-timetable-deletetab').html("<button class='admin-timetable-deletebtn' data-deleteid='"+ data[0]._id +"' >delete timetable</button>");
                    }
                    
                }
            });
    
            

        }

    });

    $(document).on("click",".admin-timetable-deletebtn",function(){

        var did=$(this).data("deleteid");

        $.ajax({
            url:"/admin/timetable-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:did}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/timetable";
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