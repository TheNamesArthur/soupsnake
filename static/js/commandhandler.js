function clearInput() {
    $("#message").val("");
    $("#chat").empty();
}

function handleGeneration() {
    var url = localStorage.getItem("sd_ip") || ($("#sdip-textbox").val() == "" ? $("#sdip-textbox").attr("placeholder") : $("#sdip-textbox").val());
    var generationPrompt = $("#message").val().replace("/generate ", "");
    var payload = { // TODO: Allow for more customization of the generation process. 
        "prompt": generationPrompt, 
        "steps": 20,
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
    switch (prompt.split(' ')[0].slice(1)) {
        default:
            clearInput();
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble">I'm Sorry. I don't understand that command.</div></div>`);
            break;
        case "echo":    
            clearInput();
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble">${prompt}</div></div>`);
            break;
        case "ping":
            clearInput();
            $("#chat").append("<div class=\"chat-message\"><div class=\"chat-bubble\">Pong! 🏓</div></div>");
            break;
        case "help":
            clearInput();
            $(".modal-content").load("help"); 
            $(".modal").css("display", "flex");
            break;
        case "commands" || "command": 
            clearInput();
            $("#chat").append(`<div class="chat-message"><div class="chat-bubble"<br>Commands:<br> echo,<br> ping,<br> help,<br> commands,<br> clear,<br> sd, <br> generate, <br> about.</div></div>`);
            break;
        case "clear":
            clearInput();
            break;
        case "sd":
            clearInput();
            $(".modal-content").load("stablediffusion"); 
            $(".modal").css("display", "flex");
            break;
        case "generate":
            handleGeneration();
            $("#message").val("");
    }
}