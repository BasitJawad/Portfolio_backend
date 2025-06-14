const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");
dotenv.config();

require('./src/Database/connection');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://basitjawaddev.netlify.app"
  ],
  credentials: true // if you're using cookies or authorization headers
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
