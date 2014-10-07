$(function(){
    var obtainFormMeta=function(formId){
        return $(formId).data();
    };

    var getTxt = function() {

        var txt = "";
        for (var ii = 0; ii < $('#connLen').val(); ii++) {
            var paramLenId = "#paramLenCon_" + ii;
            var parLen = $(paramLenId).val();
            for (var jj = 0; jj < parLen; jj++) {
                var paramNameId = '#param' + ii + '_' + jj;
                txt += $(paramNameId).val() + "|";
            }
            txt = txt.substring(0, txt.length - 1);
            txt += ",";
        }
        txt = txt.substring(0, txt.length - 1);
        return txt;
    };




    $('#add-form-btn').on('click',function(){

        var splittedVals = getTxt().split(',');
        for(var kk = 0; kk < $('#connLen').val(); kk ++ ) {
            var input_name= "#submitInput_"+kk;
            $(input_name).val(splittedVals[kk]);
        }

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

    $('.typeAwareItem').on('click', function(){
        var text = $(this).text();
        var textBoxId = $(this).attr("fortextbox");
        $('#'+textBoxId).val(text);
    });

});