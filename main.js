var pubnub = new PubNub({
    subscribeKey: "YOUR-SUB-KEY",
    publishKey: "YOUR-PUB-KEY",
});
function sendMessage(msg){
    pubnub.publish({message: msg, channel: "pubnub_aiy"});
}

pubnub.addListener({
    message: function(m){
        var pub = m.publisher;
        if(pub!=myName){
            addMessageIn({content: m.message, publisher: m.publisher})
        }
    },
});
//sendMessage({switch: "switch2", switchTo: "on"});
var switches = [
    ["Christmas Tree", "switch1"],
    ["Living Room Lamp", "switch2"],
    ["Boy's Christmas Lights", "switch3"],
    ["Boy's Christmas Tree", "switch4"],
    ["Other Switch", "switch5"],
];

function createButton(name, sendName, switchTo){
    var btn = document.createElement("button");
    
    var txt = document.createTextNode(name);
    
    
    btn.addEventListener("click", function(){
        console.log(sendName);
        console.log(switchTo);
        sendMessage({switch: sendName, switchTo: switchTo});
    });
    
    btn.appendChild(txt);
    btn.className = "switch-"+switchTo;
    
    return btn;
}

function addSwitch(name, sendName){
    var ul = document.getElementById("switches");
    
    var li = document.createElement("li");
    li.className = "control";
    
    li.appendChild(createButton("On", sendName.toLowerCase(), "on"));
    li.appendChild(document.createTextNode(name));
    li.appendChild(createButton("Off", sendName.toLowerCase(), "off"));
    
    ul.appendChild(li);
}

function addSwitches(switches){
    for(var i = 0; i < switches.length; i++){
        var switchArr = switches[i];
        var name = switchArr[0];
        var sendName = switchArr[1];
        addSwitch(name, sendName)
    }
}

addSwitches(switches);
