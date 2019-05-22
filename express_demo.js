var express=require('express');
var app=express();
var exec=require('child_process').execSync;
var Convert84_baidu=require('./convert');


app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
})

app.get('/location',function(req,res){
	var str=exec("termux-location");
	//var jsonObject=JSON.parse(str.toString("utf8").trim());
	var convert=new Convert84_baidu(JSON.parse(str.toString("utf8").trim()));
	convert.get_baidu(function(data){
		res.send(data);
	});
	
})

var server=app.listen(8081,function(){
	var host=server.address().address
	var port=server.address().port

	console.log("应用实例，访问地址为 http://%s:%s",host,port)
})
