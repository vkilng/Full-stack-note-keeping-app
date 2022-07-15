// Converting form object to json and Sending the JSON data to the server
async function sendDatalo(FD){
    let url="http://localhost:5000/login";
    try {
        const response = await fetch(url,{
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            credentials: "include",
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


async function handleSignIn(event){
    event.preventDefault();

    const form=event.currentTarget;
    try {
        const formdata = new FormData(form);
        const respdata = await sendDatalo(formdata);
        console.log(respdata);
        return respdata;
    }
    catch (error) {
        console.log(error);
        throw error;
    };
};

async function renderlo(e){
    let dat = await handleSignIn(e);
    if (String(dat.Success) == "done") {
        alert("Fetching your details and data !");
        window.location.replace('progressbar.html');
    } else if(String(dat.Exists) == "exists") {
        alert("You already have a session alloted !")
        window.location.replace('progressbar.html');
    } 
    else {
        alert(String(dat.Error));
        window.location.replace('login.html');
    }
};

const myformsi = document.getElementById("signin");
document.addEventListener('DOMContentLoaded',async function(){
    myformsi.addEventListener('submit',async function(e){
        e.preventDefault();
        alert("Remember! Your session will time out after 15 minutues!");
        renderlo(e);
    });
    
});

