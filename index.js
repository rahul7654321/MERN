const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://rahul73:rahul7373@cluster0.mpfkrol.mongodb.net/userNew",
);

const userW = mongoose.model("user", {
  name: String,
  email: String,
  password: String,
});
app.post("/signup", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  
   const userExit = await userW.findOne({email:email});
  if(userExit){
    res.send("user already exist");
  }

  const user = new userW({
    name: name,
    email: email,
    password: password,
  });
  await user.save();

  res.send("user created");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});