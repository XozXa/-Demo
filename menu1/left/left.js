(function(){
	var items='<div class="left-item">'+
					'<div class="item-text">$getItemContent</div>'+
			  '</div>';

	function getList(){
		$.get('../../json/food.json',function(data){
			console.log(data);
			window.food_spu_tags=data.data.food_spu_tags||[];
			initContentList(window.food_spu_tags);

			window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee||0);
		})
	}

	function getItemContent(data){
		if(data.icon){
			return '<img class="item-icon" src='+data.icon+' />'+data.name;
		}else{
			return data.name;
		}
	}

	function initContentList(list){
		list.forEach(function(item,index){
			var str=items.
					replace('$getItemContent',getItemContent(item));

			var $target=$(str);

			$target.data('itemData',item);
			$('.left-bar-inner').append($target);
		});
		$('.left-item').first().click();
	}	

	function addClick(){
		$('.menu-inner').on('click','.left-item',function(e){
			var $target=$(e.currentTarget);

			$target.addClass('active');
			$target.siblings().removeClass('active');

			window.Right.refresh($target.data('itemData'));

		});
	}

	function init(){
		getList();
		addClick()
	}
	init();
})()