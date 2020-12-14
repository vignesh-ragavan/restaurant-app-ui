import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import React, { Component } from "react";
import CategoryService from "../../Service/CategoryService";
import CategoryListGrid from "../CategoryListGrid";
import MerchantDashboard from "../MerchantDashboard";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import FoodService from "../../Service/FoodService";
import FoodCard from "./FoodCard";

const categoryStatusList = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "In Active",
    label: "In Active",
  },
];

export class ViewFood extends Component {
  constructor(props) {
    super(props);

    this.deleteFood = this.deleteFood.bind(this);
    this.editFood = this.editFood.bind(this);
    this.readForm = this.readForm.bind(this);

    this.state = {
      foodList: [],
      shouldOpenDialogue: false,
      food: {
        catName: "",
        foodName: "",
        image: "",
        notes: "",
        description: "",
        vat: "",
        offer: false,
        special: false,
        cookingTime: "",
        status: false,
      },
    };

    
  }
  handleClose = () => {
    console.log(JSON.stringify(this.state.category));
    FoodService.updateFood(this.state.category).then(
      (resp) => {
        console.log("category updated  " + resp.data.catName);
        FoodService.fetchAllFood().then((resp) => {
          console.log("backend categories are " + JSON.stringify(resp.data));
          //this.state.catList = resp.data;
          this.setState({ foodList: resp.data });
        });
      },
      (error) => {
        console.error(error.data);
      }
    );
    //do backedn edit categorty

    this.setState({ shouldOpenDialogue: false });
  };
   

  readForm = (e) => {
    console.log(e.target.value);
    //this.setState({ [e.target.name]: e.target.value });
    this.setState(
      Object.assign(this.state.food, { [e.target.name]: e.target.value })
    );
    // console.log("after update   " + this.state.category.catName);
  };

  deleteFood(id) {
    console.log("i am in delete category " + id);
    FoodService.deleteFood(id).then(
      (resp) => {
        this.setState({ foodList: resp.data });
      },
      (error) => {
        console.error("error s " + error.data);
      }
    );
  }

  editFood(id) {
    console.log("i am in edit category" + id);
    FoodService.getFood(id).then(
      (resp) => {
        console.log(resp.data);
        this.setState({ food: resp.data });
      },
      (error) => {
        console.error(error.data);
      }
    );

    this.setState({ shouldOpenDialogue: true });
  }

  componentDidMount() {
    FoodService.fetchAllFoods().then(
      (resp) => {
        this.setState({ foodList: resp.data });
      },
      (error) => {
        console.error(error.data);
      }
    );
  }

  render() {
    return (
      <div>
        <MerchantDashboard />
        <Grid container spacing={3}>
          {this.state.foodList.map((food) => (
            <Grid item xs={6} sm={3}>
              <Paper>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {food.foodName}
                        <CardActions>
                          <Button size="small" color="primary">
                            {/* <CheckIcon /> */}
                            {food.status}
                          </Button>
                          <Button size="small" color="primary">
                            <LocalOfferIcon />
                            Offer: {food.offer}
                          </Button>
                        </CardActions>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.editFood(food.id);
                      }}
                    >
                      <EditIcon /> Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        this.deleteFood(food.id);
                      }}
                    >
                      <DeleteForeverIcon /> Delete
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.shouldOpenDialogue}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <Typography color="primary">Category EDIT Form</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Container maxWidth="sm">
              <Box
                bgcolor="white"
                boxShadow="2"
                borderRadius="12px"
                textAlign="text"
                p="24px"
                mt="50px"
              >
                <Typography color="primary">
                  {/* <img src={UserSelfReg} height="80px"></img> */}
                  Category Edit
                </Typography>

                <TextField
                  id="outlined-required"
                  // label="Category"
                  // defaultValue="Hello World"
                  variant="outlined"
                  type="text"
                  color="primary"
                  fullWidth
                  margin="normal"
                  size="normal"
                  name="catName"
                  onChange={this.readForm}
                  value={this.state.food.catName}
                />
                <TextField
                  id="outlined-required"
                  select
                  //label="Parent Category"
                  value={this.state.food}
                  name="patCat"
                  onChange={this.readForm}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select the Parent Category"
                  variant="outlined"
                >
                  <option value={this.state.food.foodName}>
                    {this.state.food.foodName}
                  </option>
                  {this.state.foodList.map((option) => (
                    <option key={option.catName} value={option.catName}>
                      {option.catName}
                    </option>
                  ))}
                </TextField>

                <TextField
                  id="component-outlined"
                  // label="Image"
                  // defaultValue="Hello World"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  margin="normal"
                  size="normal"
                  name="image"
                  type="file"
                  onChange={this.readForm}
                />

                <Typography>
                  Is Offer ?
                  <Checkbox
                    checked={this.state.food.offer}
                    onChange={this.handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Typography>

                <TextField
                  id="outlined-required"
                  select
                  //label="Status"
                  value={this.state.status}
                  name="status"
                  onChange={this.readForm}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select the Status"
                  variant="outlined"
                >
                  <option>{this.state.food.status}</option>
                  {categoryStatusList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <br />
                <br />
                {/* <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.doAddCategory}
                >
                  Add Category
                </Button> */}
              </Box>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="green">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ViewFood;
