function toPreview(){

	var src = $('.newsFormRadio[checked]')[0].value;
	var text = $('#newsText').val();

	console.log(src);
	console.log(text);

	$('#previewShow').html('');
	$('#previewShow').append('<li><img src='+ src +'></img></p><span>'+ text +'</span></li>');
}

$(document).ready(function(){
	
	var button = $('#preview');
	var textInput = $('#newsText');
	textInput.keyup(function(){
		if(textInput.val().length === 0){
			//disable
			return;		
		}
		//button enable

	});

	button.click(toPreview);
});