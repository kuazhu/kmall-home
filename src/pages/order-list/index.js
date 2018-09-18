/*
* @Author: TomChen
* @Date:   2018-09-04 09:58:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-17 11:22:22
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

//引入分页插件
require('util/pagination')

var _util = require('util');
var _order = require('service/order');
var _side = require('pages/common/side');

var tpl = require('./index.tpl')

var page = {
	params:{
		page:_util.getParamFromUrl('page') || 1,
	},	
	init:function(){
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.params.page = value;
			_this.loadOrderList();
		});
		$pagination.pagination();
	},	
	onload:function(){
		_side.render('order-list')
	},
	loadOrderList:function(){
		$('.order-box').html("<div class='loading'></div>");
		_order.getOrderList(this.params,function(orders){
			//图片和时间适配
			let list = orders.list.map(order=>{
				order.productList.forEach(product=>{
					product.image = product.images.split(',')[0];
				})
				order.createdTime = new Date(order.createdAt).toLocaleString();
				return order;
			});

			var html = _util.render(tpl,{
				list:list,
				notEmpty:!!list.length
			});
			$('.order-box').html(html)

			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize,
			})
		},function(msg){
			$('.order-box').html('<p class="empty-message">获取订单列表出错了,刷新试试看!!!</p>')
		})
	}
}

$(function(){
	page.init();
})