$(document).ready(function(){

    $('#batch-year-createyearfrm').on("submit",function(e){

        e.preventDefault();
        
        var year=$('#batch-year-txtyear').val();

        if(isNaN(year))
        {
            $('.batch-year-erroryear').css("display","inline");
            $('.batch-year-erroryear').text("input valid year");
        }
        else
        {
            if(year.length!=4)
            {
                $('.batch-year-erroryear').css("display","inline");
                $('.batch-year-erroryear').text("input valid year");
            }
            else
            {
                $('.batch-year-erroryear').css("display","none");

                $.ajax({
                    url:"/admin/batch_year-save",
                    method:"POST",
                    contentType:"application/json",
                    data:JSON.stringify({txtbatch_year:year,txtdetail:$('#batch-year-txtyeardetails').val()}),

                    success:function(data)
                    {
                        if(data!=" ")
                        {
                            window.location.href="/admin/batch_year";
                            alert(data);
                        }
                        else
                        {
                            $('.batch-year-erroryear').css("display","inline");
                            $('.batch-year-erroryear').text("Already Exist");
                        }

                    }
                });

            }
        }

    });


    $(document).on("click",".batch-year-deletebtn",function(){

        var batchid=$(this).data("id");

        $.ajax({
            url:"/admin/batch-year-delete",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({txtbatchid:batchid}),

            success:function(data)
            {
                if(data!=" ")
                {
                    window.location.href="/admin/batch_year";
                    alert(data);

                }
                else
                {
                    alert("Failed to delete! data Exists for this Year");
                }
            }
                            
        });

    });


});