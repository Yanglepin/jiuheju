var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度
function sendMessage() {

	curCount = count;
	var dealType; //验证方式
	/*if($("#phone").attr("checked") == true) {
		dealType = "phone";
	} else {
		dealType = "email";
	}
	//产生验证码
	for(var i = 0; i < codeLength; i++) {
		code += parseInt(Math.random() * 9).toString();
	}*/
	//设置button效果，开始计时

	$("#btnSendCode").attr("onclick", "");
	$("#btnSendCode").text(+curCount + "S");
	$('#seed_code').val(0);
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	//向后台发送处理数据
}
//timer处理函数
function SetRemainTime() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器
		$("#btnSendCode").attr("onclick", sendMessage()); //启用按钮
		$("#btnSendCode").text("获取");
		$('#seed_code').val(1);
	} else {
		curCount--;
		$("#btnSendCode").text(+curCount + "S");
	}
}