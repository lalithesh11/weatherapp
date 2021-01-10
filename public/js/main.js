const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real_val= document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const datahide=document.querySelector('.middle_layer');

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Plz enter the city name before search";
    datahide.classList.add('data_hide');
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f41db92b8cf9cb8834a7aed7733627d9`;
      const response = await fetch(url);
      const data=await response.json();
      const arrData=[data];
      console.log(data);
      city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real_val.innerText=arrData[0].main.temp;
 
      const tempMood=arrData[0].weather[0].main;

    //   condition to check sunny or cloudy
      if(tempMood=="Clear"){
        //   we cannot use double quotes inside a double quotes, so use single quotes inside
          temp_status.innerHTML="<i class='fas fa-sun' style='color: #eccc68'></i>"
      }else if(tempMood=="Clouds"){
          temp_status.innerHTML="<i class='fas fa-cloud' style='color: #dfe4ea'></i>"
      }else if(tempMood=="Rain"){
          temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
      }  else{
        temp_status.innerHTML="<i class='fas fa-cloud' style='color: #44c3de'></i>"
      }

      datahide.classList.remove('data_hide');

    } catch {
      city_name.innerText = "Plz enter the city name properly";
      datahide.classList.add('data_hide');
    }
  }
};

const getCurrentDay=()=>{
    var weekday = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tueday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    let currentTime=new Date();
  //   console.log(weekday[currentTime.getDay()]);
  let day=weekday[currentTime.getDay()];
  return day;
}

const getCurrentTime=()=>{
    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
    var now=new Date();
    var month=months[now.getMonth()]; //month will start from 0, 
    var date=now.getDate();

    return `${date} ${month} `;
}

  day.innerText=getCurrentDay();
  today_date.innerText=getCurrentTime();


submitBtn.addEventListener("click", getInfo);
