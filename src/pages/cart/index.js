/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-13 15:12:12
*/
var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _cart = require('service/cart');

var tpl = require('./index.tpl');

var page = {

	init:function(){
		this.$box = $('.cart-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//单个选中/取消
		this.$box.on('click','.select-one',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id')
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
		});

		//全选/全取消
		this.$box.on('click','.select-all',function(){
			var $this = $(this);
			//全选中
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})				
			}
			//全取消
			else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showPageError();
				})
			}
		});

		//删除一个
		this.$box.on('click','.delete-one',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id');
			if(_util.confirm('你确定要删除该条购物车信息吗?')){
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError();
				})
			}	
		});

		//删除选中
		this.$box.on('click','.delete-selected',function(){
			if(_util.confirm('你确定要删除该条购物车信息吗?')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_this.showPageError();
				})
			}	
		});
		//更新购物车数量
		this.$box.on('click','.count-btn',function(){
			var $this = $(this);
			var productId = $this.parents('.product-item').data('product-id')
			var $input = $this.siblings('.count-input');
			var current = parseInt($input.val());
			var max = $input.data('stock');
			var min = 1;
			var newCount = 0;
			//增加
			if($this.hasClass('plus')){
				if(current >= max){
					_util.showErrorMsg('商品到达上限了');
					return;
				}
				newCount = current + 1;
			}
			//减少
			else if($this.hasClass('minus')){
				if(current <= min ){
					_util.showErrorMsg('商品最少为一件');
					return;
				}
				newCount = current - 1;
			}
			//修改数量
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart);
			},function(msg){
				_this.showPageError();
			})

		});
		//去结算
		this.$box.on('click','.btn-submit',function(){
			if(_this.cart && _this.cart.totalCartPrice > 0){
				window.location.href = './order-confirm.html'
			}else{
				_util.showErrorMsg('请选择商品后再提交!!!')
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
		//从新渲染顶部的购物车数量
		_nav.loadeCartCount();

		//缓存购物车信息,用来提交时验证
		this.cart = cart;
		
		//购物车数据适配
		cart.cartList.forEach(item=>{
			if(item.product.images){
				item.product.image = item.product.images.split(',')[0];
			}else{
				item.product.image = require('images/product-default.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;

		//渲染购物车
		var html = _util.render(tpl,cart)
		this.$box.html(html);
	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	}
}

$(function(){
	page.init();
})