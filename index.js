const countryInput = document.querySelector('#country');
const addBtn = document.querySelector('#add');


let countryData = [];

function vaild(){
    if(countryInput.value === ""){
        alert("Enter value");
    }else {
        return true;
    }
}



async function getData(){

try{

const countryName = countryInput.value.toLowerCase();
const resp = await fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)

if(!resp.ok){
    throw new Error("Not found")
}

const data = await resp.json();
console.log(data);


const conName = data.country;
const cases = data.cases;

let obj =  {
    country: conName,
    case: cases
}

countryData.push(obj);
console.log(countryData)
} catch(error) {
    console.error(error);
    
}
    }


addBtn.addEventListener('click', function(){

    if(!vaild()) return;
    
    getData();

});