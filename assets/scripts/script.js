let Messages = [];
let FinalMessege = ""


const UserName = prompt("Digite o seu nome")
const User = {name: UserName};

function UserLogin(){
    const PromisseUserName = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", User)
    PromisseUserName.catch(UserLogin)
}
UserLogin()


setInterval (function StayLogged(){
    const PromisseStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", User)
    PromisseStatus.then(StayLogged)
}, 5000);




const Promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
Promisse.then(ValidResponse)

setInterval (function FetchChat(){

    const Promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    Promisse.then(ValidResponse)
    }, 3000);

function ValidResponse(response){
    Messages = response.data;
    RenderChat();
    
}






function RenderChat(){


    const MessagesList = document.querySelector('.content-container');
    MessagesList.lastElementChild.scrollIntoView();
    MessagesList.innerHTML="";

    for (let i = 0; i < Messages.length; i++){
        let ChosenMessage = Messages[i]

        if (ChosenMessage.type === "status"){
            MessagesList.innerHTML += `            
            <li class="messege-text ${ChosenMessage.type}">
                <span>(${ChosenMessage.time})</span> <strong>${ChosenMessage.from}</strong> ${ChosenMessage.text}
            <li>
            `;
        }
        else if (ChosenMessage.type === "message"){
            MessagesList.innerHTML += `            
            <li class="messege-text ${ChosenMessage.type}">
                <span>(${ChosenMessage.time})</span> <strong>${ChosenMessage.from}</strong> para  <strong>${ChosenMessage.to}</strong> : ${ChosenMessage.text}
            <li>
            `;
        }
        else if(ChosenMessage.type === "private_message"){
                if (ChosenMessage.to == UserName){
            MessagesList.innerHTML += `            
            <li class="messege-text ${ChosenMessage.type}">
                <span>(${ChosenMessage.time})</span> <strong>${ChosenMessage.from}</strong> para  <strong>${ChosenMessage.to}</strong> : ${ChosenMessage.text}
            <li>
            `;
        }
        }
    }
    }
    

function SendMessage(){
    let MessageText = document.querySelector("input").value


    let SentMessage = { 
        from: UserName,
        to: "Todos",
        text: MessageText,
        type: "message"
    }
    const PromisseMessageSent = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",SentMessage)
    document.querySelector("input").value=""
}








