/*
* @Author: TomChen
* @Date:   2018-09-04 09:58:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-07 16:32:41
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var _util = require('util');
var _user = require('service/user');
var _side = require('pages/common/side');

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')			
	}
}
//登录页面逻辑
var page = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		_side.render('user-update-password')
	},	
	//绑定事件
	bindEvent:function(){
		var _this = this;

		$('#btn-submit').on('click',function(){
			_this.submit();
		})
		$('input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		//1.获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2.验证数据
		var validateResult =  this.validate(formData);
		//3.提交
		//验证通过
		if(validateResult.status){
			formErr.hide();	
			//发送登录请求	
			_user.updatePassword(formData,function(result){
				window.location.href = "./result.html?type=updatePassword"
			},function(msg){
				formErr.show(msg);
			})
		}
		//验证失败
		else{
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//验证密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//验证密码格式
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式错误';
			return result;
		}
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致';
			return result;			
		}	
		result.status = true;
		return result;

	}
}

$(function(){
	page.init();
})