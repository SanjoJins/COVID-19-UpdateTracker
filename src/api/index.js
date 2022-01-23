import axios from "axios";

const url='https://covid19.mathdro.id/api'

export async function fetchData(country){
  var countryUrl=url
  if(country){
    countryUrl=url+'/countries/'+country
  }
  try{
    const {data}= await axios.get(countryUrl) //destructuring the array
    //extract the required data into 'modifiedData'
    const modifiedData={
      confirmed:data.confirmed,
      //recovered:data.recovered,
      deaths:data.deaths,
      lastUpdate:data.lastUpdate
    }
    return modifiedData
  }
  catch(error){
    console.log(error)
  }
}

export async function  fetchDailyData(){
  try{
    const response= await axios.get(`${url}/daily`)
    const {data} = response //destructuring the response Object
    //here data is an Array so we have to loop through it
    const modifiedData= data.map((dailyData)=>
      ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate
      }) //parenthesis automatically return the value inside arrow function
    )
    return modifiedData
  }
  catch(error){
    console.log(error)
  }
}

export async function countries_names(){
  try{
    const response = await axios.get(`${url}/countries`)
    console.log(response);
    const {data:{countries}}=response
    //console.log(countries)
    //console.log(countries.map((country)=>country.name));
    return countries.map((country)=>country.name)
  }
  catch(error){

  }
}
