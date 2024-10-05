// npm run devStart
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//import mongoose from "mongoose";
//import connectDB from './connectDB/connectDB.js'

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Assurez-vous que votre application sait où se trouve le répertoire 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//app.use(express.static("uploads")); 
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: 'tonia', // Remplace par une clé secrète sécurisée
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  cookie: { secure: true } // 'false' pour le développement, à passer à 'true' en production avec HTTPS
}));

/*
app.use(
    session({
    secret: "my secret key",
    saveUninitalized: true,
    resave: false
   })
);
*/
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})


app.use(express.static(path.join(__dirname, 'js')));
// Setting EJS as templating engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

const articleRouter = require("./routes/articles")
const utilisateurRouter = require("./routes/utilisateurs")
//const postRouter = require("./routes/posts")

//app.use("/users", userRouter)
app.use("/", articleRouter)
app.use("/", utilisateurRouter)
//app.use("/posts", postRouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//app.listen(4000)
