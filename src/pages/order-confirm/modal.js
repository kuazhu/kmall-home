/*
* @Author: TomChen
* @Date:   2018-09-04 09:55:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-14 09:37:06
*/

var _util = require('util');
var _cities = require('util/cities')

var _shipping = require('service/shipping');

var modalTpl = require('./modal.tpl');

var _modal = {
	
	show:function(){
		this.$box = $('.modal-box');
		this.lodaModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//关闭弹窗
		this.$box.find('.close').on('click',function(){
			_this.hide();
		})

		//省份和城市的联动
		var $provinceSelect = this.$box.find('.province-select');
		$provinceSelect.on('change',function(){
			_this.loadCities($provinceSelect.val())
		});
	},
	lodaModal:function(){
		var html = _util.render(modalTpl);
		this.$box.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		var provincesSelectOptions = this.getSelectOptions(provinces);
		this.$box.find('.province-select').html(provincesSelectOptions);
	},
	loadCities:function(provinceName){
		var cities = _cities.getCities(provinceName);
		console.log(cities)
		var citiesSelectOptions = this.getSelectOptions(cities);
		this.$box.find('.city-select').html(citiesSelectOptions);
	},
	getSelectOptions:function(arr){
		let html = '<option value="">请选择</option>';
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		return html;
	},
	hide:function(){
		this.$box.empty();
	}
}

module.exports = _modal;