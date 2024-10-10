let audio1 = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
  );
  function chatOpen() {
    document.getElementById("chat-open").style.display = "none";
    document.getElementById("chat-close").style.display = "block";
    document.getElementById("chat-window1").style.display = "block";
  
    audio1.load();
    audio1.play();
  }
  function chatClose() {
    document.getElementById("chat-open").style.display = "block";
    document.getElementById("chat-close").style.display = "none";
    document.getElementById("chat-window1").style.display = "none";
    document.getElementById("chat-window2").style.display = "none";
  
    audio1.load();
    audio1.play();
  }
  function openConversation() {
    document.getElementById("chat-window2").style.display = "block";
    document.getElementById("chat-window1").style.display = "none";
  
    audio1.load();
    audio1.play();
  }
  
  //Gets the text from the input box(user)
  function userResponse() {
    console.log("response");
    let userText = document.getElementById("textInput").value;
  
    if (userText == "") {
      alert("Please type something!");
    } else {
      document.getElementById("messageBox").innerHTML += `<div class="first-chat">
        <p>${userText}</p>
        <div class="arrow"></div>
      </div>`;
      let audio3 = new Audio(
        "https://prodigits.co.uk/content/ringtones/tone/2020/alert/preview/4331e9c25345461.mp3"
      );
      audio3.load();
      audio3.play();
  
      document.getElementById("textInput").value = "";
      var objDiv = document.getElementById("messageBox");
      objDiv.scrollTop = objDiv.scrollHeight;
  
      setTimeout(() => {
        adminResponse(userText);
      }, 1000);
    }
  }
  
  //admin Respononse to user's message
  function adminResponse(userText) {
    
  
    const apiKey = "YOUR_API_KEY";
    const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions"; // Adjust the endpoint based on your API provider and engine.

    const question = userText + " give answer in 20-30 words"; // Replace with your question.

    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        prompt: question,
        max_tokens: 50, // Adjust this to limit the response length.
    }),
    };

    fetch(endpoint, requestOptions)
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const adviceData = data.choices[0].text;
        console.log(adviceData);
        document.getElementById(
          "messageBox"
        ).innerHTML += `<div class="second-chat">
            <div class="circle" id="circle-mar"></div>
            <p>${adviceData}</p>
            <div class="arrow"></div>
          </div>`;
        let audio3 = new Audio(
          "https://downloadwap.com/content2/mp3-ringtones/tone/2020/alert/preview/56de9c2d5169679.mp3"
        );
        audio3.load();
        audio3.play();
  
        var objDiv = document.getElementById("messageBox");
        objDiv.scrollTop = objDiv.scrollHeight;
    })
    .catch((error) => {
        console.error("Error:", error);
        // Handle errors here.
    });

  }
  
  //press enter on keyboard and send message
  addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      
      const e = document.getElementById("textInput");
      if (e === document.activeElement) {
        userResponse();
      }
    }
  });