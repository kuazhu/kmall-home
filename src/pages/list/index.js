/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-08 17:05:16
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');


var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.bindEvent();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			var $this = $(this);
			//如果点击的是默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				_this.listParams.orderBy = 'default'
			}
			//按价格排序
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');	
				if(!$this.hasClass('asc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy = 'price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy = 'price_desc';					
				}			
			}
			_this.loadProductList();

		});
	},
	loadProductList:function(){
		this.listParams.categoryId 
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId) 
		console.log(this.listParams)
	}
}

$(function(){
	page.init();
})