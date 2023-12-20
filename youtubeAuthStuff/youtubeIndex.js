const express = require("express");
const session = require("express-session");
const authRoutes = require("./googleAuth");
const passport = require("passport");
const main = require("./google");
const ytAuth = require("./setToken");
const axios = require("axios");

require("./google");

const port = process.env.port || 5502;
const app = express();

async function afterServerStart() {
    console.log("Server is up and running.");
    console.log(`Access token: ${ytAuth.getToken()}`);
}

async function bootstrap(callback) {
    app.use(
        session({
            secret: `${ytAuth.getToken()}`, // replace with your own secret key
            resave: false,
            saveUninitialized: true,
        })
    );
    //Initialize middleware that will allow us to handle authentication
    app.use(passport.initialize());
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    //This will specify the routes that we can take and what to do when we go to these routes
    app.use("/api/auth", authRoutes);

    try {
        app.listen(port);
        callback(); // Call the callback after server startup
    } catch (err) {
        console.log(err);
    }
}

// Call bootstrap with the afterServerStart callback
bootstrap(afterServerStart);
