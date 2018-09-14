/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-14 09:14:14
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _shipping = require('service/shipping');
var _order = require('service/order');
var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl');
var productTpl = require('./product.tpl');

var page = {

	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		//绑定新增地址事件
		$('.shipping-box').on('click','.shipping-add',function(){
			_modal.show()
		})						
	},
	loadShippingList:function(){
		var _this = this;
		this.renderShipping();
	
	},
	renderShipping:function(shippings){

		var html = _util.render(shippingTpl);
		$('.shipping-box').html(html);

	},
	loadProductList:function(){
		var _this = this;
		_order.getOrderProductList(function(result){
			//购物车数据适配
			result.cartList.forEach(item=>{
				if(item.product.images){
					item.product.image = item.product.images.split(',')[0];
				}else{
					item.product.image = require('images/product-default.jpg');
				}
			})
			result.notEmpty = !!result.cartList.length;

			var html = _util.render(productTpl,result);
			$('.product-box').html(html);	
			
		},function(){
			$('.product-box').html('<p class="empty-message">获取商品列表出错了,刷新试试看!!!</p>')
		})
	},	
}

$(function(){
	page.init();
})