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
    

    
$(document).ready(() => {
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

$(document).ready(() => {  // This is for the user steps.
    const userStepsTextbox = $("#userStepsTextbox");
    const storedSteps = localStorage.getItem("user_steps");
    userStepsTextbox.on('change', () => {
        localStorage.setItem("user_steps", userStepsTextbox.val());
    });
    if (storedSteps) {
        userStepsTextbox.val(storedSteps);
    }
});

$(document).ready(() => { // This is for the CFG Scale
    const userCFGScale = $("#userCFGscaleTextbox");
    const storedScale = localStorage.getItem("user_scale");
    userCFGScale.on('change', () => {
        localStorage.setItem("user_scale", userCFGScale.val());
    });
    if (storedScale) {
        userCFGScale.val(storedScale);
    }
});

$(document).ready(() => { // This is for the user width
    const userWidth = $("#userWidthTextbox");
    const storedWidth = localStorage.getItem("user_width");
    userWidth.on('change', () => {
        localStorage.setItem("user_width", userWidth.val());
    });
    if (storedWidth) {
        userWidth.val(storedWidth);
    }
});

$(document).ready(() => { // This is for the user height
    const userHeight = $("#userHeightTextbox");
    const storedHeight = localStorage.getItem("user_height");
    userHeight.on('change', () => {
        localStorage.setItem("user_height", userHeight.val());
    });
    if (storedHeight) {
        userHeight.val(storedHeight);
    }
});

$(document).ready(() => { // This is for the denoise strength
    const userDenoise = $("#userDenoiseTextbox");
    const storedDenoise = localStorage.getItem("user_denoise");
    userDenoise.on('change', () => {
        localStorage.setItem("user_denoise", userDenoise.val());
    });
    if (storedDenoise) {
        userDenoise.val(storedDenoise);
    }
});