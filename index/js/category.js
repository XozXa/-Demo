(function(){
	var items='<div class="category-item">'+
				'<img class="item-icon" src="$url"/>'+
				'<p class="item-name">$name</p>'+
		   '</div>';


	function initCategory(){
		$.get('../../json/head.json',function(data){
			// console.log(data);

			var list=data.data.primary_filter.splice(0,8);

			list.forEach(function(item,index){
				var str=items.
				replace('$url',item.url).
				replace('$name',item.name);


				$('.category-content').append($(str));
			});
		});
	}
	
	function btncategory(){
		$('.category-content').on('click','.category-item',function(){
			alert(1);
		});
	}

	function init(){
		initCategory();
		btncategory();
	}

	init();
})();

