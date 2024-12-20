var url = $("#ip").val() == "" ? $("#ip").attr("placeholder") : $("#ip").val();

var partialText = "";
var bufferedResponse = "";

function messageAction() {
  // This is the main function that sends the message to the backend and displays the response in the chat window.
  url = $("#ip").val() == "" ? $("#ip").attr("placeholder") : $("#ip").val();
  let prompt = $("#message").val();
  $("#chat").append(
    '<div class="chat-message"><div class="chat-bubble-user">' +
      prompt +
      "</div></div>",
  );
  if (prompt[0] == "/") {
    handleCommand(prompt);
    return;
  }
  $(".chat-message")
    .last()[0]
    .scrollIntoView({ behavior: "smooth", block: "center" });
  fetch(url + "/api/generate", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      prompt: prompt,
      model: $("#model :selected").text(),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.body;
      }
    })
    .then((body) => {
      $("#chat").append(
        '<div class="chat-message"><div class="chat-bubble"></div></div>',
      );
      converter = new showdown.Converter();
      const reader = body.getReader();
      let decoder = new TextDecoder();

      function processChunk(chunk) {
        partialText += decoder.decode(chunk, { stream: true });
        let jsonObjects = partialText.split("\n");
        partialText = jsonObjects.pop(); // Save the incomplete JSON object for the next chunk
        console.log(partialText);
        jsonObjects.forEach((jsonObject) => {
          try {
            let data = JSON.parse(jsonObject);
            if (data.done) {
              bufferedResponse = "";
              return;
            }

            bufferedResponse += data.response;
            $(".chat-bubble").last().html(converter.makeHtml(bufferedResponse));
            $(".chat-message")
              .last()
              .children()
              .last()[0]
              .scrollIntoView({ behavior: "smooth", block: "end" });
          } catch (error) {}
        });
      }

      function readStream() {
        return reader.read().then((result) => {
          if (result.done) {
            // Process the remaining text

            processChunk(new Uint8Array());
            return;
          }
          processChunk(result.value);
          return readStream();
        });
      }

      readStream().then(() => {
        $("#message").val("");
      });

      $("#message").val("");
    });
}
$("#submit").on("click", messageAction);

$("#message").on("keypress", (e) => {
  if (e.which == 13) {
    messageAction();
  }
});

$(document).ready(() => {
  // This handles the Ctrl+Shift+H key combination for the help page.
  $(document).on("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "H") {
      $(".modal-content").load("help"); 
      $(".modal").css("display", "flex");
    }
  });
  const storedIP = localStorage.getItem("ip");
  if (storedIP) {
    $("#ip").val(storedIP);
  } else {
    $("#ip").val($("#ip").attr("placeholder"));
  }
  url = $("#ip").val() == "" ? $("#ip").attr("placeholder") : $("#ip").val();

  fetch(url + "/api/tags") // This handles the dropdown with the model names.
    .then((res) => res.json())
    .then((data) => {
      const modelNames = data.models.map((model) => model.name);
      modelNames.forEach((modelName) => {
        const option = document.createElement("option");
        option.text = modelName;
        option.value = modelName;
        $("#model").append(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching model names:", error);
    });
});

$("#ip").on("change", () => {
  // This handles saving the IP address in the local storage.
  localStorage.setItem("ip", $("#ip").val());
});

$(document).ready(() => {
  // This just sets the default IP address if it's not already set in the local storage.
  if (!localStorage.getItem("ip")) {
      localStorage.setItem("ip", "http://127.0.0.1:11434");
  }
});