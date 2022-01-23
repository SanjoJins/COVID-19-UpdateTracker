import React from "react";
import {useState,useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'


function Chart( {data:{data,country}} ){
  const [dailyData,setDailyData]= useState([]) //since dailydata is an array
  console.log(data);
  console.log(country);
  useEffect(()=>{
    async function fetchAPI() { 
      //useEffect callback function cannot be async, so used async function inside
      const fetchedDailyData= await fetchDailyData() //await should be used here because fetchDailyData returns a promise
      setDailyData(fetchedDailyData)
    }
    fetchAPI();
  },[]) 

  const lineChart=(
    dailyData.length ? //if data available implement the logic 
    ( <Line data={{
       labels: dailyData.map(({date})=>date), //destructure the date object and returned the date
       datasets:[{
         data:dailyData.map(({confirmed}) => confirmed),
         label:"Infected",
         borderColor:"#3333ff",
         fill: true,
       }, {
          data:dailyData.map(({deaths}) => deaths),
          label:"Deaths",
          borderColor:"red",
          backgroundColor:'rgba(255,0,0,0.5)',
          fill: true         
       }]
     }} />
    ) : null
  )

  const barChart=(
    data.confirmed ?
    (<Bar data={{
      labels:['Infected','Deaths'],
      datasets:[{
        label:'People',
        backgroundColor:[
          'rgba(0, 0, 255, 0.5)',
          'rgba(255, 0, 0, 0.5)'
        ],
        data:[data.confirmed.value,data.deaths.value]
      }]
    }}
    options={{
      legend:{display:false},
      title:{display:true, text:`Current state of COVID19 in ${country}`}
    }}/>) //two curly bracket - one for making dynamic and one for calling the object
    : null
  )



  return(
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;