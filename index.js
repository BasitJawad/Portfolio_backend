const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");
dotenv.config();
require('./src/Database/connection');
const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  "http://localhost:5173",
  "https://basitjawaddev.netlify.app",
  "https://portfolio-frontend-6f1b-eight.vercel.app",
  "https://portfolio-frontend-6f1b-git-main-basitjawads-projects.vercel.app",
  "https://portfolio-frontend-6f1b-hj2is1qv0-basitjawads-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

const userRoute = require('./src/Routes/userRoute');
const projectRoute = require('./src/Routes/projectRoute');

app.use("/api", userRoute);
app.use("/api", projectRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
