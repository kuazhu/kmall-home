/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-13 16:04:10
*/
var _util = require('util')

var _order = {

	getOrderProductList:function(success,error){
		_util.request({
			url:'/order/orderProductList',
			success:success,
			error:error		
		})
	},					
}

module.exports = _order;