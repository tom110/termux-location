var http = require('http');
var qs = require('querystring');

function Convert84_baidu(loglat_info_json) {

    var loglat=loglat_info_json.longitude+","+loglat_info_json.latitude;
    console.log(loglat);

    this.data = {
        // coords: "117.05391347408295,36.61189019680023",
        coords: loglat,
        from: 1,
        to: 5,
        ak: "0896a07cab9ee884b5747ed1a897d2d5"};//这是需要提交的数据

    this.get_baidu=function (callback) {
        var content = qs.stringify(this.data);

        var options = {
            hostname: 'api.map.baidu.com',
            path: '/geoconv/v1/?' + content,
            method: 'GET'
        };

        var req = http.request(options, function(res) {
            // console.log('STATUS: ' + res.statusCode);
            // console.log('HEADERS: ' + JSON.stringify(res.headers));
            let d="";

            res.setEncoding('utf8');

            res.on('data', function(chunk){
               d+=chunk;
               // console.log(chunk);
            });

            res.on("end",function(){
                var d_json=JSON.parse(d);
                loglat_info_json.longitude=d_json.result[0].x;
                loglat_info_json.latitude=d_json.result[0].y;
                callback(loglat_info_json);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }
}

module.exports = Convert84_baidu;
