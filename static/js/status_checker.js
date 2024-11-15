$(document).ready(() => {
var ip = $("#ip").val() == "" ? $("#ip").attr("placeholder"): $("#ip").val(); 
    setInterval(() => {
        ip = $("#ip").val() == "" ? $("#ip").attr("placeholder"): $("#ip").val(); 
        fetch(ip, {method: "HEAD"}).then((res) => {
            $(".status-checker").css("background-color", "#A3BE8C");
        }).catch((error) => {
            $(".status-checker").css("background-color", "#BF616A");
        })
    }, 10000);
});