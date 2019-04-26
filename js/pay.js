		var	wxChannel = null, // 微信支付
			wxServer = 'index.php?s=/api/pay/wchatPay',
			wxServer1 = 'index.php?s=/api/pay/wchatPay',  //代理升级
			aliChannel = null,
			aliServer = null; // 支付;

		function getPayChanel() {
			//设备信息加载完成，先获取微信的支付通道
			plus.payment.getChannels(function(channels) {
				for(var i in channels) {
					if(channels[i].id === 'wxpay') {
						wxChannel = channels[i];
						console.log(JSON.stringify(wxChannel));
					} else {
						aliChannel = channels[i];
					}
				}
			}, function(e) {
				mui.alert("获取支付通道失败：" + e.message, '警告');
			});
		}

		function payClick(url, pay_type, order_trade_no,type) {
			//支付按钮点击事件
			//var $state = app.getState();
			var payChanel = null,
				payServer = '';
			//获取选中的值
			var payType = pay_type;

			var payTypeInfo;
			//console.log(order_trade_no);
			//货到付款
			//	微信支付
			if(payType == 1) {
				/*mui.alert("此功能尚未开通！");
				return false;*/

				payChanel = wxChannel;
//				console.log(wxChannel);
//				payServer = url + wxServer + '&id=' + order_trade_no;
console.log("type:"+type);
				if(type==1){
					payServer = url + wxServer1;
				}else{
					payServer = url + wxServer;
				}

				payTypeInfo = 'weixin';
			} else if(payType == 2) { //支付宝支付
				payChanel = aliChannel;
				payServer = url + aliServer;
				payTypeInfo = 'alipay';
			}
			plus.nativeUI.showWaiting('正在支付...');
			// 连接服务器，获取订单信息
			console.log(payServer);
			console.log(payType);
			mui.ajax(payServer, {
				data: {
					no:order_trade_no
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(response) {
					console.log(JSON.stringify(response));
					var result = null;
					result = response;
					if(!result.prepayid && pay_type == 1) {
						mui.alert("订单超时，订单信息获取失败");
						plus.nativeUI.closeWaiting();
						return false;
					}else if(pay_type == 2 && !result.form){
						mui.alert("订单超时，订单信息获取失败");
						plus.nativeUI.closeWaiting();
						return false; 
					}
					if(pay_type == 2){
						result = result.form;
					}

					//mui.alert(JSON.stringify(result));
					plus.payment.request(payChanel, result, function(result) {

						//mui.alert(JSON.stringify(result));
						//支付成功
						mui.openWindow({
							id: 'pay_success',
							url: 'pay_success.html',
							waiting: {
								autoShow: true, //自动显示等待框，默认为true
								title: '正在加载...' //等待对话框上显示的提示内容
							}
						});	
						plus.nativeUI.closeWaiting();
					}, function(e) {
						plus.nativeUI.closeWaiting();

						//updateStatus(orderId);
						if(e.code === -100) {
							mui.alert('支付取消');
						} else {
							mui.alert("支付失败");
						}
					});
				},
				error: function(xhr, type, errorThrown) {
					plus.nativeUI.closeWaiting();
					console.log(type); 
				}
			});
		}
		
	