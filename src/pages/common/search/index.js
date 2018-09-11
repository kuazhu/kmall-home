/*
* @Author: TomChen
* @Date:   2018-09-04 09:58:36
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-10 09:28:36
*/
require('./index.css')

var _util = require('util');

var page = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		//搜索框关键字回填
		var keyword = _util.getParamFromUrl('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	//绑定事件
	bindEvent:function(){
		var _this = this;

		//点击提交
		$('#btn-search').on('click',function(){
			_this.submit();
		})

		//回车提交
		$('#search-input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val())
		window.location.href = "./list.html?keyword="+keyword;
	}
}

$(function(){
	page.init();
})