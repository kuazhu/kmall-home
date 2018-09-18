/*
* @Author: TomChen
* @Date:   2018-09-04 09:58:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-17 09:32:16
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _util = require('util');
var _user = require('service/user');
var _side = require('pages/common/side');

var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		$('.side-content').html("<div class='loading'></div>");
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.side-content').html(html)
		})
	}
}

$(function(){
	page.init();
})