$(document).ready(function(){

    $('#faculty-exammarks-courseddl').change(function(){
        
        var course=$('#faculty-exammarks-courseddl').val();        
        var batch_year=$('#faculty-exammarks-academicyearddl').val();

        $("#faculty-exammarks-savebtn").css("display","none");
        $('#faculty-exammarks-scodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-scodeddl').val(" ");
        $('#faculty-exammarks-txtsname').val(" ");
        $('#faculty-exammarks-semesterddl').val(" ");
        $('#faculty-exammarks-displaydatatable tbody').children().remove();
        $('#faculty-exammarks-displaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");
        $(".faculty-exammarks-totalbody").css("display","none");


        if(batch_year==null)
        {
            $('.faculty-exammarks-error').css("display","inline");
            $('.faculty-exammarks-error').text("(Select Academic Year First)");
        }
        else
        {
            $('.faculty-exammarks-error').css("display","none");

        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#faculty-exammarks-semesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#faculty-exammarks-semesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
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

    $('#faculty-exammarks-editcourseddl').change(function(){
        
        var course=$('#faculty-exammarks-editcourseddl').val();        
        var batch_year=$('#faculty-exammarks-editacademicyearddl').val();

        $("#faculty-exammarks-deletebtn").css("display","none");
        $("#faculty-exammarks-editsavebtn").css("display","none");
        $('#faculty-exammarks-editscodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-editscodeddl').val(" ");
        $('#faculty-exammarks-edittxtsname').val(" ");
        $('#faculty-exammarks-editsemesterddl').val(" ");
        $('#faculty-exammarks-editdisplaydatatable tbody').children().remove();
        $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");

        if(batch_year==null)
        {
            $('.faculty-exammarks-editerror').css("display","inline");
            $('.faculty-exammarks-editerror').text("(Select Academic Year First)");
        }
        else
        {
            $('.faculty-exammarks-editerror').css("display","none");

        $.ajax({
            url:"/admin/subject-semesterddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtcourse:course}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#faculty-exammarks-editsemesterddl').children('option:not(:first)').remove();
                    
                    var i;

                    for(i=1;i<=data.semester;i++)
                    {

                        $('#faculty-exammarks-editsemesterddl').append("<option value='semester "+i+"' >semester "+i+"</option>");
                      
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



    $('#faculty-exammarks-semesterddl').change(function(){
        
        var batchddl=$('#faculty-exammarks-academicyearddl').val();
        var courseddl=$('#faculty-exammarks-courseddl').val();
        var semesterddl=$('#faculty-exammarks-semesterddl').val();
       
        $(".faculty-exammarks-totalbody").css("display","none");
        $("#faculty-exammarks-savebtn").css("display","none");
        $('#faculty-exammarks-scodeddl').val(" ");
        $('#faculty-exammarks-txtsname').val(" ");
        $('#faculty-exammarks-displaydatatable tbody').children().remove();
        $('#faculty-exammarks-displaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");

        if(batchddl==null)
        {
            $('.faculty-exammarks-error').css("display","inline");
            $('.faculty-exammarks-error').text("(Select Academic Year)");
        }
        else
        {
            $('.faculty-exammarks-error').css("display","none");
            var fid=$("#faculty-exammarks-fid").val();

            $.ajax({
                url:"/faculty/subjectassign-scodeddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl,txtfid:fid}),
        
                success:function(data)
                {
                    if(data.length!=0)
                    {
    
                        $('#faculty-exammarks-scodeddl').children('option:not(:first)').remove();
                        
                        data.forEach(function(row){
                            $('#faculty-exammarks-scodeddl').append("<option value='"+row.subject_code+"' >"+row.subject_code+"</option>");
                        });
                        
                    }
                    else
                    {
                        alert("Subject Not Found");
                        $('#faculty-exammarks-scodeddl').children('option:not(:first)').remove();
                    }
        
                }
            });
    
        }


        
    });

    $('#faculty-exammarks-editsemesterddl').change(function(){
        
        var batchddl=$('#faculty-exammarks-editacademicyearddl').val();
        var courseddl=$('#faculty-exammarks-editcourseddl').val();
        var semesterddl=$('#faculty-exammarks-editsemesterddl').val();

        $("#faculty-exammarks-deletebtn").css("display","none");
        $("#faculty-exammarks-editsavebtn").css("display","none");
        $('#faculty-exammarks-editscodeddl').val(" ");
        $('#faculty-exammarks-edittxtsname').val(" ");
        $('#faculty-exammarks-editdisplaydatatable tbody').children().remove();
        $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");

        if(batchddl==null)
        {
            $('.faculty-exammarks-editerror').css("display","inline");
            $('.faculty-exammarks-editerror').text("(Select Academic Year)");
        }
        else
        {
            $('.faculty-exammarks-editerror').css("display","none");
            var fid=$("#faculty-exammarks-fid").val();

            $.ajax({
                url:"/faculty/exammarks-scodeddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtcourse:courseddl,txtbatch:batchddl,txtsem:semesterddl,txtfid:fid}),
        
                success:function(data)
                {
                    if(data.length!=0)
                    {
    
                        $('#faculty-exammarks-editscodeddl').children('option:not(:first)').remove();
                        
                       

                        for(let i=0;i<data.length;i++)
                        {
                            $('#faculty-exammarks-editscodeddl').append("<option value='"+data[i]+"' >"+data[i]+"</option>");
                        }


                        
                    }
                    else
                    {
                        alert("Subject Not Found");
                        $('#faculty-exammarks-editscodeddl').children('option:not(:first)').remove();
                    }
        
                }
            });
    
        }


        
    });


    $('#faculty-exammarks-academicyearddl').change(function(){
        $(".faculty-exammarks-totalbody").css("display","none");
        $("#faculty-exammarks-savebtn").css("display","none");
        $('#faculty-exammarks-semesterddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-scodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-courseddl').val(" ");
        $('#faculty-exammarks-semesterddl').val(" ");
        $('#faculty-exammarks-scodeddl').val(" ");
        $('#faculty-exammarks-txtsname').val(" ");
        $('.faculty-exammarks-error').css("display","none");
        $('#faculty-exammarks-displaydatatable tbody').children().remove();
        $('#faculty-exammarks-displaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");
    }); 

    $('#faculty-exammarks-editacademicyearddl').change(function(){
        $("#faculty-exammarks-deletebtn").css("display","none");
        $("#faculty-exammarks-editsavebtn").css("display","none");
        $('#faculty-exammarks-editsemesterddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-editscodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-editcourseddl').val(" ");
        $('#faculty-exammarks-editsemesterddl').val(" ");
        $('#faculty-exammarks-editscodeddl').val(" ");
        $('#faculty-exammarks-edittxtsname').val(" ");
        $('.faculty-exammarks-editerror').css("display","none");
        $('#faculty-exammarks-editdisplaydatatable tbody').children().remove();
        $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");
    }); 




    $('#faculty-exammarks-scodeddl').change(function(){
        
            var scode=$('#faculty-exammarks-scodeddl').val();
            $(".faculty-exammarks-error").css("display","none");

            $.ajax({
                url:"/admin/subjectname-ddl",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({txtscode:scode}),
        
                success:function(data)
                {
                    if(data!=" ")
                    {
    
                        $('#faculty-exammarks-txtsname').val(data.subject_name);
                       
                    }
                    else
                    {
                        alert("something is wrong");
                    }
        
                }
            });
    
    });

    $('#faculty-exammarks-editscodeddl').change(function(){
        
        var scode=$('#faculty-exammarks-editscodeddl').val();
        $(".faculty-exammarks-editerror").css("display","none");

        $.ajax({
            url:"/admin/subjectname-ddl",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtscode:scode}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $('#faculty-exammarks-edittxtsname').val(data.subject_name);
                   
                }
                else
                {
                    alert("something is wrong");
                }
    
            }
        });

    });


    $('#faculty-exammarks-scodeddl').change(function(){
       
        var batchddl=$('#faculty-exammarks-academicyearddl').val();
        var courseddl=$('#faculty-exammarks-courseddl').val();
        var txtscode=$("#faculty-exammarks-scodeddl").val();
        var semesterddl=$('#faculty-exammarks-semesterddl').val();

        $.ajax({
            url:"/faculty/student-data",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $.ajax({
                        url:"/faculty/check-exammarks",
                        method:"POST",
                        contentType:"application/json",
                        data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl,txtscode:txtscode,txtsem:semesterddl}),
                
                        success:function(data1)
                        {
                            if(data1=="save")
                            {
                                
                                $("#faculty-exammarks-savebtn").css("display","block");
                                
                                $(".faculty-exammarks-totalbody").css("display","block");                
                                $('#faculty-exammarks-displaydatatable tbody').children().remove(); 
                                data.forEach(function(row){
                                    $('#faculty-exammarks-displaydatatable tbody').append("<tr><td>"+ row.student_name +"</td><td>"+ row.stdid +"</td><td><input type='text' class='faculty-exammarks-stdtotaltxt exammarks-tabletxt' required readonly></td><td><input type='text' class='exammarks-tabletxt faculty-exammarks-stdmarkstxt"+ row.stdid +"' required='true' ></td></tr>");
                                });
                          
                               
                            }
                            else
                            {
                                $(".faculty-exammarks-totalbody").css("display","none");                
                                $("#faculty-exammarks-savebtn").css("display","none");
                                alert("Marks already exists! delete the records if you want to insert Marks again!");
                                window.location.href="/faculty/exam_marks";
                            }
                
                        }
                    });     



                  


                }
                else
                {
                    $('#faculty-exammarks-displaydatatable tbody').children().remove();
                    $('#faculty-exammarks-displaydatatable tbody').append("<tr><td align='center' colspan='4'>data Not Found!</td></tr>");
                    alert("Student Data not Found!")
                }
    
            }
        });

        

    });

    $('#faculty-exammarks-editscodeddl').change(function(){
       
        var batchddl=$('#faculty-exammarks-editacademicyearddl').val();
        var courseddl=$('#faculty-exammarks-editcourseddl').val();
        var txtscode=$("#faculty-exammarks-editscodeddl").val();
        var semesterddl=$('#faculty-exammarks-editsemesterddl').val();

        $.ajax({
            url:"/faculty/student-data",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl}),
    
            success:function(data)
            {
                if(data!=" ")
                {

                    $.ajax({
                        url:"/faculty/check-exammarks",
                        method:"POST",
                        contentType:"application/json",
                        data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl,txtscode:txtscode,txtsem:semesterddl}),
                
                        success:function(data1)
                        {
                            if(data1=="save")
                            {
                                
                                $("#faculty-exammarks-editsavebtn").css("display","none");
                                $("#faculty-exammarks-deletebtn").css("display","none");
                                alert("Marks Not found! ");
                                window.location.href="/faculty/exam_marks";                                
                          
                               
                            }
                            else
                            {

                                $("#faculty-exammarks-editsavebtn").css("display","block");
                                $("#faculty-exammarks-deletebtn").css("display","block");
                                
                                $('#faculty-exammarks-editdisplaydatatable tbody').children().remove(); 
                                data1.forEach(function(row){
                                    $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td>"+ row.student_name +"</td><td>"+ row.stdid +"</td><td><input type='text' value='"+row.totalmarks+"' class='faculty-exammarks-stdtotaltxt exammarks-tabletxt' required readonly></td><td><input type='text' class='exammarks-tabletxt faculty-exammarks-stdmarkstxt"+ row.stdid +"' value='"+row.obtainedmarks+"' required='true' ></td></tr>");
                                });

                            }
                
                        }
                    });     



                  


                }
                else
                {
                    $('#faculty-exammarks-editdisplaydatatable tbody').children().remove();
                    $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td align='center' colspan='4'>data Not Found!</td></tr>");
                    alert("Student Data not Found!")
                }
    
            }
        });

        

    });


    $('#faculty-exammarks-txttotal').on("keyup",function(){

        var total=$(this).val();

        if(isNaN(total))
        {
            $(".faculty-exammarks-txttotal-error").css("display","inline");
            $(".faculty-exammarks-txttotal-error").text("Invalid Marks");
        }
        else
        {
            $(".faculty-exammarks-txttotal-error").css("display","none");
            $(".faculty-exammarks-stdtotaltxt").val(total);         
        }

    });


    $('#faculty-exammarks-savebtn').click(function(){

        var batchddl=$('#faculty-exammarks-academicyearddl').val();
        var courseddl=$('#faculty-exammarks-courseddl').val();
        var semesterddl=$('#faculty-exammarks-semesterddl').val();
        var subjectddl=$('#faculty-exammarks-scodeddl').val();
        var total=$('#faculty-exammarks-txttotal').val();

        if(batchddl==null)
        {
            $(".faculty-exammarks-error").css("display","inline");
            $(".faculty-exammarks-error").text("Select Academic Year");
        }
        else if(courseddl==null)
        {
            $(".faculty-exammarks-error").css("display","inline");
            $(".faculty-exammarks-error").text("Select Course");
        }
        else if(semesterddl==null)
        {
            $(".faculty-exammarks-error").css("display","inline");
            $(".faculty-exammarks-error").text("Select Semester");
        }
        else if(subjectddl==null)
        {
            $(".faculty-exammarks-error").css("display","inline");
            $(".faculty-exammarks-error").text("Select Subject Code");
        }
        else if(total=="")
        {
            $(".faculty-exammarks-txttotal-error").css("display","inline");
            $(".faculty-exammarks-txttotal-error").text("Enter Marks");
        }
        else
        {
            $(".faculty-exammarks-error").css("display","none");
            
            if(isNaN(total))
            {
                $(".faculty-exammarks-txttotal-error").css("display","inline");
                $(".faculty-exammarks-txttotal-error").text("Enter valid Marks");
            }
            else
            {
                $.ajax({
                    url:"/faculty/student-data",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl}),
            
                    success:function(data)
                    {
                        if(data!=" ")
                        {
                            data.forEach(function(row){
                                $(".faculty-exammarks-stdmarkstxt"+row.stdid+"").attr("value",$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val());
                            });

                            
                            var valid=0;

                            data.forEach(function(row){
                                var marksval=$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val();
                                var total1=$('#faculty-exammarks-txttotal').val();
                                if(marksval=="")
                                {
                                    valid++;
                            
                                }
                                else
                                {
                                    if(isNaN(marksval))
                                    {
                                        valid++;
                                        
                                    }

                                    if(marksval>total1)
                                    {
                                        valid++;
                                    }

                                }
                                
                            });

                            if(valid==0)
                            {
                                var batchddl=$('#faculty-exammarks-academicyearddl').val();
                                var semesterddl=$('#faculty-exammarks-semesterddl').val();
                                var courseddl=$('#faculty-exammarks-courseddl').val();
                                var total=$('#faculty-exammarks-txttotal').val();
                                var subjectddl=$('#faculty-exammarks-scodeddl').val();
                                var subjectname=$('#faculty-exammarks-txtsname').val();
                                var fid=$("#faculty-exammarks-fid").val();

                                var currdate=new Date();
                                var day=currdate.getDate();
                                var month=currdate.getMonth()+1;
                                var fulldate=(day<10?'0':'')+day+"/"+(month<10?'0':'')+month+"/"+currdate.getFullYear();

                                var insertflag=0;

                                data.forEach(function(row){
                                    var stdname=row.student_name;
                                    var stdid=row.stdid;
                                    var marks=$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val();

                                    $.ajax({
                                        url:"/faculty/exammarks-save",
                                        method:"POST",
                                        contentType:"application/json",
                                        data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl,txtsem:semesterddl,txtsubcode:subjectddl,txtsubname:subjectname,txtstdname:stdname,txtstdid:stdid,txttotal:total,txtmarks:marks,txtfid:fid,txtdate:fulldate}),
                                
                                        success:function(data2)
                                        {
                                            if(data2=="success")
                                            {
                                                insertflag++;
                                                
                                            }
                                            else
                                            {
                                                //
                                            }
                                
                                        }
                                    });
                                                                

                                });

                                
                                alert("Marks Inserted Successfully");
                                window.location.href="/faculty/exam_marks";
                                
    

                            }
                            else
                            {
                                $(".faculty-exammarks-txttotal-error").css("display","inline");
                                $(".faculty-exammarks-txttotal-error").text("Enter valid Students Marks");
                            }

                        }
                        else
                        {
                           alert("Data Not Found");
                        }
            
                    }
                });
                
            }
        }



    });


    $('#faculty-exammarks-editsavebtn').click(function(){

        var batchddl=$('#faculty-exammarks-editacademicyearddl').val();
        var courseddl=$('#faculty-exammarks-editcourseddl').val();
        var semesterddl=$('#faculty-exammarks-editsemesterddl').val();
        var subjectddl=$('#faculty-exammarks-editscodeddl').val();
        

        if(batchddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Academic Year");
        }
        else if(courseddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Course");
        }
        else if(semesterddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Semester");
        }
        else if(subjectddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Subject Code");
        }
        else
        {
            $(".faculty-exammarks-editerror").css("display","none");
            
            
                $.ajax({
                    url:"/faculty/studentexam-data",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl,txtsem:semesterddl,txtscode:subjectddl}),
            
                    success:function(data)
                    {
                        if(data!=" ")
                        {
                            data.forEach(function(row){
                                $(".faculty-exammarks-stdmarkstxt"+row.stdid+"").attr("value",$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val());
                            });

                            
                            var valid=0;

                            data.forEach(function(row){
                                var marksval=$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val();
                                var total1=Number(row.totalmarks);
                                if(marksval=="")
                                {
                                    valid++;
                            
                                }
                                else
                                {
                                    if(isNaN(marksval))
                                    {
                                        valid++;
                                        
                                    }
                                    if(marksval>total1)
                                    {
                                        valid++;
                                    }

                                }
                                
                            });

                            if(valid==0)
                            {
                                
                                var insertflag=0;
                           
                                data.forEach(function(row){

                                    var marks=$(".faculty-exammarks-stdmarkstxt"+row.stdid+"").val();
                                    var updateid=row._id;

                                    $.ajax({
                                        url:"/faculty/exammarks-update",
                                        method:"POST",
                                        contentType:"application/json",
                                        data:JSON.stringify({txtmarks:marks,txtid:updateid}),
                                
                                        success:function(data2)
                                        {
                                            if(data2=="success")
                                            {
                                                insertflag++;
                                                
                                            }
                                            else
                                            {
                                                //
                                            }
                                
                                        }
                                    });
                                                                

                                });

                                
                                alert("Marks updated Successfully");
                                window.location.href="/faculty/exam_marks";
                                
    

                            }
                            else
                            {
                                $(".faculty-exammarks-editerror").css("display","inline");
                                $(".faculty-exammarks-editerror").text("Enter valid Students Marks");
                            }

                        }
                        else
                        {
                           alert("Data Not Found");
                        }
            
                    }
                });
                
            
        }



    });

    $('#faculty-exammarks-deletebtn').click(function(){

        var batchddl=$('#faculty-exammarks-editacademicyearddl').val();
        var courseddl=$('#faculty-exammarks-editcourseddl').val();
        var semesterddl=$('#faculty-exammarks-editsemesterddl').val();
        var subjectddl=$('#faculty-exammarks-editscodeddl').val();
        

        if(batchddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Academic Year");
        }
        else if(courseddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Course");
        }
        else if(semesterddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Semester");
        }
        else if(subjectddl==null)
        {
            $(".faculty-exammarks-editerror").css("display","inline");
            $(".faculty-exammarks-editerror").text("Select Subject Code");
        }
        else
        {
            $(".faculty-exammarks-editerror").css("display","none");
            
            
                $.ajax({
                    url:"/faculty/studentexam-data",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({txtbatch:batchddl,txtcourse:courseddl,txtsem:semesterddl,txtscode:subjectddl}),
            
                    success:function(data)
                    {
                        if(data!=" ")
                        {
                                
                                var insertflag=0;
                           
                                data.forEach(function(row){

                                    
                                    var deleteid=row._id;

                                    $.ajax({
                                        url:"/faculty/exammarks-delete",
                                        method:"POST",
                                        contentType:"application/json",
                                        data:JSON.stringify({txtid:deleteid}),
                                
                                        success:function(data2)
                                        {
                                            if(data2=="success")
                                            {
                                                insertflag++;
                                                
                                            }
                                            else
                                            {
                                                //
                                            }
                                
                                        }
                                    });
                                                                

                                });

                                
                                alert("Marks Deleted Successfully");
                                window.location.href="/faculty/exam_marks";
                                
    

                            
                        }
                        else
                        {
                           alert("Data Not Found");
                        }
            
                    }
                });
                
            
        }



    });




    $("#faculty-exammarks-insertbtn").click(function(){

        $("#faculty-insertexammarks-div").css("display","block");
        $("#faculty-exammarks-insertbtn").prop('disabled',true);
        $("#faculty-editexammarks-div").css("display","none");
        $("#faculty-exammarks-editbtn").prop('disabled',false);


        $("#faculty-exammarks-deletebtn").css("display","none");
        $("#faculty-exammarks-editsavebtn").css("display","none");
        $('#faculty-exammarks-editsemesterddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-editscodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-editcourseddl').val(" ");
        $('#faculty-exammarks-editsemesterddl').val(" ");
        $('#faculty-exammarks-editscodeddl').val(" ");
        $('#faculty-exammarks-edittxtsname').val(" ");
        $('.faculty-exammarks-editerror').css("display","none");
        $('#faculty-exammarks-editdisplaydatatable tbody').children().remove();
        $('#faculty-exammarks-editdisplaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");


    });

    $("#faculty-exammarks-editbtn").click(function(){

        $("#faculty-editexammarks-div").css("display","block");
        $("#faculty-exammarks-editbtn").prop('disabled',true);
        $("#faculty-insertexammarks-div").css("display","none");
        $("#faculty-exammarks-insertbtn").prop('disabled',false);
   
        $(".faculty-exammarks-totalbody").css("display","none");
        $("#faculty-exammarks-savebtn").css("display","none");
        $('#faculty-exammarks-semesterddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-scodeddl').children('option:not(:first)').remove();
        $('#faculty-exammarks-courseddl').val(" ");
        $('#faculty-exammarks-semesterddl').val(" ");
        $('#faculty-exammarks-scodeddl').val(" ");
        $('#faculty-exammarks-txtsname').val(" ");
        $('.faculty-exammarks-error').css("display","none");
        $('#faculty-exammarks-displaydatatable tbody').children().remove();
        $('#faculty-exammarks-displaydatatable tbody').append("<tr><td align='center' colspan='4'>Select Subject!</td></tr>");
    });






});