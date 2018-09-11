/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-11 09:58:49
*/
var _util = require('util')

var _product = {

	getProductList:function(data,success,error){
		_util.request({
			url:'/product/homeList',
			data:data,
			success:success,
			error:error		
		})
	},
	getProductDetail:function(data,success,error){
		_util.request({
			url:'/product/homeDetail',
			data:data,
			success:success,
			error:error		
		})
	},			
}

module.exports = _product;