const express = require('express');
const router = express.Router();

const local ={
    title: "DynaBlog",
    description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
}

const post = require('../models/post');

//get HOME

router.get('', async (req, res) => {
    try{
        const data = await post.find();
        res.render('index', {local, data});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get ABOUT

router.get('/about', (req, res) => {
    //res.send("Hello World");
    res.render('about', {local});
});

router.get('/contact', (req, res) => {
    //res.send("Hello World");
    res.render('contact', {local});
});



//get POSTS

router.get('/post/:id', async (req, res) => {
    try{

        let slug = req.params.id;

        const data = await post.findById({_id : slug});

        const local ={
            title: data.title,
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }

        res.render('postpage', {local, data});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

//get SEARCH

router.post('/search', async (req, res) => {
    try{
        const local ={
            title: "Search",
            description: "A simple, dynamic blog created using Express, Node.js and MongoDB"
        }
       

        let searchTerm = req.body.searchTerm;
        const nospecsearch = searchTerm.replace(/[^a-zA-Z0-9]/g,"");

        const data = await post.find({
            $or: [
                { title: { $regex: new RegExp(nospecsearch, 'i')} },
                { body: { $regex: new RegExp(nospecsearch, 'i')} }
            ]
        });

        res.render('searchpage', {local, data});
        
    }
    catch(error)
    {
        console.log(error);
    }
    
});


module.exports = router;




//----------post insertions--------------//

function insertPosts(){
    post.insertMany([
        {
            title: "How to finish what you started",
            body: "Keep reminding yourself of your goals and don't push yourself too hard"
        },
        {
            title: "Rainy weather is the best",
            body: "Its cool, the rain sounds nice, and plants get water. One downside is that there's mud everywhere but hey, no pain no gain"
        }
    ])
}

//insertPosts();  //RUN ONLY ONCE