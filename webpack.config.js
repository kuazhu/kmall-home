/*
* @Author: TomChen
* @Date:   2018-08-16 09:57:02
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-04 11:25:40
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";

//生成HtmlWebpackPlugin 配置
const getHtmlConfig = (name)=>({
    template:'./src/view/'+name+'.html',
    filename:name+'.html',
    inject:true,
    hash:true,
    chunks:['common',name]
})

//导出配置
module.exports = {
	//模式
    mode:'development',
	// mode:'production',
	//指定多入口文件
	entry:{
        'common':'./src/pages/common/index.js',
        'index':'./src/pages/index/index.js',
        'user-login':'./src/pages/user-login/index.js'
    },
    //配置额外模块
    externals:{
        'jquery':'window.jQuery'
    },      	
	//指定多出口
	output:{
		//出口文件名称
		filename:'js/[name].js',
        publicPath: publicPath,
		//出口文件存储路径
		path:path.resolve(__dirname,'dist')
	},
    //配置别名
    resolve:{
        alias:{
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            api:path.resolve(__dirname,'./src/api'),
            common:path.resolve(__dirname,'./src/common')
        }
    },
	//配置loader
    module: {
        rules: [
            //处理css文档的loader
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    }
                  },
                  "css-loader"
                ]
            },
              //处理图片loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader'
                  }
                ]
            },
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015','stage-3'],               
                    }
                }               
            }              
        ]
  },
  plugins: [
  	new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login')),    
  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
        filename:'css/[name].css'
    })
  ],
  devServer: {
    contentBase: './dist',
    port:3002,
    historyApiFallback:true
  }
}