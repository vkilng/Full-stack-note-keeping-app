async function get_test(){
   let url='http://localhost:5000/';
   try {
        let res=await fetch(url,{
            method: 'GET',
            'Content-Type': 'application/json',
        });
        return await res.json();
   } catch (error) {
    console.log(error);
    throw error;
   }
};
async function render(){
    let data=await get_test();
    let html=data.message;
    document.getElementById("hw").innerHTML=html;
}

let btn1=document.getElementById("get");
btn1.addEventListener("click",render)

let btn2=document.getElementById("goback");
btn2.addEventListener("click",function(){
    window.location.replace('Page_1.html');
})
