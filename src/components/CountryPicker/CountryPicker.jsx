import React from "react";
import {useState,useEffect} from 'react'
import {NativeSelect,FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { countries_names } from "../../api";

function CountryPicker({ handleCountryChange }){ //destructure the props from App.js
  const [fetchedCountries, setFetchedCountries]=useState([])
  useEffect(()=>{
    async function fetchCountries(){
      const country= await countries_names()
      setFetchedCountries(country)
    }
    fetchCountries()
  },[])
  console.log(fetchedCountries);

  return(
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e)=>handleCountryChange(e.target.value)}> {/* onChange triggered and event and took selected option*/ }
        <option value="">Global</option> {/*this value is empty because the barchart render when there is a country */}
        {fetchedCountries.map((country,i)=><option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl> 
  )
}

export default CountryPicker;