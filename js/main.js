// variables
const signupform = document.getElementsByClassName("form")[0];
const loginfrom = document.getElementsByClassName("form")[1];
const music = new Audio("../assets/audio/music.mp3");
const tick = new Audio("../assets/audio/tick.mp3");
const win = new Audio("../assets/audio/win.mp3");
const loos = new Audio("../assets/audio/loos.mp3");
let turn = "X";
let gameArray = new Array(9).fill("");
const warnDiv = document.getElementById("warn");
const warnMsg = document.getElementById("message")
const successmsg = document.getElementById("successmsg");
const successDiv = document.getElementById("successDiv")


function warn(msg){
warnMsg.innerText = msg;
warnDiv.classList.remove("go-to-right")
setTimeout(() => {
    warnDiv.classList.add("go-to-right")
}, 4000);
}
function success(msg){
    successmsg.innerText = msg;
    successDiv.classList.remove("go-to-right")
setTimeout(() => {
    successDiv.classList.add("go-to-right")
}, 4000);
}

// let Allboxses = document.getElementsByClassName("box")

function changeTrun() {
  turn == "X" ? (turn = "O") : (turn = "X");
}

function showSignUP() {
  signupform.classList.add("go-to-left");
  setTimeout(() => {
    loginfrom.classList.remove("go-to-left");
  }, 500);
}
function showlogin() {
  loginfrom.classList.add("go-to-left");
  setTimeout(() => {
    signupform.classList.remove("go-to-left");
  }, 500);
}

function login() {
  let oldArray = localStorage.getItem("users");
  let name = document.getElementById("Loginname").value;
  let pass = document.getElementById("LogiPass").value;
  if (oldArray == null) {
    warn("there no such user exits with this name");
    return;
  }else{
    oldArray = JSON.parse(oldArray)
   

  let FindUSer = oldArray.filter((e) => {
    return e.name.toLowerCase().trim() === name.toLowerCase().trim();
  });
  
  if (FindUSer.length == 0) {
    warn("no such user exits with this name");
    return;
  }

  if (pass !== FindUSer[0].pass) {
    
    warn("password dose not match");
    return;
  }

  signupform.classList.add("go-to-left");
  loginfrom.classList.add("go-to-left");
  success(`welcome ${name}`)
//    showborad(name);
} 
}
function signup() {
  let name = document.getElementById("name").value;
  let pass = document.getElementById("pass").value;
  let Cpass = document.getElementById("Cpass").value;




  let oldArray = localStorage.getItem("users");

  if (oldArray != null) {
    oldArray = JSON.parse(oldArray);
    let allreadyExits = oldArray.filter((object) => {
      return object.name.trim().toLowerCase() === name.trim().toLowerCase();
    });
    
    if (allreadyExits.length > 0) {
      warn("user allredy exits with this name ");
      return;
    }
  }

  if (Cpass !== pass) {
    warn("password and confrim password dose not match");
    return;
  }
  if (pass.length < 8) {
    warn("please use atleast 8 chrachter in password");
    return;
  }
  if (name.length < 3) {
    warn("please use atleast 3 chrachter in name");
    return;
  }
  

  if (oldArray == null) {
    oldArray = [];
    oldArray.push({
      name: name.trim(),
      Score: 0,
      pass: pass,
    });
  } else {
    oldArray.push({
      name: name.trim(),
      Score: 0,
      pass: pass.trim(),
    });
  }

  localStorage.setItem("users",JSON.stringify(oldArray));
  showSignUP();
  success("your account has been created you can now login")
}
