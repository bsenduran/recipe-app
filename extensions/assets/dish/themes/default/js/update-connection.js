$(function(){
    var obtainFormMeta=function(formId){
        return $(formId).data();
    };


    $('#add-form-btn').on('click',function(){
        $('#form-update').ajaxSubmit({
            success:function(){
                var options=obtainFormMeta('#form-update');
                window.location=options.redirectUrl;
            },
            error:function(){
                alert('Unable to update the dish');
            }
        });
    });


    $('.add-connection-btn-x').on('click',function(){
        $('#form-update').ajaxSubmit({
            success:function(){
                var options=obtainFormMeta('#form-update');
            },
            error:function(){
                alert('Unable to update the dish');
            }
        });
    });

});