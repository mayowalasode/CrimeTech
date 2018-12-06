
let d= new Date();
let month= d.getMonth();
let monthAdd1= month +1;
let day = d.getDate();
let year= d.getFullYear();

let minute= d.getMinutes();

let date= monthAdd1+"-"+day+"-"+year+"/"+d.getHours()+":"+minute;

document.getElementById("time").innerHTML = date;

