/*
* @Author: TomChen
* @Date:   2018-09-04 16:47:16
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-13 16:02:57
*/
var _util = require('util')

var _shipping = {

	addCart:function(data,success,error){
		_util.request({
			url:'/cart',
			method:'post',
			data:data,
			success:success,
			error:error		
		})
	},
						
}

module.exports = _shipping;