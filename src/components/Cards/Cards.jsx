import React from "react";
//we will use the material ui design
import {Card, CardContent, Typography, Grid} from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from "react-countup";
import cx from 'classnames' //helps to use multiple class-names in a component

function Cards(props){
  console.log(props.data);
  const {confirmed,deaths,lastUpdate}=props.data //destructurung the props object
  if(!confirmed){
    return "loading..."
  }
  return(
    <div className={styles.container}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item component={Card} xs={12} md={5} className={cx(styles.card,styles.infected)} > {/*applyting multiple class in a component*/}
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h6">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator="," /> {/*implemented countup animation component*/}
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> {/*Converting date into readable8*/}
            <Typography variant="body2">Number of active cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={5} className={cx(styles.card,styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h6">
              <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of dead of covid</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
    
  )
}

export default Cards;
