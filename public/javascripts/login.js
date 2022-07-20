
 
$(document).ready(function(){

    


    $('#lgfrm').on("submit",function(e){

        e.preventDefault();
        

        //recognize which user wants loggin

        var role=$("input[name='type']:checked").val();
        //===

        $.ajax({

            url:"/login",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({username:$('#txtusername').val(),password:$('#txtpassword').val(),type:role}),

            success:function(data)
            {
                
                if(data!=" ")
                {
                    $('#errorlogin').css("display","block");     
                }
                else
                {
                 
                    if(role=="admin")
                    {
                        
                        $('#errorlogin').css("display","none");
                        window.location.href="/admin";     
                    }
                    else if(role=="faculty")
                    {
                        $('#errorlogin').css("display","none");
                        window.location.href="/faculty";     
                    }
                    else if(role=="student")
                    {
                        $('#errorlogin').css("display","none");
                        window.location.href="/student";     
                    }
                    else
                    {
                        alert("Something is wrong!")
                    }
                    
                }
            }

        });

    });
  
});

