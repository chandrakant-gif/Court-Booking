import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';
import getConnection from './utils/getConnection.js';
import googleAuth from './middlewares/googleAuth.js';
import userRoutes from './routes/user.js';
import courtRoutes from './routes/courtRoutes.js'
import errorHandler from './middlewares/errorHandler.js';
import bookingRoutes from './routes/bookingRoutes.js';




const googleStrategyInstance = googleStrategy.Strategy;



const app = express();

//middlewares
app.use(cors(
    { origin: 'http://localhost:5173', credentials: true }
));
app.use(express.json());
app.use(express.urlencoded({limit: "5mb", extended: false }));
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());

//google login configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new googleStrategyInstance({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://court-booking-3.onrender.com/auth/google/callback"
},(accessToken, refreshToken, profile, done) => {
    return done(null, profile);
} ));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.get("/", (req, res) => {
  res.send("QuickCourt API Running 🚀");
}); 

//routes
app.get('/auth/google', passport.authenticate('google', 
  { scope: ['profile', 'email'],
  prompt: 'select_account' ,
})
); 

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: 'https://court-booking-q3qy.vercel.app/login',
}),googleAuth,
 (req, res, next) => {
    res.redirect('https://court-booking-q3qy.vercel.app/');
});


app.use('/api/user', userRoutes);
app.use('/api/court',courtRoutes);
app.use('/api/booking', bookingRoutes);
app.use(errorHandler);

getConnection();

app.listen(process.env.PORT, () =>console.log(`Server running on port ${process.env.PORT}`));