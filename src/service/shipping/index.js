/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-14 15:01:19
*/
var _util = require('util')

var _shipping = {
	addShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			method:'post',
			data:data,
			success:success,
			error:error		
		})
	},
	editShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			method:'put',
			data:data,
			success:success,
			error:error		
		})
	},	
	getShippingList:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error		
		})
	},
	getShipping:function(data,success,error){
		_util.request({
			url:'/shipping',
			data:data,
			success:success,
			error:error		
		})
	},					
	deleteShipping:function(data,success,error){
		_util.request({
			url:'/shipping/delete',
			method:'put',
			data:data,
			success:success,
			error:error		
		})
	},					
}

module.exports = _shipping;