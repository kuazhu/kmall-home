/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-17 09:30:50
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _payment = require('service/payment');

var tpl = require('./index.tpl');

var page = {
	params:{
		orderNo : _util.getParamFromUrl('orderNo') || '',
	},
	init:function(){
		this.onload();
	},
	onload:function(){
		if(this.params.orderNo){
			this.loadPaymentDetail();
		}
	},
	loadPaymentDetail:function(){
		var _this = this;
		$('.payment-box').html("<div class='loading'></div>");
		_payment.getPaymentInfo({orderNo:this.params.orderNo},function(payment){				
			var html = _util.render(tpl,payment);
			$('.payment-box').html(html);
			_this.listenPaymentStatus();
		},function(msg){
			$('.payment-box').html('<p class="empty-message">获取支付信息出错了,刷新试试看!!!</p>')
		})
	},
	listenPaymentStatus:function(){
		var _this = this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if(result == true){
					window.location.href = "./result.html?type=payment&orderNo="+_this.params.orderNo;
				}
			})
		},5000)
	}
}

$(function(){
	page.init();
})