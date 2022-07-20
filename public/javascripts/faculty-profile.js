$(document).ready(function(){

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
                url:"faculty/faculty-password",
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify({newpassword:$('#txtnewpass').val(),currentpass:$('#txtcurrentpass').val()}),
    
                success:function(data)
                {
                    if(data!=" ")
                    {
                        window.location.href="/faculty";
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

    



});