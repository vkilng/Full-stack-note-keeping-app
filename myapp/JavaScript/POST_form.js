// Converting form object to json and Sending the JSON data to the server
async function sendData(FD){
    const plainFormData = Object.fromEntries(FD.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    let url="http://localhost:5000/tkinpt";
    try {
        const response = await fetch(url,{
            method: 'POST',
            'Content-Type': 'application/json',
            //mode: 'no-cors',
            body: formDataJsonString,
        }).then(alert('Post Created !'));
        return await response.json();
    } 
    catch (error) {
        console.log(error);
        throw error;
    };
};


async function handleForm(event){
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
    let dat = await handleForm(e);
    disp=dat.metadata;
    
    var myJSON1 = JSON.stringify(disp.Name);
    window.localStorage.setItem('key1',JSON.parse(myJSON1));
    var myJSON2 = JSON.stringify(disp.Age);
    window.localStorage.setItem('key2',JSON.parse(myJSON2));

    window.location.replace('output.html');
    
};

const myform = document.getElementById("takeinput");
document.addEventListener('DOMContentLoaded',async function(){
    myform.addEventListener('submit',render)
});