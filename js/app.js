//var url = 'http://qdapi.ltg365.com';
(function($, owner) {
	/* 设置key */
	owner.setApiKey = function(apikey) {
		apikey = apikey || '4c6e71e317e83ace1d7f7ee5ca6b3952';
		localStorage.setItem('$apikey', apikey);
	}
	/**
	 * 获取key
	 */
	owner.getApiKey = function() {
		var stateText = localStorage.getItem('$apikey') || '4c6e71e317e83ace1d7f7ee5ca6b3952';
		return stateText;
	}

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	//获取登录状态
/*	owner.loginStatus = function() {
		mui.ajax(owner.getServerUrl() + '/index.php?s=/ruyi/index/getLoginStatus&apikey=' + owner.getApiKey(), {
			data: {},
			async: false,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				//console.log(data);
				if(data && data != 0) {
					localStorage.setItem("loginstatus", 1);
					return 1;
				} else {
					localStorage.setItem("loginstatus", 0);
					return 0;
				}
			}
		});
	}*/
	
	
	
	  owner.nowTime = function(){
	      var nowDate = new Date();
	      var year = nowDate.getFullYear();
	      var month = nowDate.getMonth()+1;
	      month = month>9 ? month : "0" + month; 
	      var date = nowDate.getDate();
	      date = date>9 ? date : "0" + date;
	      return year+"-"+month+"-"+date;
	  }

	//时间戳转换为日期时间-时分秒
	owner.timestamptotime = function(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y+'-'+m + '-' + d + " " + h + ':' + minute;
	};
	//时间戳转换为日期时间
	owner.tamptotime = function(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y+'-'+m + '-' + d;
	};

	//时间戳转换为-时分秒
	owner.formatDateTime = function(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return h + '-' + minute + '-' + second;
	};

	//日期选择
	owner.getDate = function(obj) {
		//	function getDate(obj) {
		var dDate = new Date();
		console.log("时间：" + dDate);
		//设置当前日期（不设置默认当前日期）
		dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
		var minDate = new Date();
		//最小时间
		minDate.setFullYear(1900, 0, 1);
		var maxDate = new Date();
		//最大时间
		maxDate.setFullYear(3000, 12, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			console.log("时间：" + dDate.getHours() + ":" + dDate.getMinutes());
			document.getElementById(obj).value = d.getFullYear() + "-" + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? '0' : '') + d.getDate();

		}, function(e) {
			mui.toast("您没有选择日期");
		}, {
			title: '请选择日期',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	}
	//请假日期选择
	owner.getDateQingjia = function(obj) {
		//	function getDate(obj) {
		var dDate = new Date();
		var dTime = new Date();
		//设置当前日期（不设置默认当前日期）
		dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
		var minDate = new Date();
		//最小时间
		minDate.setFullYear(1900, 0, 1);
		var maxDate = new Date();
		//最大时间
		maxDate.setFullYear(3000, 12, 31);
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			var objData = d.getFullYear() + "-" + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? '0' : '') + d.getDate();
			owner.pickTimes(obj, objData);
		}, function(e) {
			mui.toast("您没有选择日期");
		}, {
			title: '请选择日期',
			date: dDate,
			minDate: minDate,
			maxDate: maxDate
		});
	}
	
	
	owner.pickTimes = function pickTime(obj, objData) {
		plus.nativeUI.pickTime(function(e) {
			var d = e.date;
//			console.log("选择的时间：" + d.getHours() + ":" + d.getMinutes());
			/*document.getElementById(obj).value = objData + " " + (d.getHours() < 10 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" +(d.getSeconds() < 10 ? '0' : '') + d.getSeconds();*/
			document.getElementById(obj).value = objData + " " + (d.getHours() < 10 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

		}, function(e) {
			console.log("未选择时间：" + e.message);
		});
	}
	
	owner.getTimes = function(obj) {
		plus.nativeUI.pickTime(function(e) {
			var d = e.date;
			document.getElementById(obj).value =(d.getHours() < 10 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

		}, function(e) {
			console.log("未选择时间：" + e.message);
		});
	}

	

	/**
	 * 获取服务器的地址
	 */
	owner.getServerUrl = function() {
		var stateText = localStorage.getItem('$serverUrl') || 'http://jiuheju.xieenguoji.com';
		return stateText;
	};
	/**
	 * 设置服务器的地址
	 * @param {Object} url
	 */
	owner.setServerUrl = function(url) {
		url = url || 'http://jiuheju.xieenguoji.com';
		localStorage.setItem('$serverUrl', url);
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}

	//预加载页面
	/**
	 *
	 * @param {Object} surl   页面地址
	 * @param {Object} id       页面id
	 * @param {Object} loadId   自定义时间名称
	 * @param {Object} dataId  传递参数
	 * @param {Object} showType  页面打开方式
	 */

	owner.sendVlaueNow = function(surl, id, loadId, dataId, showType) {
		var _subWv = plus.webview.getWebviewById(id);
		var page = '';
		if(!_subWv) {
			page = mui.preload({
				url: surl,
				id: id //默认使用当前页面的url作为id
			});
			//触发详情页面的newsId事件
			page.addEventListener('loaded', function() {
				mui.fire(page, loadId, {
					now_id: dataId
				});

				var cView = plus.webview.getWebviewById(id);
				cView.show(showType);

			});
 
		} else {
			page = _subWv;
			mui.fire(page, loadId, {
				now_id: dataId
			});

			var cView = plus.webview.getWebviewById(id);
			cView.show(showType);

		}
	}


}(mui, window.app = {}));


//获取合币
function getPoint(){
	mui.ajax(app.getServerUrl() + '/index.php?s=/api/member/browsePoint&token='+localStorage.getItem('token'),{
		data:{
		},
		dataType:'json',//服务器返回json格式数据
		type:'post',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(data){ 
			console.log("获取合币:"+JSON.stringify(data));
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
			mui.toast(type); 
		} 
	});
} 

//购物车数量
function getCartList() {
	mui.ajax(app.getServerUrl() + '/index.php?s=/api/member/cart&token=' + localStorage.getItem('token'), {
		data: {
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；   
		success: function(data) {
			$(".gw").html(data.num);
		},
		error:function(xhr,type,errorThrown){
			console.log(type);
			mui.toast(type);	
		}
	})
} 


//倒计时秒杀
function countDown(maxtime, fn) {      
	var timer = setInterval(function() {        
		if(maxtime) {            
			var day = Math.floor(maxtime / 86400),
		    hour = Math.floor((maxtime % 86400) / 3600),
		    minutes = Math.floor((maxtime % 3600) / 60),
		    seconds = Math.floor(maxtime % 60);
			//if (hour <= 9) hour = '0' + hour;
            if (minutes <= 9) minutes = '0' + minutes;
            if (seconds <= 9) seconds = '0' + seconds;
				/* msg = "距离结束还有" + day + "天" + hour + "时" + minutes + "分" + seconds + "秒";          
				console.log(msg);*/
			fn(day, hour, minutes, seconds);        
			--maxtime;        
		} else {          
			clearInterval(timer);        
			fn("时间到，结束!");       
		}      
	}, 1000);  
}  
