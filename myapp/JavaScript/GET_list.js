let bt=document.getElementById("TI");
bt.addEventListener('click',function(){
    window.location.replace("InputForm.html");
});

async function get_list(){
    let url='http://localhost:5000/lst';
    try {
         let resp = await fetch(url,{
             method: 'GET',
             'Content-Type': 'application/json',
         });
         return await resp.json();
    } catch (error) {
     console.log(error);
     throw error;
    }
 };

 async function display(){
    let dict=await get_list();
    len=Number(JSON.parse(dict.length));
    var tb=document.getElementById("table");
    let is='';
    for(var key in dict){
        is=String(key);
        if(is!="length"){
            var row=tb.insertRow();
            row.insertCell().innerHTML=is;
            row.insertCell().innerHTML=(dict[is].name);
            row.insertCell().innerHTML=(dict[is].age);
        };
    };
 };

 let btn=document.getElementById("glst");
 btn.addEventListener('click',function(){
    document.getElementById("g").innerHTML="-->"
    display();
 })