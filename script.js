document.addEventListener('DOMContentLoaded', () => {
const currentHours = document.querySelectorAll('.hours');
const previousHours = document.querySelectorAll('.last-time-hours');
const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');

//const data = fetch ('data.json');

//data.then((response) => {
    //response.json().then((newResponse) => {
        //currentHours.innerHTML = `${newResponse[0].timeframes.days.current}hrs`;
        //previousHours.innerHTML = `Yesterday - ${newResponse[0].timeframes.days.previous}hrs`;
    //})
//});
fetch('data.json')
      .then(response => {
        if (!response.ok) {
          alert('Fetching error');
        }
        return response.json();
      })
      .then(data => {
        for (let i = 0; i<currentHours.length; i++) {
            currentHours[i].textContent = `${data[i].timeframes.daily.current}hrs`
            previousHours[i].textContent = `Yesterday - ${data[i].timeframes.daily.previous}hrs`
        }

        weekly.addEventListener('click', () => {
            for (let i = 0; i<currentHours.length; i++) {
                currentHours[i].textContent = `${data[i].timeframes.weekly.current}hrs`
                previousHours[i].textContent = `Last week - ${data[i].timeframes.weekly.previous}hrs`
            }
            daily.classList.remove('active');
            monthly.classList.remove('active');
            weekly.classList.add('active');
        })

        monthly.addEventListener('click', () => {
            for (let i = 0; i<currentHours.length; i++) {
                currentHours[i].textContent = `${data[i].timeframes.monthly.current}hrs`
                previousHours[i].textContent = `Last month - ${data[i].timeframes.monthly.previous}hrs`
            }
            daily.classList.remove('active');
            monthly.classList.add('active');
            weekly.classList.remove('active');
        })

        daily.addEventListener('click', () => {
            for (let i = 0; i<currentHours.length; i++) {
                currentHours[i].textContent = `${data[i].timeframes.daily.current}hrs`
                previousHours[i].textContent = `Yesterday - ${data[i].timeframes.daily.previous}hrs`
            }
            daily.classList.add('active');
            monthly.classList.remove('active');
            weekly.classList.remove('active');
        })
      })
      .catch(error => {
        currentHours.textContent = `Error: ${error.message}`;
      });
});
