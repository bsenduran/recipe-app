$(function(){
    var obtainFormMeta=function(formId){
        return $(formId).data();
    };

    var txt="[";
    for(var ii = 0; ii< $('#ResLen'); ii++) {
        txt += $('#param'+ii).val() + ",";
    }
    txt = txt.substring(0, txt.length - 1);
    txt+= "]";

    $('#add-form-btn').on('click',function(){
        $([name='result_parametersvalue']).val(txt);
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


});