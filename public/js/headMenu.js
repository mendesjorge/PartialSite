function imgGoToBlank(){
	var link = $(this).attr('link');
	window.open(link, '_blank');
}
function imgGoToParent(){
	var link = $(this).attr('link');
	window.open(link, '_parent');
}
$(document).ready(function(){
	$('.ltb').click(imgGoToBlank);
	$('.ltp').click(imgGoToParent);
});