
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error){
          console.log(data.error)
      }
      messageOne.textContent = "The location is " + data.Location
      messageTwo.textContent = data.forecast.Weather_Description
    })
})

    // 
    // console.log(location)
})