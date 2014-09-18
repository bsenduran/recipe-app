$(function(){

	/*
	Creates a new asset
	*/

	//var id=$('#meta-asset-id').html();
	var type=$('#meta-asset-type').val();
	
		
		
		$('#btn-create-asset').on('click',function(){
			var fields=$('#form-asset-create :input');
			var data={};
			fields.each(function(){
				if(this.type!='button')
				{
					//console.log(this.value);
					data[this.id]=this.value;
				}
			});

			$.ajax({
				url:'/recipe-app/asset/'+type,
				type:'POST',
				data: data,
				success:function(response){
					alert('asset added.');
					window.location='/recipe-app/assets/'+type+'/';
				},
				error:function(response){
					alert('Failed to add asset.');
				}
			});
			

			
			//$.post('/recipe-app/asset/'+type, data);

		});
	//}
	
	
});
