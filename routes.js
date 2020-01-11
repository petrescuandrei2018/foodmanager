const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, './users.json');
const foodsFilePath = path.join(__dirname, './foods.json');
const foodCategoriesFilePath = path.join(__dirname, './food-categories.json');
const claimsFilePath = path.join(__dirname, './claims.json');


//users
const getUser = async (req, res, next) => {
  try {
    const data = fs.readFileSync(usersFilePath);
    const users = JSON.parse(data);
    const user = users.find(player => player.id === Number(req.params.id));
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const addUser = async (req, res, next) => {
    try {
        const data = fs.readFileSync(usersFilePath);
        const users = JSON.parse(data);
        const newUser = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
        };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const data = fs.readFileSync(usersFilePath);
        const users = JSON.parse(data);
        res.json(users);
    } catch (e) {
        next(e);
    }
};

//claims
const addClaim = async (req, res, next) => {
    try {
        const data = fs.readFileSync(claimsFilePath);
        const claims = JSON.parse(data);
        const newClaim = {
        userId: req.body.userId,
        foodId: req.body.foodId
        };
        claims.push(newClaim);
        fs.writeFileSync(claimsFilePath, JSON.stringify(claims));
        res.status(201).json(newClaim);
    } catch (e) {
        next(e);
    }
};

const getAllClaims = async (req, res, next) => {
    try {
        const data = fs.readFileSync(claimsFilePath);
        const claims = JSON.parse(data);
        res.json(claims);
    } catch (e) {
        next(e);
    }
};

//food categories
const getAllFoodCategories = async (req, res, next) => {
    try {
        const data = fs.readFileSync(foodCategoriesFilePath);
        const foodCategories = JSON.parse(data);
        res.json(foodCategories);
    } catch (e) {
        next(e);
    }
};

//foods
const getFood = async (req, res, next) => {
    try {
        const data = fs.readFileSync(foodsFilePath);
        const foods = JSON.parse(data);
        const food = foods.find(player => player.id === Number(req.params.id));
        if (!food) {
            const err = new Error('Food not found');
            err.status = 404;
            throw err;
        }
        res.json(food);
    } catch (e) {
        next(e);
    }
};

const getAllFoods = async (req, res, next) => {
    try {
        const data = fs.readFileSync(foodsFilePath);
        const foods = JSON.parse(data);
        res.json(foods);
    } catch (e) {
        next(e);
    }
};

const addFood = async (req, res, next) => {
    try {
        const data = fs.readFileSync(foodsFilePath);
        const foods = JSON.parse(data);
        const newFood = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        expirationDate: req.body.expirationDate,
        };
        foods.push(newFood);
        fs.writeFileSync(foodsFilePath, JSON.stringify(foods));
        res.status(201).json(newFood);
    } catch (e) {
        next(e);
    }
};

//routes
module.exports = router;

router
  .route('/api/v1/users/:id')
  .get(getUser);

router
.route('/api/v1/users')
.get(getAllUsers)
.post(addUser);

router
.route('/api/v1/foodcategories')
.get(getAllFoodCategories);

router
.route('/api/v1/foods/:id')
.get(getFood);

router
.route('/api/v1/foods')
.post(addFood);

router
.route('/api/v1/foods')
.get(getAllFoods);

router
.route('/api/v1/claims')
.get(getAllClaims)
.post(addClaim);
