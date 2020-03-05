(function(){
	var items='<div class="r-item-content">'+
				'<img class="item-img" src="$pic_url"/>'+
				'$brand'+
				'<div class="item-info-content">'+
					'<p class="item-title">$name</p>'+
					'<div class="item-desc clearft">'+
						'<div class="item-score">$wm_poi_score</div>'+
						'<div class="item-count">月售$monthNmu</div>'+
						'<div class="item-distance">&nbsp;$distance</div>'+
						'<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
					'</div>'+
					'<div class="item-price">'+
						'<div class="item-pre-price">$min_price_tip</div>'+
					'</div>'+
					'<div class="item-others">'+
						'$others'+
					'</div>'+
				'</div>'+
		   	  '</div>';

	var page=0;
	var isLoading=false;
	//获取数据
	function getlist(){
		page++;
		isLoading=true;
		$.get('../../json/homelist.json',function(data){
			console.log(data);
			var list=data.data.poilist||[];
			initContentList(list);
			
			isLoading=false;
		});
	}
	//渲染品牌
	function getBrand(data){
		if(data.brand_type){
			return '<div class="brand brand-pin">品牌</div>';
		}else{
			return '<div class="brand brand-xin">新到</div>';
		}
	}
	//月售数据和处理
	function getmonth(num){
		if(num>999){
			return "999+"
		}

		return num;
	}
	//活动栏
	function getOthers(data){
		var array=data.discounts2;

		var str='';
		array.forEach(function(item,index){
			var _str='<div class="other-info">'+
						'<img src="$icon_url" class="other-tag">'+
						'<p class="other-content one-line">$info</p>'+
					 '</div>';

			_str=_str
				 .replace('$icon_url',item.icon_url)
				 .replace('$info',item.info);


			str+=_str;
		});

		return str;
	}
	//渲染数据
	function initContentList(list){
		list.forEach(function(item,index){
			var str=items
				.replace('$pic_url',item.pic_url)
				.replace('$name',item.name)
				.replace('$min_price_tip',item.min_price_tip)
				.replace('$distance',item.distance)
				.replace('$mt_delivery_time',item.mt_delivery_time)
				


				.replace('$brand',getBrand(item))
				.replace('$monthNmu', getmonth(item.month_sale_num))
				.replace('$others', getOthers(item))
				.replace('$wm_poi_score',new StarScore(item.wm_poi_score).getStars());

			/*var $str=$(str);
			
			$str.data('itemData',item);
			console.log(str);
			console.log($str.data('itemData'));*/

			$('.list-wrap').append($(str));
		});

		/*console.log($('.r-item-content')[0]);
		console.log($($('.r-item-content')[0]).data('itemData'));*/
		window.geturl.urlLoca(window.location.href);
	}


	function addEvent(){
		window.addEventListener('scroll',function(){
			var clientHeight=document.documentElement.clientHeight,
				scrollHeight=document.body.scrollHeight,
				scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var proDis=30;
			if((scrollTop+clientHeight)>=(scrollHeight-proDis)){
				if(page<3){
					if(isLoading){
						return;
					}
					getlist();
				}else{
					$('.loading').text('加载完成');
				}
			}
		});
	}


	function init(){
		getlist();
		addEvent();
	}
	init();
})()