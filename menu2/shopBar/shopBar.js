(function(){
	var itemTopTmpl='<div class="choose-content hide">'+
						'<div class="content-top">'+
							'<div class="clear-car">清空购物车</div>'+
						'</div>'+
				  '</div>';

	var itemBottomTmpl='<div class="bottm-content">'+
							'<div class="shop-icon">'+
								'<div class="dot-num hide"></div>'+
							'</div>'+
							'<div class="price-content">'+
								'<p class="total-price">¥<span class="total-price-span">0</span></p>'+
								'<p class="other-price">另需配送费&nbsp;¥<span class="shipping-fee">0</span></p>'+
							'</div>'+
							'<div class="submit-btn">去结算</div>'
					  '</div>';


	var $strBottom=$(itemBottomTmpl);
	var $strTop=$(itemTopTmpl);

	function changeShippingPrice(str){
		$strBottom.find('.shipping-fee').text(str);
	}
	function changeTotalPrice(str){
		$strBottom.find('.total-price-span').text(str);
	}


	function renderItems(){
		$strTop.find('.choose-item').remove();
		var list=window.food_spu_tags||[];
		var tmpl='<div class="choose-item">'+
					'<div class="item-name">$name</div>'+
					'<div class="price">¥<span class="total">$price</span></div>'+
					'<div class="select-content">'+
						'<div class="minus"></div>'+
						'<div class="count">$chooseCount</div>'+
						'<div class="plus"></div>'+
					'</div>'+
				 '</div>';

		var totalPrice=0;

		list.forEach(function(item){
			item.spus.forEach(function(_item){
				if(_item.chooseCount>0){
					var price=_item.min_price*_item.chooseCount;
					var row=tmpl.replace('$name',_item.name)
								.replace('$price',price)
								.replace('$chooseCount',_item.chooseCount);

					totalPrice+=price;
					var $row=$(row);
					$row.data('itemData',_item);
					$strTop.append($row);
				}
			});
		});
		changeTotalPrice(totalPrice);
		changeDot();
	}	


	function changeDot(){
		var $counts=$strTop.find('.count');
		var total=0;
		for(var i=0;i<$counts.length;i++){
			total+=parseInt($($counts[i]).text());
		}
		if(total){
			$('.dot-num').show().text(total);
		}else{
			$('.dot-num').hide();
		}
	}

	function addClick(){
		$('.clear-car').on('click',function(e){
			var $item=$('.choose-content .plus').parents('.choose-item');
			for(var i=0;i<$item.length;i++){
				$($item[i]).data('itemData').chooseCount=0;
			}

			renderItems();

			$('.left-item.active').click();
		})
		$('.shop-bar').on('click','.shop-icon',function(){
			$('.mask').toggle();
			$strTop.toggle();
		})
		$('.mask').on('click',function(){
			$(this).hide();
			$strTop.hide();
		});
		$strTop.on('click','.plus',function(e){
			var $count=$(e.currentTarget).parent().find('.count');
			$count.text(parseInt($count.text()||'0')+1);
			var $item=$(e.currentTarget).parents('.choose-item').first();
			var itemData=$item.data('itemData');
			itemData.chooseCount=itemData.chooseCount+1;

			renderItems();

			$('.left-item.active').click();

		});
		$strTop.on('click','.minus',function(e){
			var $count=$(e.currentTarget).parent().find('.count');
			if($count.text()==0) return;
			$count.text(parseInt($count.text()||'0')-1);
			var $item=$(e.currentTarget).parents('.choose-item').first();
			var itemData=$item.data('itemData');
			itemData.chooseCount=itemData.chooseCount-1;

			renderItems();

			$('.left-item.active').click();
		});
	}

	function init(data){
		$('.shop-bar').append($strTop);
		$('.shop-bar').append($strBottom);
		addClick();
	}
	
	init();


	window.ShopBar={
		renderItems:renderItems,
		changeShippingPrice:changeShippingPrice
	};
})()