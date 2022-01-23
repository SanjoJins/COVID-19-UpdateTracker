 import React from 'react'
//  import Cards from './components/Cards/Cards'
//  import Chart from './components/Chart/Chart'
//  import CountryPicker from './components/CountryPicker/CountryPicker'
//  the alternate method is represented down but some additional work needed in Component folder

import {Cards,Chart,CountryPicker} from './components'
import styles from './App.module.css'
import {fetchData} from './api' 
import coronaImage from './images/image.png'
//since it is named one we used curly brackets
//import will automatically search inside index.js file

 class App extends React.Component{

   //initiallizing the state for data manupulation and sent as props
   state={
     data:[],
     country:''//for keeping state of picked country
   }

    async componentDidMount(){ //the best place to call the data from api
     const fetchedData= await fetchData();
     this.setState({data:fetchedData}) //setting the state
   }

   //method to change the state of country
   //normal function cannot be used here because the this.state is not binded to that function
   //so arrow function is used because it will automatically bind this
    handleCountryChange= async (country)=> {
     const fetchedData= await fetchData(country)
     this.setState({data:fetchedData,country:country}) //set the state    
   }


   render(){
     if(!this.state.data){
       return "Connect to network"
     }
     return(
       <div className={styles.container}> {/*this makes sure that no interference with other css files*/}
        <img className={styles.image} src={coronaImage} alt='COVID'/>
         <Cards data={this.state.data}/> {/*making the data to be acessable inside cards*/}
         <CountryPicker handleCountryChange={this.handleCountryChange}/>
         <Chart data={this.state}/> {/*passing country specific data */}
       </div>
     )
   }
 }

 export default App;
 