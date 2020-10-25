
let val;
const formsel = document.querySelector('form');
const searchinput = document.querySelector('input');
const msg_1 = document.querySelector('#msg-1');
const msg_2 = document.querySelector('#msg-2');
formsel.addEventListener('submit',(e)=>{
    e.preventDefault();
    val = searchinput.value;
    if(!val) console.log("Location cannot be blank");
    else fetchDetails(val);
})
const fetchDetails = (val)=>{
msg_1.textContent='Loading...';
msg_2.textContent='';
fetch("/weather?address="+val).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg_1.textContent = data.error;
        }else{
           
            msg_1.textContent = data.location;
            msg_2.textContent = data.forecast;
        }
    })
})
}