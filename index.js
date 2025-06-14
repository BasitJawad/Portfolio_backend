const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");

dotenv.config();
require('./src/Database/connection');
const app = express();

const PORT = process.env.PORT;

if (!PORT) {
  console.error("🚨 PORT not defined by Railway");
  process.exit(1);
}

app.set('trust proxy', 1); // Required for secure cookies on Railway

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://basitjawaddev.netlify.app"
  ],
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
  console.log(`✅ Server is running on Railway-assigned port: ${PORT}`);
});