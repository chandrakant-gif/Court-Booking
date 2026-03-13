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
import bookingRoutes from './routes/bookingRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const googleStrategyInstance = googleStrategy.Strategy;

const app = express();
app.set("trust proxy", 1);

//middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origin.includes("vercel.app") ||
      origin.includes("localhost")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: false }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: "none"
  }
}));

app.use(cookieParser());

//google login configuration
app.use(passport.initialize());
// app.use(passport.session());

passport.use(new googleStrategyInstance({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.BACKEND_URL}/auth/google/callback`
      : "http://localhost:5000/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });


// ROOT ROUTE (Fix Cannot GET /)
app.get("/", (req, res) => {
  res.send("API running successfully 🚀");
});


//routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect:
      process.env.NODE_ENV === "production"
        ? `${process.env.FRONTEND_URL}/login`
        : 'http://localhost:5173/login',
  }),
  googleAuth,
  (req, res) => {
    res.redirect(
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173/'
    );
  }
);


//API routes
app.use('/api/user', userRoutes);
app.use('/api/court', courtRoutes);
app.use('/api/booking', bookingRoutes);

app.use(errorHandler);

getConnection();

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);