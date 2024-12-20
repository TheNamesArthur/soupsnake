function clearInput() {
    $("#message").val("");
    $("#chat").empty();
}

function handleGeneration() {
        // Grabs the user's IP from the input field, or the placeholder if the input field is empty.
    var url = localStorage.getItem("sd_ip") || ($("#sdip-textbox").val() == "" ? $("#sdip-textbox").attr("placeholder") : $("#sdip-textbox").val());
        // Grabs the user's generation prompt from the input field.
    var generationPrompt = $("#message").val().replace("/generate ", "");
        // Grabs the user's steps and scale from the input fields, or the placeholder if the input field is empty.
    var userSteps = localStorage.getItem("user_steps") || ($("#user-steps").val() == "" ? $("#user-steps").attr("placeholder") : $("#user-steps").val());
    var userScale = localStorage.getItem("user_scale") || ($("#user-scale").val() == "" ? $("#user-scale").attr("placeholder") : $("#user-scale").val()); 
        // Grabs the user's height and width from the input fields, or the placeholder if the input field is empty.
    var userHeight = localStorage.getItem("user_height") || ($("#user-height").val() == "" ? $("#user-height").attr("placeholder") : $("#user-height").val());
    var userWidth = localStorage.getItem("user_width") || ($("#user-width").val() == "" ? $("#user-width").attr("placeholder") : $("#user-width").val());
        // Grabs the user's denoise from the input fields, or the placeholder if the input field is empty.
    var userDenoise = localStorage.getItem("user_denoise") || ($("#user-denoise").val() == "" ? $("#user-denoise").attr("placeholder") : $("#user-denoise").val());
        // The payload that will be sent to the server.
    var payload = {
        "prompt": generationPrompt, 
        "steps": userSteps,
        "cfg_scale": userScale,
        "height": userHeight,
        "width": userWidth,
        "denoising_strength": userDenoise,
    };


    fetch(url + "/sdapi/v1/txt2img", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(payload) }).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((data) => {
        $("#chat").append(`<div class="chat-message"><div class="chat-bubble"><img src="data:image/png;base64,${data["images"][0]}"></div></div>`); // Append the decoded images
    });
}

function handleCommand(prompt) {
    const command = prompt.split(' ')[0].slice(1);
    clearInput();

    switch (command) {
        case "echo":
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble">${prompt}</div></div>`);
            break;
        case "ping":
            $("#chat").append("<div class=\"chat-message\"><div class=\"chat-bubble\">Pong! 🏓</div></div>");
            break;
        case "help":
            $(".modal-content").load("help"); 
            $(".modal").css("display", "flex");
            break;
        case "commands":
        case "command":
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble"><br>Commands: [This will be improved in a future update] <br> echo,<br> ping,<br> help,<br> commands,<br> clear,<br> sd,<br> genoptions,<br> generate,<br> about.</div></div>`);
            break;
        case "clear":
            break;
        case "sd":
            $(".modal-content").load("stablediffusion"); 
            $(".modal").css("display", "flex");
            break;
        case "genoptions":
            $(".modal-content").load("genoptions");
            $(".modal").css("display", "flex");
            break;
        case "generate":
            handleGeneration();
            $("#message").val("");
            break;
        default:
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble">I'm Sorry. I don't understand that command.</div></div>`);
    }
}
