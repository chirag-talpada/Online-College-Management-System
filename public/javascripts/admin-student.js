
$(document).ready(function(){

    
    $('#student-academicyearddl').change(function(){

        var year=$('#student-academicyearddl').val();

        $.ajax({
            url:"/admin/student-yearddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtyear:year}),
    
            success:function(data)
            {
                if(data=="1")
                {
                   var stdid=year+"00"+data;
                   $('#student-sno').val(1);
                   $('#student-txtid').val(stdid);

                    
                }
                else
                {
                  
                    var stdid=year+"00"+Number(data.stdno+1);
                    $('#student-sno').val(Number(data.stdno+1));
                    $('#student-txtid').val(stdid);
  

                }
    
            }
        });


    });



   $('#student-savefrm').on("submit",function(e){

    e.preventDefault();

    var txtmno=$('#student-txtmobile').val();
    var txtem=$('#student-txtemail').val();

    var checkm=create_student_vmobile(txtmno);
    var checke=create_student_vemail(txtem);

    if(checke)
    {
        if(checkm)
        {
            $('#create_student-error').css("display","none");
        }
        else
        {
            $('#create_student-error').css("display","inline");
            $('#create_student-error').text("Invalid Mobile Number");    
        }
    }
    else
    {
        $('#create_student-error').css("display","inline");
        $('#create_student-error').text("Invalid Email");
    }

    var course=$('#student-courseddl').val();
    var batch=$('#student-academicyearddl').val();
    
        

        if(course==null)
        {
            
            $('#create_student-error').css("display","inline");
            $('#create_student-error').text("Select Course");
        }
        else if(batch==null)
        {
            $('#create_student-error').css("display","inline");
            $('#create_student-error').text("Select Academic Year");
        }
        else
        {
            if(checke && checkm)
            {
            $('#create_student-error').css("display","none");

            var txtsname=$('#student-txtstdname').val();
            var txtdob=$('#student-txtstddate').val();
            var gender=$("input[name='student-gender']:checked").val();
            var txtaddress=$("#student-txtaddress").val();
            var txtemail=$("#student-txtemail").val();
            var txtsmno=$('#student-txtmobile').val();
            var txtcourse=$('#student-courseddl').val();
            var txtbatch=$('#student-academicyearddl').val();
            var txtsid=$('#student-txtid').val();
            var txtsno=$('#student-sno').val();
           
            $.ajax({
                url:"/admin/student-save",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({sname:txtsname,sdob:txtdob,sgender:gender,saddress:txtaddress,semail:txtemail,smno:txtsmno,sbatch:txtbatch,scourse:txtcourse,sid:txtsid,sno:txtsno}),
        
                success:function(data)
                {
                    if(data)
                    {
                      
                        alert(data);
                        window.location.href="/admin/student";
                    }
                    else
                    {
                        $('#create_student-error').css("display","inline");
                        $('#create_student-error').text("Student ID Exist!");
                    }
        
                }
    
            });
    

        }





        }
   });


   $('#student-displaybtn').click(function(){
        
    var course=$('#student-displaycourseddl').val();
    var batch=$('#student-displayacademicyearddl').val();
    

    if(course==null)
    {
        
        $('.student-displayddlerror').css("display","inline");
        $('.student-displayddlerror').text("(Select Course)");
    }
    else if(batch==null)
    {
        $('.student-displayddlerror').css("display","inline");
        $('.student-displayddlerror').text("(Select Academic Year)");
    }
    else
    {
        $('.student-displayddlerror').css("display","none");
        
        $.ajax({
            url:"/admin/student-display",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course,txtbatch:batch}),
    
            success:function(data)
            {

                if(data.length!=0)
                {
                    $('#student-displaydatatable tbody').children().remove();
                    
                    data.forEach(function(row){
                        var date1=row.dob.substring(0,10).split("-");
                        var adate=date1[2]+"/"+date1[1]+"/"+date1[0];
                        $('#student-displaydatatable tbody').append("<tr><td>"+ row.student_name +"</td><td>"+ adate +"</td><td>"+ row.gender +"</td><td>"+ row.address +"</td><td>"+ row.email +"</td><td>"+ row.mobileno +"</td><td>"+ row.course +"</td><td>"+ row.batch_year +"</td><td>"+ row.stdid +"</td><td><button class='student-viewbtn' data-student='"+ row._id +"' >edit</button></td><td><button class='student-deletebtn' data-studentdeleteid='"+ row._id +"' >delete</button>  </td></tr>");
                    });

                }
                else
                {
                    
                    $('#student-displaydatatable tbody').children().remove();
                    $('#student-displaydatatable tbody').append("<tr><td colspan='10'>Data Not Found</td></tr>");
                    alert("data Not found");
                }
    
            }
        });

        

    }

});

$(document).on("click",".student-viewbtn",function(){
        
    $('#student-editpanel').css("display","block");
    $('#student-addpanel').css("display","none");


    var studentid=$(this).data("student");
    
    $.ajax({
        url:"/admin/student-edit",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtid:studentid}),

        success:function(data)
        {
            if(data.length!=0)
            {
                
                $('#student-edittxtstdname').val(data.student_name);
                var date1=data.dob.substring(0,10).split("-");
                var adate=date1[0]+"-"+date1[1]+"-"+date1[2];
                $('#student-edittxtstddate').val(adate);
                $('#student-edittxtaddress').val(data.address);                 
                $('#student-edittxtemail').val(data.email);
                $('#student-edittxtmobile').val(data.mobileno);
                $('#student-editid').val(data._id);
                if(data.gender!='female')
                {
                    $('#student-gmale').prop('checked',true);
                }
                else
                {
                    $('#student-gfemale').prop('checked',true);
                }
                $('html').animate({scrollTop:0,scrollLeft:0},300);


            }
            else
            {
                alert("something is wrong");
            }
        }
                        
    });   

});

$('.student-updatecancel').click(function(){

    $('#student-editpanel').css("display","none");
    $('#student-addpanel').css("display","block");
    $('#create_editstudent-error').css("display","none");

}); 


$('#student-updatefrm').on("submit",function(e){

    e.preventDefault();

    var txtmno=$('#student-edittxtmobile').val();
    var txtem=$('#student-edittxtemail').val();

    var checkm=create_student_vmobile(txtmno);
    var checke=create_student_vemail(txtem);

    if(checke)
    {
        if(checkm)
        {
            $('#create_editstudent-error').css("display","none");
            
            var txtsname=$('#student-edittxtstdname').val();
            var txtdob=$('#student-edittxtstddate').val();
            var gender=$("input[name='student-editgender']:checked").val();
            var txtaddress=$("#student-edittxtaddress").val();
            var txtemail=$("#student-edittxtemail").val();
            var txtsmno=$('#student-edittxtmobile').val();
            var txtid=$('#student-editid').val();
            
            $.ajax({
                url:"/admin/student-updatesave",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({sname:txtsname,sdob:txtdob,sgender:gender,saddress:txtaddress,semail:txtemail,smno:txtsmno,updateid:txtid}),
        
                success:function(data)
                {
                    if(data)
                    {
                      
                        alert(data);
                        window.location.href="/admin/student";
                    }
                    else
                    {
                        alert("something is wrong!")
                    }
        
                }
    
            });
        }
        else
        {
            $('#create_editstudent-error').css("display","inline");
            $('#create_editstudent-error').text("Invalid Mobile Number");    
        }
    }
    else
    {
        $('#create_editstudent-error').css("display","inline");
        $('#create_editstudent-error').text("Invalid Email");
    }
                 
});


$(document).on("click",".student-deletebtn",function(){

    var studentid=$(this).data("studentdeleteid");

    $.ajax({
        url:"/admin/student-delete",
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({txtstudentid:studentid}),

        success:function(data)
        {
            if(data!=" ")
            {
                window.location.href="/admin/student";
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

function create_student_vmobile(mno)
{
    if(isNaN(mno))
    {
        return false;
    }
    else
    {
        if(mno.length!=10)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}

function create_student_vemail(em)
{
    var reg=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if(reg.test(em))
    {
        return true;  
    }
    else
    {
        return false;
    }
}