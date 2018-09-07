/*
* @Author: TomChen
* @Date:   2018-09-04 16:04:25
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-07 15:23:38
*/
require('./index.css');
var _user = require('service/user')
var _util = require('util');

var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		this.loadeCartInfo();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrorMsg(message)
			});
		});
	},
	loadUsername:function(){
		_user.getUsername(function(user){
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(user.username)
		})
	},
	loadeCartInfo:function(){

	}
}

module.exports = nav.init();