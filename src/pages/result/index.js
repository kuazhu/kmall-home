/*
* @Author: TomChen
* @Date:   2018-09-04 09:58:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-06 17:02:48
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util');

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';
	$("."+type).show();
})