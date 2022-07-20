$(document).ready(function(){

    $('#admin-notice-addnoticefrm').on("submit",function(e){

        e.preventDefault();

        var nsubject=$("#admin-notice-subjecttxt").val();
        var nreceiver=$("#admin-notice-noticetypeddl").val();
        var ndetail=CKEDITOR.instances.admin_notice_txtdetails.getData();
        
        var currdate=new Date();
        var month=currdate.getMonth()+1;
        var day=currdate.getDate();
        var fulldate=(day<10?'0':'')+day+"/"+(month<10?'0':'')+month+"/"+currdate.getFullYear();

        $.ajax({

             url:"/admin/notice-save",
             method:"POST",
             contentType:"application/json",
             data:JSON.stringify({txtnsubject:nsubject,txtreceiver:nreceiver,txtndetail:ndetail,txtdate:fulldate}),
            
                success:function(data)
                {
                    if(data)
                    {
                          
                        alert(data);
                        window.location.href="/admin/notice";
                    }
                    else
                    {
                       alert("Something is wrong!");
                    }
            
                }
    
        });
        
    
    });
   
    
    $(document).on("click",".notice-editbtn",function(){
        
        $('#admin-notice-editpanel').css("display","block");
        $('#admin-notice-addpanel').css("display","none");

        var noticeid=$(this).data("editid");

        $.ajax({
            url:"/admin/notice-edit",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:noticeid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    $('#admin-notice-editsubjecttxt').val(data.subject);
                    $('#admin-notice-editnoticetypeddl').val(data.receiver);
                    CKEDITOR.instances.admin_notice_edittxtdetails.setData(data.details);
                    $('#admin-notice-editidtxt').val(data._id);

                    $('html').animate({scrollTop:0},300);

                }
                else
                {
                    alert("something is wrong");
                }
            }
                            
        });     

    
    });    

    $('.notice-updatecancel').click(function(){

        $('#admin-notice-editpanel').css("display","none");
        $('#admin-notice-addpanel').css("display","block");

    
    }); 
    
    $('#admin-notice-editnoticefrm').on("submit",function(e){

        e.preventDefault();

        var nsubject=$("#admin-notice-editsubjecttxt").val();
        var nreceiver=$("#admin-notice-editnoticetypeddl").val();
        var ndetail=CKEDITOR.instances.admin_notice_edittxtdetails.getData();
        var updateid=$('#admin-notice-editidtxt').val();

       
        $.ajax({

            url:"/admin/notice-update",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtnsubject:nsubject,txtreceiver:nreceiver,txtndetail:ndetail,txtid:updateid}),
        
            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/notice";
                    alert(data);
                }
                else
                {
                    alert("Something is wrong!");
                }
        
            }
        });
    
    });


    $(document).on("click",".notice-deletebtn",function(){

        var deleteid=$(this).data("deleteid");

        $.ajax({
            url:"/admin/notice-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtid:deleteid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/notice";
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