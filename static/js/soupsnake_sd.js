$(document).ready(() => {
    var ip = localStorage.getItem("sd_ip") || $("#sdip-textbox").attr("placeholder");
    setInterval(() => {
        ip = localStorage.getItem("sd_ip") || $("#sdip-textbox").attr("placeholder");
        fetch(ip, {method: "GET"}).then((res) => {
            $(".sd-status-checker").css("background-color", "#A3BE8C");
        }).catch((error) => {
            $(".sd-status-checker").css("background-color", "#BF616A");
        });
    }, 10000);
});
    

    
$(document).ready(() => { // Did it like this because it works :thumbsup:
    const sdipTextbox = $("#sdip-textbox");
    const storedIP = localStorage.getItem("sd_ip");

    sdipTextbox.on('change', () => {
        localStorage.setItem("sd_ip", sdipTextbox.val());
    });

    if (storedIP) {
        sdipTextbox.val(storedIP);
    } else {
        sdipTextbox.val(sdipTextbox.attr("placeholder"));
    }
});

$(document).ready(() => {
    if (!localStorage.getItem("sd_ip")) {
        localStorage.setItem("sd_ip", "http://127.0.0.1:7860");
    }
});

// $(document).ready(() => {  // Uncomment when the user_steps textbox is added to the page
//     const userStepsTextbox = $("#userStep-textbox");
//     const storedSteps = localStorage.getItem("user_steps");
//     userStepsTextbox.on('change', () => {
//         localStorage.setItem("user_steps", userStepsTextbox.val());
//     });
//     if (storedSteps) {
//         userStepsTextbox.val(storedSteps);
//     }
// });