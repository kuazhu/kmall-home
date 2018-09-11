/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-11 11:12:42
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');

var tpl = require('./index.tpl');

var page = {
	params:{
		productId : _util.getParamFromUrl('productId') || '',
	},
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		if(this.params.productId){
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		//切换图片
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active');

			var imgSrc = $this.find('img').attr('src');
			$('.product-main-img img').attr('src',imgSrc);
		})

		//购物数量处理
		$('.detail-box').on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input');
			var stock = _this.stock;
			var min = 1;
			var current = parseInt($input.val());
			//增加
			if($this.hasClass('plus')){
				$input.val(current >= stock ? stock : current + 1)
			}else if($this.hasClass('minus')){
				$input.val(current > min ? current - 1 : min);
			}
		})

		$('.detail-box').on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()	
			},function(){
				window.location.href = './result.html?type=addCart'
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadProductDetail:function(){
		var _this = this;
		_product.getProductDetail({productId:this.params.productId},function(product){
			if(product){
				if(product.images){
					product.images = product.images.split(',')
				}else{
					product.images = [require('images/product-default.jpg')]
				}

				product.mainImg = product.images[0];

				//缓存库存为了修改购买数量使用
				_this.stock = product.stock;
				
				var html = _util.render(tpl,product);
				$('.detail-box').html(html)
			}else{
				$('.detail-box').html('<p class="empty-message">你要找的商品去火星了!!!</p>');
			}
		},function(msg){
			_util.showErrorMsg(msg)
		})
	}
}

$(function(){
	page.init();
})