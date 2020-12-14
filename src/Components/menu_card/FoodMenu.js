import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { useEffect } from "react";

import FoodService from '../../Service/FoodService';
import { green, red, yellow } from '@material-ui/core/colors';
import { CellWifiTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
    
      alignContent:'centre',
      color:yellow,
      justifyContent:"centre"
      
    },
    media: {
      height: 10,

    },
    background:{
        textAlign:'centre'
    }
  });

 export default function FoodMenu() {

    const  classes = useStyles();
    const [foodList, setfoodList] = React.useState([]);
    console.log("food list is " + JSON.stringify(foodList));

    useEffect(() => {
        FoodService.fetchAllFoods().then(
          (resp) => {
            setfoodList(resp.data);
          },
          (error) => {
            console.error(error.data);
          }
        );
        console.log("food list is " + JSON.stringify(foodList));
      },[]);
   

    
        return (
            <div>

    <Card className={classes.root} >
      <CardActionArea >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <Grid container className={classes.background} >

          {foodList.map((food) => (

         <h1 className={classes.root}>{food.foodName}</h1>
    
          ))}
        </Grid>
          </Typography>
          
        </CardContent>
      </CardActionArea>
     
    </Card>
  

            </div>
        )
    }

