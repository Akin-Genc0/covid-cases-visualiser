const countryInput = document.querySelector('#country');
const addBtn = document.querySelector('#add');


async function getData(){

try{

const countryName = countryInput.value.toLowerCase();
const resp = await fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)

if(!resp.ok){
    throw new Error("Not found")
}

const data = await resp.json();
console.log(data);

} catch(error) {
    console.error(error);
    
}
}




addBtn.addEventListener('click', function(){

getData();

});