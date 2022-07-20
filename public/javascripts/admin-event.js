$(document).ready(function(){

    if($("#admin-event-alertbox").text()!='')
    {
        alert($("#admin-event-alertbox").text());
    }


    $('#admin-event-addeventfrm').submit(function(){

        

        var imgval=$("#admin-event-filephoto").val();
        var ext=["jpeg","png","jpg","JPEG","PNG","JPG"];        
        var dotimg=imgval.lastIndexOf('.')+1;
        var imgext=imgval.substring(dotimg);

        var result=ext.includes(imgext);

        if(result==false)
        {
            
            $('.admin-event-error').css("display","inline");
            $('.admin-event-error').text("(Not an image! choose valid image ['.jpeg','.jpg','.png'])");
            return false;
        }
        else
        {
            var size=validfile();
            
            if(size)
            {
                $('.admin-event-error').css("display","none");
                return true;
            }
            else
            {
                
                $('.admin-event-error').css("display","inline");
                $('.admin-event-error').text("(Not an valid image! image size must be less than 2MB");
                return false;
            }

        }
        
    });

    $('#admin-event-editeventfrm').submit(function(){

        

        var imgval=$("#admin-event-editfilephoto").val();
        var ext=["jpeg","png","jpg","JPEG","PNG","JPG"];        
        var dotimg=imgval.lastIndexOf('.')+1;
        var imgext=imgval.substring(dotimg);

        var result=ext.includes(imgext);

        if($("#admin-event-editfilephoto").val()=="")
        {
            return true;
        }

        if(result==false)
        {
            $('.admin-event-suggestion').css("display","none");
            $('.admin-event-editerror').css("display","inline");
            $('.admin-event-editerror').text("(Not an image! choose valid image ['.jpeg','.jpg','.png'])");
            return false;
        }
        else
        {

            var imgsize=document.forms["admin-event-editeventfrm"]["admin_event_filephoto"];
    
            console.log(imgsize);
            if(parseFloat(imgsize.files[0].size/(1024*1024))>=2)
            {
                $('.admin-event-suggestion').css("display","none");
                $('.admin-event-editerror').css("display","inline");
                $('.admin-event-editerror').text("(Not an valid image! image size must be less than 2MB");
                return false;
            }
            else
            {
                $('.admin-event-editerror').css("display","none");
                return true;
            }
    
        }
        
    });


    $(document).on("click",".admin-event-editbtn",function(){
        
        $('#admin-event-editpanel').css("display","block");
        $('#admin-event-addpanel').css("display","none");

        var eventid=$(this).data("editid");

        $.ajax({
            url:"/admin/event-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:eventid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    $('#admin-event-editeventnametxt').val(data.event_name);
                    $('#admin-event-editeventguidetxt').val(data.event_g);
                    $('#admin-event-editeventstimetxt').val(data.start_time);
                    $('#admin-event-editeventetimetxt').val(data.end_time);

                    var txtedate=data.e_stringdate;
                    var atxtedate=txtedate.split("/");
                    var btxtedate=atxtedate[2]+"-"+atxtedate[1]+"-"+atxtedate[0];
                        
                   

                    $('#admin-event-editdatetxt').val(btxtedate);

                    $('#admin-event-edittxtdetails').val(data.details);

                    $('#admin-event-editid').val(data._id);

                    $('html').animate({scrollTop:0},300);

                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });     

    
    });    

    $('.event-updatecancel').click(function(){

        $('#admin-event-editpanel').css("display","none");
        $('#admin-event-addpanel').css("display","block");

    
    }); 


    $(document).on("click",".admin-event-deletebtn",function(){

        var deleteid=$(this).data("deleteid");

        $.ajax({
            url:"/admin/event-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:deleteid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/event";
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


function validfile()
{
    
    var imgsize=document.forms["admin-event-addeventfrm"]["admin_event_filephoto"];
    
    
    if(parseFloat(imgsize.files[0].size/(1024*1024))>=2)
    {
        return false;
    }
    else
    {
        return true;
    }
    

}