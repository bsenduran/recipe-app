$(function(){
    var obtainFormMeta=function(formId){
        return $(formId).data();
    };


    $('#del-btn').on('click',function(){
        $('#form-delete').ajaxSubmit({
            success:function(){
                var options=obtainFormMeta('#form-delete');
            },
            error:function(e){
                alert('Unable to update the dish'+ stringify(e[0]));
            }
        });
    });




});
