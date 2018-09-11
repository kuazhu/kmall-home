/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-11 17:07:26
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _cart = require('service/cart');

var tpl = require('./index.tpl');

var page = {

	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//单个选中/取消
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			//选中
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})
			}
			//取消
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})				
			}
		})
	},
	loadCart:function(){
		var _this = this;
		_cart.getCart(function(cart){
			_this.renderCart(cart)
		},function(){
			_this.showPageError();
		})
	},
	renderCart:function(cart){
		cart.cartList.forEach(item=>{
			if(item.product.images){
				item.product.image = item.product.images.split(',')[0];
			}else{
				item.product.image = require('images/product-default.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(tpl,cart)
		$('.cart-box').html(html);
	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	}
}

$(function(){
	page.init();
})