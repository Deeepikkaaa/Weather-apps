//get dom elements
const  Input=document.getElementById("cityInput");
const btn=document.getElementById("searchBtn");
const result=document.getElementById("weatherResult");



btn.addEventListener('click',()=>

{
    const city=Input.value;
    if(!city){
        result.innerHTML="<p>Enter a city name!</p>";
        return;
    }

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
.then(response=>{
    if(!response.ok){
        throw new Error("City Not found");
    }
     return response.json();
})

.then(data=>{
    console.log(data);//to see how is data
    result.innerHTML=`
    <h2>${data.name},${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}C</p>
    <p>Temperature feels like: ${data.main.feels_like}C</p>
    <p>Weather: ${data.weather[0].description}C</p>
    <p> Humidity:${data.main.humidity}</p>
    <p> Country:${data.sys.country}</p>

    `;
})
.catch(error=>{
    result.innerHTML=`Error:${error.message}`;
});
});
