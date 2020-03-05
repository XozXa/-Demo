(function(){
	function urlLoca(url){
		var $itemContent=$('.r-item-content');


		// console.log($itemContent.data('itemName'));
		for(var i=0;i<$itemContent.length;i++){
			(function(index){
				$($itemContent[index]).on('click',function(){

				location='../../menu'+(index+1)+'/menu.html#'+url+'#'+$($itemContent[index]).data('itemName');
				console.log($($itemContent[index]).data('itemName'));

			})
			})(i);
		}
	}


	window.geturl={
		urlLoca:urlLoca
	};
})();