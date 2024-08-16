const express = require('express');
const router = express.Router();

const local ={
    title: "Admin",
    description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
}

const post = require('../models/post');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const adminlayout = '../views/layouts/admin';

//check LOGIN
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userID = decoded.userID;
        next();
    }
    catch(error)
    {
        return res.status(401).json({ message: 'Unauthorized'});
    }
}


//get LOGIN

router.get('/admin', async (req, res) => {
    try{
      
        res.render('admin/index', {local, layout : adminlayout});
    }
    catch(error)
    {
        console.log(error);
    }
    
});


//get DASHBOARD

router.get('/dashboard', authMiddleware, async (req, res) => {
    try{
        const local ={
            title: "Dashboard",
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }
        const data = await post.find();


        res.render('admin/dashboard', {local, data, layout : adminlayout});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get DASHBOARD-CREATE

router.get('/add-post', authMiddleware, async (req, res) => {
    try{
        const local ={
            title: "New Post",
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }

        res.render('admin/add-post', {local, layout : adminlayout});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get DASHBOARD-EDIT

router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try{
        const local ={
            title: "Edit Post",
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }

        const data = await post.findOne({ _id: req.params.id });

        res.render('admin/edit-post', {local, data, layout : adminlayout});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get DASHBOARD-EDIT

router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try{
        const local ={
            title: "Edit Post",
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }
       await post.findByIdAndUpdate(req.params.id, {
            title: req.body.posttitle,
            body: req.body.body,
            UpdatedAt: Date.now()
       });

       res.redirect(`/edit-post/${req.params.id}`);

    }
    catch(error)
    {
        console.log(error);
    }
    
});


//get DASHBOARD-DELETE

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

    try {

        await post.deleteOne({ _id: req.params.id});
        res.redirect('/dashboard');
        
    } catch (error) {
        console.log(error);
        
    }

});


//ADD POST

router.post('/add-post', authMiddleware, async (req, res) => {
    try{
        console.log(req.body);
       try {
         const newpost = new post({
            title: req.body.posttitle,
            body: req.body.body
         });

         await post.create(newpost);
         res.redirect('/dashboard');

       } catch (error) {
            console.log(error);
       }

       
    }
    catch(error)
    {
        console.log(error);
    }
    
});


//check LOGIN

router.post('/admin', async (req, res) => {
    try{
      
        const {username, password} = req.body;
        const USER = await user.findOne({ username });

        if(!USER)
        {
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const validpass = await bcrypt.compare(password, USER.password);

        if(!validpass)
        {
                return res.status(401).json({ message: 'Invalid Credentials'});
        }
        
        const token = jwt.sign({ userID: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});

        res.redirect('/dashboard');
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//check REGISTER

router.post('/register', async (req, res) => {
    try{
      
        const {username, password} = req.body;
        const hashpass = await bcrypt.hash(password, 10);
        console.log(req.body);
        console.log(hashpass);
        try {
            const User = await user.create({ username, password:hashpass});
            res.status(201).json({ message: 'User created', User});

        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({ message: 'User in use'});
            }
            res.status(500).json({ message: 'Internal server error'});
        }
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get LOGOUT

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = router;