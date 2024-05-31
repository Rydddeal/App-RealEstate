const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db.js");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require("multer");
const fs = require('fs');
const path = require("path");

const app = express();

dotenv.config();

connectDB(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+ '/uploads'));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("test is ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(422).json({ error: "Registration failed", message: e.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (!passwordOk) {
      return res.status(422).json({ error: "Incorrect password" });
    }

    jwt.sign(
      { email: userDoc.email, id: userDoc._id, name: userDoc.name },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Token generation failed" });
        }
        res.cookie("token", token).json(userDoc);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      return res.status(403).json("Invalid token");
    }
    try {
      const userDoc = await User.findById(userData.id);
      if (!userDoc) {
        return res.status(404).json("User not found");
      }
      res.json(userDoc);
    } catch (e) {
      console.error(e);
      res.status(500).json("Internal Server Error");
    }
  });
});


app.post('/logout',(req,res) => {
  res.cookie( 'token', '' ).json(true);
} )



app.post('/upload-by-link', async(req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg'; 
   try {
     await imageDownloader.image({
       url: link,
       dest: __dirname + "/uploads/" + newName, 
     });

     res.json(newName);
   } catch (error) {
     console.error("Error downloading image:", error);
     res.status(500).json({ error: "Failed to download image" });
   }
});


const photosMiddleware = multer({dest: 'uploads'});

app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path: tempPath, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = tempPath + '.' + ext;
    fs.renameSync(tempPath, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
