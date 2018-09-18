/*
* @Author: TomChen
* @Date:   2018-09-04 17:16:17
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-14 10:34:39
*/
var Hogan = require('hogan.js');
var _util = {
	request:function(params){
		var _this = this;
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType || 'json',
			data:params.data || '',
			success:function(result){
				//请求成功
				if(result.code == 0){
					params.success && params.success(result.data)
				}
				//没有登录
				else if(result.code == 10){
					_this.doLogin();
				}
				//请求数据错误
				else if(result.code == 1){
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg);
	},
	showSuccessMsg:function(msg){
		alert(msg);
	},
	confirm:function(msg){
		return window.confirm(msg);
	},
	doLogin:function(){
		window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;

	},
	//模板渲染
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data);
		return html;
	},
	validate:function(value,type){
		var value = $.trim(value);
		//非空验证
		if(type === 'require'){
			return !!value;
		}
		//用户名格式验证
		if(type === 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//密码格式验证
		if(type === 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机号格式验证
		if(type === 'phone'){
			return /^1[3568]\d{9}$/.test(value)
		}
		//邮箱地址的验证
		if(type === 'email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}		
	}

}

module.exports = _util;