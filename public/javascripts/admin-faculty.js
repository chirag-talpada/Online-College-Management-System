$(document).ready(function(){



    $('#faculty-savefrm').on("submit",function(e){

        e.preventDefault();
    
        var txtmno=$('#faculty-txtmobile').val();
        var txtem=$('#faculty-txtemail').val();
    
        var checkm=create_student_vmobile(txtmno);
        var checke=create_student_vemail(txtem);
    
        if(checke)
        {
            if(checkm)
            {
                $('#create_faculty-error').css("display","none");
            }
            else
            {
                $('#create_faculty-error').css("display","inline");
                $('#create_faculty-error').text("Invalid Mobile Number");    
            }
        }
        else
        {
            $('#create_faculty-error').css("display","inline");
            $('#create_faculty-error').text("Invalid Email");
        }
    

        var txtfid=$('#faculty-txtid').val();
        
        if(txtfid.length==0)
        {
            $('#create_faculty-error').css("display","inline");
            $('#create_faculty-error').text("Generate ID Must Required!");
        }
        else
        {
            if(checke && checkm)
            {

                $('#create_faculty-error').css("display","none");
    
                var txtfname=$('#faculty-txtname').val();
                var txtdob=$('#faculty-txtdate').val();
                atxtdob=txtdob.split("-");
                btxtdob=atxtdob[2]+"/"+atxtdob[1]+"/"+atxtdob[0];
                var gender=$("input[name='faculty-gender']:checked").val();
                var txtaddress=$("#faculty-txtaddress").val();
                var txtemail=$("#faculty-txtemail").val();
                var txtmno=$('#faculty-txtmobile').val();
                var txtqly=$('#faculty-txtqlydetails').val();
                var txtjoindate=$('#faculty-txtjoindate').val();
                atxtjoindate=txtjoindate.split("-");
                btxtjoindate=atxtjoindate[2]+"/"+atxtjoindate[1]+"/"+atxtjoindate[0];
                var txtfid=$('#faculty-txtid').val();
                var txtfno=$('#faculty-no').val();
               //start here
                $.ajax({
                    url:"/admin/faculty-save",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({fname:txtfname,fdob:btxtdob,fgender:gender,faddress:txtaddress,femail:txtemail,fmno:txtmno,fqly:txtqly,fjoind:btxtjoindate,fid:txtfid,fno:txtfno}),
            
                    success:function(data)
                    {
                        if(data)
                        {
                          
                            alert(data);
                            window.location.href="/admin/faculty";
                        }
                        else
                        {
                            alert("something is wrong!");
                        }
            
                    }
        
                });
    
            }
        }    
    
            
    });
    

    $("#faculty-generateid").click(function(){
        
        $.ajax({
            url:"/admin/faculty-gid",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({temp:"null"}),
    
            success:function(data)
            {
                if(data=="1")
                {
                    $('#create_faculty-error').css("display","none");
                    var fid="F000"+data;
                    $('#faculty-no').val(1);
                    $('#faculty-txtid').val(fid);
                    
                    
                }
                else
                {
                    $('#create_faculty-error').css("display","none");
                    var fid="F000"+Number(data.fno+1);
                    $('#faculty-no').val(data.fno+1);
                    $('#faculty-txtid').val(fid);
                    
                }
    
            }

        });



    });

    $(document).on("click",".faculty-editbtn",function(){
        
        $('#faculty-editpanel').css("display","block");
        $('#faculty-addpanel').css("display","none");

        var fid=$(this).data("editfid");

        $.ajax({
            url:"/admin/faculty-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtfid:fid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    $('#faculty-edittxtname').val(data.faculty_name);
                    
                    atxtdob=data.dob.split("/");
                    btxtdob=atxtdob[2]+"-"+atxtdob[1]+"-"+atxtdob[0];
                    
                    $('#faculty-edittxtdate').val(btxtdob);
                    $('#faculty-edittxtaddress').val(data.address);                 
                    $('#faculty-edittxtemail').val(data.email);
                    $('#faculty-edittxtmobile').val(data.mobileno);
                    $('#faculty-editid').val(data._id);
                    $('#faculty-edittxtqlydetails').val(data.qualification);
                    atxtjoindate=data.joindate.split("/");
                    btxtjoindate=atxtjoindate[2]+"-"+atxtjoindate[1]+"-"+atxtjoindate[0];
                    
                    $('#faculty-edittxtjoindate').val(btxtjoindate);
                    if(data.gender!='female')
                    {
                        $('#faculty-gmale').prop('checked',true);
                    }
                    else
                    {
                        $('#faculty-gfemale').prop('checked',true);
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


    $('.faculty-updatecancel').click(function(){

        $('#faculty-editpanel').css("display","none");
        $('#faculty-addpanel').css("display","block");
        $('#create_faculty-editerror').css("display","none");
    
    }); 
    
    $('#faculty-editfrm').on("submit",function(e){

        e.preventDefault();
    
        var txtmno=$('#faculty-edittxtmobile').val();
        var txtem=$('#faculty-edittxtemail').val();
    
        var checkm=create_student_vmobile(txtmno);
        var checke=create_student_vemail(txtem);
    
        if(checke)
        {
            if(checkm)
            {
                $('#create_faculty-editerror').css("display","none");
                
                var txtfname=$('#faculty-edittxtname').val();
                var txtdob=$('#faculty-edittxtdate').val();
                atxtdob=txtdob.split("-");
                btxtdob=atxtdob[2]+"/"+atxtdob[1]+"/"+atxtdob[0];
                
                var gender=$("input[name='faculty-editgender']:checked").val();
                var txtaddress=$("#faculty-edittxtaddress").val();
                var txtemail=$("#faculty-edittxtemail").val();
                var txtmno=$('#faculty-edittxtmobile').val();
                var txtid=$('#faculty-editid').val();
                var txtqly=$('#faculty-edittxtqlydetails').val();
                var txtjoindate=$('#faculty-edittxtjoindate').val();
                atxtjoindate=txtjoindate.split("-");
                btxtjoindate=atxtjoindate[2]+"/"+atxtjoindate[1]+"/"+atxtjoindate[0];
               
               
                $.ajax({
                    url:"/admin/faculty-update",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({fname:txtfname,fdob:btxtdob,fgender:gender,faddress:txtaddress,femail:txtemail,fmno:txtmno,updateid:txtid,fqly:txtqly,fjoin:btxtjoindate}),
            
                    success:function(data)
                    {
                        if(data)
                        {
                          
                            alert(data);
                            window.location.href="/admin/faculty";
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
                $('#create_faculty-editerror').css("display","inline");
                $('#create_faculty-editerror').text("Invalid Mobile Number");    
            }
        }
        else
        {
            $('#create_faculty-editerror').css("display","inline");
            $('#create_faculty-editerror').text("Invalid Email");
        }
                     
    });
    

    $(document).on("click",".faculty-deletebtn",function(){

        var fid=$(this).data("fid");
    
        $.ajax({
            url:"/admin/faculty-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtfid:fid}),
    
            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/faculty";
                    alert(data);
    
                }
                else
                {
                    alert("Failed to delete! data exists for this faculty");
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
