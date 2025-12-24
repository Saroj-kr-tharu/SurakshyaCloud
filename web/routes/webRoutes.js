
const express = require('express')
const path = require('path')

const rootDir = require('../utils/pathUtlis')

const router = express.Router();

router.get("/", (req,res, next) => {
        
      res.render('home', )
        })

router.get("/login", (req,res, next) => {
      const fieldList = [
        {title:'Email', type:'email', icon: 'fa-regular fa-message'}, 
        {title:'password', type:'password', icon: 'fa-solid fa-lock'},  
      ]
      res.render('login', {fieldList} )
        
})

router.get("/register", (req,res, next) => {
      const fieldList = [
        {title:'Email', type:'email', icon: 'fa-regular fa-message'}, 
        {title:'Username', type:'text', icon: 'fa-solid fa-circle-user'}, 
        {title:'password', type:'password', icon: 'fa-solid fa-lock'},  
        {title:'Repeat password', type:'password', icon: 'fa-solid fa-lock'},  
      ]
      res.render('register', {fieldList} )
        
})



module.exports ={ 
        router, 
       
}
