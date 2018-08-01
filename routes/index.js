const express = require('express');
const router = express.Router();

const questions = ["What's the smallest animal on Earth?", "How many legs does a milipede have?",
     "How big is a baby kangaroo?", "What's the loudest animal in the world?", "How fast can a cheetah run?",
    "What's the longest living animal?", "How many times can a woodpecker peck per sec?", 
    "How many years old can a mouse be?"]
const hints = ["It lives in the ocean", "Number from 100 - 1000", "Less than 1 foot", "It can't walk or fly",
    "Number from 10 - 200", "It's a warm-blooded mammal", "Number from 1 - 50", "Number from 1 - 30"]
const answers = ['Water Bear', "400", "2 cm", "Sperm Whale", "70 mph", "Bowhead Whale", "20 times", "2 years"]


router.get('/', (req,res) => {
    var username = req.cookies.user
    if (username) {
        res.render('index', {user: username});
    } else {
        res.redirect('/student');
    }
});
router.post('/bye', (req, res) => {
    res.clearCookie('user');
    res.redirect('/student');
});

router.get('/cards', (req,res) => {
    var random = Math.floor(Math.random() * 10) + 1
    res.render('cards', {prompt: questions[random], hint: hints[random], answer: answers[random]});
});
router.post('/cards', (req,res) => {
    var random = Math.floor(Math.random() * 10) + 1
    res.render('cards', {prompt: questions[random], hint: hints[random], answer: answers[random]});
});

router.get('/student', (req,res) => {
    var username = req.cookies.user
    if (username) {
        res.redirect('/');
    } else {
        res.render('student', {user: username});
    }
});
router.post('/student', (req,res) => {
    var user = req.body.user;
    res.cookie('user', user)
    res.render('student', {user: user});
});

module.exports = router;