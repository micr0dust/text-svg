const oSVG = require('text-svg');
const clientIp = require('client-ip');
const http = require('http');
const geoip = require('geoip-lite');
const countries = require("@ntpu/i18n-iso-countries");
const cFontPathAndName = __dirname + "/fonts/NotoSansCJKtc-Regular.otf";
let oOptions;


var server = http.createServer(function(req, res) {
    var ip = clientIp(req);
    let txt = "";
    let url = req.url;
    if (url.indexOf('/white') + 1) {
        url = url.replace("/white", "");
        oOptions = {
            localFontPath: cFontPathAndName,
            color: 'white',
        };
    } else {
        oOptions = {
            localFontPath: cFontPathAndName
        };
    }


    if (url.indexOf('custom') + 1) {
        if (url.split('?')[0] === '/custom/ip.png' || url === '/ip.png') {
            let data = url.split('?')[1] || "";
            let txt1 = decodeURI(data.split('&')[0]) || "";
            let txt2 = decodeURI(data.split('&')[1]) || "";
            let svg = oSVG(txt1 + ip + txt2, oOptions)
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        } else if (url.split('?')[0] === '/custom/location.png' || url === '/location.png') {
            let data = url.split('?')[1] || "";
            let txt1 = decodeURI(data.split('&')[0]) || "";
            let txt2 = decodeURI(data.split('&')[1]) || "";
            let lang = decodeURI(data.split('&')[2]) || "";
            if (!lang) lang = "tw";
            let geo = geoip.lookup(ip);
            if (geo) {
                txt = geo.city;
                txt = cityFn(txt, countries.getName(geo.country, lang));
            }
            let svg = oSVG(txt1 + txt + txt2, oOptions);
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        } else if (url.split('?')[0] === '/custom/text.png' || url === '/text.png') {
            txt = decodeURI(url.split('?')[1] || "");
            let svg = oSVG(txt, oOptions)
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        } else {
            let geo = geoip.lookup(ip);
            let svg = oSVG("", oOptions);
            if (geo) svg = oSVG(countries.getName(geo.country, "tw"), oOptions);
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        }
    } else {
        if (url === '/location.png') {
            let geo = geoip.lookup(ip);
            if (geo) {
                txt = geo.city;
                txt = cityFn(txt, countries.getName(geo.country, "tw"));
            }
            let svg = oSVG("????????????" + txt + "???", oOptions);
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        } else if (url === '/ip.png') {
            let svg = oSVG("???????????? " + ip + " ?????????????????????????????????", oOptions)
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        } else {
            let geo = geoip.lookup(ip);
            let svg = oSVG("", oOptions);
            if (geo) svg = oSVG(countries.getName(geo.country, "tw"), oOptions);
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(svg);
        }
    }



    function cityFn(city, country) {
        if (city.indexOf("Keelung") + 1) return "??????";
        if (city.indexOf("New Taipei") + 1) return "??????";
        if (city.indexOf("Taipei") + 1) return "??????";
        if (city.indexOf("Taoyuan") + 1) return "??????";
        if (city.indexOf("Hsinchu") + 1) return "??????";
        if (city.indexOf("Miaoli") + 1) return "??????";
        if (city.indexOf("Taichung") + 1) return "??????";
        if (city.indexOf("Changhua") + 1) return "??????";
        if (city.indexOf("Nantou") + 1) return "??????";
        if (city.indexOf("Yunlin") + 1) return "??????";
        if (city.indexOf("Chiayi") + 1) return "??????";
        if (city.indexOf("Tainan") + 1) return "??????";
        if (city.indexOf("Kaohsiung") + 1) return "??????";
        if (city.indexOf("Pingtung") + 1) return "??????";
        if (city.indexOf("Yilan") + 1) return "??????";
        if (city.indexOf("Hualien") + 1) return "??????";
        if (city.indexOf("Taitung") + 1) return "??????";
        if (city.indexOf("Penghu") + 1) return "??????";
        if (city.indexOf("Green") + 1) return "??????";
        if (city.indexOf("Orchid") + 1) return "??????";
        if (city.indexOf("Kinmen") + 1) return "??????";
        if (city.indexOf("Matsu") + 1) return "??????";
        if (city.indexOf("Lienchiang") + 1) return "?????????";
        return country;
    }
});

server.listen(process.env.PORT || 3000, '0.0.0.0');