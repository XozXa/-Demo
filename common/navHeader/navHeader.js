(function(){
	var url=window.location.href.split('#');
	$('.back-icon').on('click',function(){
		location=url[1];
	});
	
})()