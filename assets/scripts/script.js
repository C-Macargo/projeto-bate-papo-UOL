let UserName = {name: ""};
let Messeges = [];



setInterval (function FetchChat(){
    
    const Promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    Promisse.then(ValidResponse)
    RenderChat();
    }, 3000);

function ValidResponse(response){
    Messeges = response.data;
}



function RenderChat(){
    const MessegesList = document.querySelector('.content-container');
    MessegesList.innerHTML="";
    for (let i = 0; i < Messeges.length; i++){
        let ChosenMessege = Messeges[i]
        MessegesList.innerHTML += `            
        <li class="messege-text ${ChosenMessege.type}">
        <span>(${ChosenMessege.time})</span> ${ChosenMessege.from} para  ${ChosenMessege.to} : ${ChosenMessege.text}
        <li>
        
    `;
    }
}

function UserLogin(){
    UserName = prompt("Digite o seu nome")
    
}


