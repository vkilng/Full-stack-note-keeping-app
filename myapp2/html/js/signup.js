async function sendData(FD){
    let url="http://localhost:5000/signup";
    try {
        const response = await fetch(url,{
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            //mode: 'no-cors',
            body: FD,
        })
        return await response.json();
    } 
    catch (error) {
        console.log(error);
        throw error;
    };
};


async function handleSignUpForm(event){
    event.preventDefault();

    const form=event.currentTarget;
    try {
        const formdata = new FormData(form);
        const respdata = await sendData(formdata);
        console.log(respdata);
        return respdata;
    }
    catch (error) {
        console.log(error);
        throw error;
    };

};

async function render(e){
    let dat = await handleSignUpForm(e);
    if (String(dat.message) == "done") {
        alert('Congratulations, You\'re account has been created !');
    } else {
        alert(String(dat.Error));
    }
    window.location.replace('login.html');
};

let myform = document.getElementById("takeinput");
myform.addEventListener('submit',function(ev){
    render(ev);
});

let sulnk = document.getElementById('su');
sulnk.addEventListener('click',function(){
    var modal = document.getElementById("myModal");
    var form = document.getElementById("form");
    modal.style.display = 'block';
    form.style.display = 'block';
    window.onclick = function(e) {
        if (e.target == modal) {
          modal.style.display = form.style.display = "none";
        }
    }
});

var check = function() {
    let psw = document.getElementById('supsw');
    let cnf_psw = document.getElementById('confirm_supsw');
    if (psw.value == cnf_psw.value) {
        document.getElementById('chck').style.color = 'green';
        document.getElementById('chck').innerHTML = '(Passwords match)';
    } else {
        document.getElementById('chck').style.color = 'red';
        document.getElementById('chck').innerHTML = 'Passwords don\'t match !!!';
    }
    
}