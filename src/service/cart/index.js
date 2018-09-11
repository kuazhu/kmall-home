/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-11 16:59:15
*/
var _util = require('util')

var _cart = {

	addCart:function(data,success,error){
		_util.request({
			url:'/cart',
			method:'post',
			data:data,
			success:success,
			error:error		
		})
	},
	getCart:function(success,error){
		_util.request({
			url:'/cart',
			success:success,
			error:error		
		})
	},
	selectOne:function(data,success,error){
		_util.request({
			url:'/cart/selectOne',
			method:'put',
			data:data,
			success:success,
			error:error		
		})
	},
	unselectOne:function(data,success,error){
		_util.request({
			url:'/cart/unselectOne',
			method:'put',
			data:data,
			success:success,
			error:error		
		})
	},				
}

module.exports = _cart;