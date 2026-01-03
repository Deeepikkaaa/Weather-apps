  const city=document.getElementById("Inputcity");
  const Button=document.getElementById("searchBtn");
 const result=document.getElementById("result");

 
 Button.addEventListener( "click",()=>{
     const CityName=city.value;
     if(!CityName){
        console.log("Please! enter a city name!!");
        return;
     }
     //split the input by commas to get the multiple cities
 const cities = CityName.split(',').map(c => c.trim());
     const promises=cities.map(city=>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
     );
     Promise.all(promises)
     .then( responses=>{
        return Promise.all(responses.map(response=>{
        if(!response.ok){
            throw new Error("City not found!");
        }
       return response.json();
        }));

     })

     .then (data=>{
        console.log(data);
        let html='';

        data.forEach(data=>{

                    html+=`
        <h3>${data.name},${data.sys.country}</h3>
        <p>Longitude:${data.coord.lon}</p>
        <p>Latitude:${data.coord.lat}</p>

         ` ;

        });
result.innerHTML=html;
     })
 .catch(error=>{
    result.innerHTML=`<p> Error:${error.message}</p>`;
 });
 });