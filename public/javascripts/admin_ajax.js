$(document).ready(function(){

    var usernamedefault;
    var dfname,dmno,demail,dgender;

   
    $('.profile-edit').click(function(){

        $('.profile-cancel').css('display','inline-block');
        $(this).css('display','none');
        $('.updatebtn').css("display","inline-block");
        $('#txtusername').removeAttr('readonly');
        $('#txtusername').addClass('txteffect');
        usernamedefault=$('#txtusername').val();
    });

    $('.profile-cancel').click(function(){

        $('.profile-edit').css('display','inline-block');
        $(this).css('display','none');
        $('.updatebtn').css("display","none");
        $('#txtusername').attr('readonly',true);
        $('#txtusername').removeClass('txteffect');
        $('#txtusername').val(usernamedefault);
    });


    //changing the username
    $('#usernamefrm').on('submit',function(e){

        e.preventDefault();

        $.ajax({
            url:"admin/profile-username",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({updatedusername:$('#txtusername').val()}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin";  
                }
                else
                {
                    alert("something is wrong!");
                }
            }
        });


    });

    //changing the password
    $('#passwordfrm').on('submit',function(e){

        e.preventDefault();

        var newpass=$('#txtnewpass').val();
        var conpass=$('#txtconfirmnewpass').val();

        if(newpass!=conpass)
        {
            $('.error-pass').css("display","inline");
            $('.error-currpass').css("display","none");
        }
        else
        {
            $.ajax({
                url:"admin/profile-password",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({newpassword:$('#txtnewpass').val(),currentpass:$('#txtcurrentpass').val()}),
    
                success:function(data)
                {
                    if(data!=" ")
                    {
                        window.location.href="/admin";
                        alert(data);  
                    }
                    else
                    {
                        $('.error-pass').css("display","none");
                        $('.error-currpass').css("display","inline");
                    }
                }         
            });
        }

        
    });

    //clicking of change password

    $('#changepass').click(function(){
        
        $('#password-area').css("display","block");
        $(this).css("display","none");
        $('.password-cancel-panel').css('display','inline-block');
    });

    $('.password-cancel').click(function(){
        
        $('#password-area').css("display","none");
        $('.password-cancel-panel').css('display','none');
        $('#changepass').css("display","inline");

        //removing the text and error if user write something or arises error and user immedetely cancel
        
        $('#txtcurrentpass').val("");
        $('#txtnewpass').val("");
        $('#txtconfirmnewpass').val("");

        $('.error-currpass').css("display","none");
        $('.error-pass').css("display","none");

    });

    //personal-information

    $('.personal-edit').click(function(){

        $(this).css("display","none");
        $('.savebtn').css("display","inline");
        $('.personal-cancel').css("display","inline");

        //enable the controls

        $('#txtfullname').removeAttr('disabled');
        $('#txtmobile').removeAttr('disabled');
        $('#txtemail').removeAttr('disabled');
        $('#gmale').removeAttr('disabled');
        $('#gfemale').removeAttr('disabled');

        //retrive default data

        dfname=$('#txtfullname').val();
        dmno=$('#txtmobile').val();
        demail=$('#txtemail').val();
        dgender=$("input[name='gender']:checked").val();
        
    });
    
    $('.personal-cancel').click(function(){

        $(this).css("display","none");
        $('.savebtn').css("display","none");
        $('.personal-edit').css("display","inline");

        $('.error-mobile').css("display","none");
        $('.error-email').css("display","none");

        $('#txtfullname').attr('disabled',true);
        $('#txtmobile').attr('disabled',true);
        $('#txtemail').attr('disabled',true);
        $('#gmale').attr('disabled',true);
        $('#gfemale').attr('disabled',true);

        $('#txtfullname').val(dfname);
        $('#txtmobile').val(dmno);
        $('#txtemail').val(demail);

        if(dgender!='female')
        {
            $('#gmale').prop('checked',true);
        }
        else
        {
            $('#gfemale').prop('checked',true);
        }
        
        
    });

    //update profile personal information

    $('#personalfrm').on('submit',function(e){

        e.preventDefault();

        var mobileno=$('#txtmobile').val();
        

        if(isNaN(mobileno))
        {
            $('.error-mobile').css("display","inline");
            $('.error-mobile').text('Invalid Mobile Number')
        }
        else
        {
            if(mobileno.length!=10)
            {
                $('.error-mobile').css("display","inline");
                $('.error-mobile').text('Mobile Number should be 10 digit')
            }
            else
            {
                $('.error-mobile').css("display","none");
                var txtemail=$('#txtemail').val();
                var reg=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

                if(reg.test(txtemail))
                {
                    $('.error-email').css("display","none");
                    var gender=$("input[name='gender']:checked").val();

                    $.ajax({
                        url:"admin/profile-personal",
                        method:"POST",
                        contentType:"application/json",
                        data:JSON.stringify({fullnametxt:$('#txtfullname').val(),mobiletxt:$('#txtmobile').val(),emailtxt:$('#txtemail').val(),genderval:gender}),

                        success:function(data)
                        {
                            if(data!=" ")
                            {
                                window.location.href="/admin";  
                                alert(data);
                            }
                            else
                            {
                                alert("something is wrong!");
                            }
                        }
                    });

                }
                else
                {
                    $('.error-email').css("display","inline");
                }


                

            }
        }

        


        
    });
 


});