const countryInput = document.querySelector('#country');
const addBtn = document.querySelector('#add');
const ctx = document.getElementById('myChart').getContext('2d'); 

let countryData = [];
let chartInstance;

function vaild() {
  if (countryInput.value === "") {
    alert("Enter value");
    return false;
  } else {
    return true;
  }
}

async function getData() {
  try {
    const countryName = countryInput.value.toLowerCase();
    const resp = await fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`);

    countryInput.value = "";
    
    if (!resp.ok) {
      throw new Error("Not found");
    }

    const data = await resp.json();
    console.log(data);

    const conName = data.country;
    const cases = data.cases;

    let obj = {
      country: conName,
      case: cases
    };

    countryData.push(obj);
    console.log(countryData);

  
    let n = countryData.map((a) => a.country);
    let c = countryData.map((a) => a.case);

  
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: n,
        datasets: [{
          label: 'Covid-19 Cases',
          data: c,
          borderWidth: 1,
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  } catch (error) {
    console.error(error);
  }
}

addBtn.addEventListener('click', function () {
  if (!vaild()) return;
  getData();
});










