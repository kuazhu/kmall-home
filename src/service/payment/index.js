/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-15 17:03:33
*/
var _util = require('util')

var _payment = {

	getPaymentInfo:function(data,success,error){
		_util.request({
			url:'/payment/info',
			data:data,
			success:success,
			error:error		
		})
	},
	getPaymentStatus:function(data,success,error){
		_util.request({
			url:'/payment/status',
			data:data,
			success:success,
			error:error		
		})
	},			
}

module.exports = _payment;