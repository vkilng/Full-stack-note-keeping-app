function textAreaAdjust(element) {
    element.style.height = "10%";
    element.style.height = (5+element.scrollHeight)+"px";
  }

let elemcount = 0;

function save(txtar) {
  if (txtar.value != '') {
    var elem = document.createElement('div');
    elem.id = '_'+(++elemcount);
    elem.innerHTML = txtar.value + elem.id;
    elem.style.userSelect = 'none';
    elem.style.margin = '20px';
    elem.style.verticalAlign = 'top';
    elem.style.border = 'solid silver';
    elem.style.borderRadius = '10px';
    elem.style.padding = '10px';
    elem.style.zIndex = '1';
    elem.style.display = 'inline-block';
    elem.style.whiteSpace = 'pre-line';
    elem.style.overflow = 'hidden';
    elem.style.textOverflow = 'ellipsis';
    elem.style.minWidth = '1%';elem.style.maxWidth = '20%';
    elem.style.minHeight = '1%';elem.style.maxHeight = txtar.style.height;
    //elem.style.minHeight = txtar.style.height;
    elem.style.fontSize = '1em';
    document.body.appendChild(elem);
  }
}

let txtar = document.getElementById("new");
document.addEventListener('click',function(event){
  if (/\d/.test(event.target.id)) {
    //event.target.contentEditable = 'true';
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = 'block';
    let noteedit = document.getElementById('mdc');
    noteedit.innerText = event.target.innerText;
    noteedit.contentEditable = 'true';
    window.onclick = function(e) {
      if (e.target == modal || e.target == span) {
        event.target.innerText = noteedit.innerText;
        
        modal.style.display = "none";
      }
    }
  }
  else if (event.target != txtar){
    save(txtar);
    txtar.value = '';
    txtar.style.height = '10%';
  }
})
document.addEventListener('keydown',function(e){
  if (e.key == 'Escape') {
    txtar.value = '';
    txtar.style.height = '10%';
    txtar.blur();
  }
})

async function get_user_data() {
  try {
    const response1 = await fetch("http://localhost:5000/getuserdata",{method: 'GET',credentials: "include",})
    return await response1.json();
  } 
  catch (error) {
    console.log(error);
    throw error;
  };
}

async function logout() {
  try {
    const response2 = await fetch("http://localhost:5000/logout",{method: 'GET',credentials: "include",})
    return await response2.json();
  } 
  catch (error) {
    console.log(error);
    throw error;
  };
};

let lgobtn = document.getElementById("lgot");
document.addEventListener('DOMContentLoaded',async function(){
  let userdata = await get_user_data();
  if (String(userdata.logged_in) != "False") {
    document.getElementById('usrnm').innerText=userdata.name;
    setTimeout(async function(){logout();window.location.replace("login.html")},900000);
  } else {
    window.location.replace("login.html");
  }
  lgobtn.addEventListener('click',async function(){
    let lgopt = await logout();
    if (String(lgopt.logged_in) != "False"){
      alert(String(lgopt.message));
    }
    window.location.replace("login.html");
    
  })
})
