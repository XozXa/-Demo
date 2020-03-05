(function(){
	var items='<a class="$key btn-item" href="../$key/$key.html">'+
					'<div class="tab-icon"></div>'+
					'<div class="btn-name">$text</div>'+
			  '</a>';

	function init(){
		var itemArr=[
			{
				key:'index',
				text:'首页'
			},{
				key:'order',
				text:'订单'
			},{
				key:'my',
				text:'我的'
			}
		];



		var str='';

		itemArr.forEach(function(item){
			str+=items.replace(/\$key/g,item.key)
					  .replace('$text',item.text);
		});


		$('.bottom-bar').append($(str));


		var arr=window.location.pathname.split('/');
		var page=arr[arr.length-1].replace('.html','');


		$('a'+'.'+page).addClass('active');


	}
	init();
})()