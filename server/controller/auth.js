import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

// register

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName, 
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // hashing password logic

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfiles: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.user)
    // find the user by email
    const UserData = await User.findOne({ email: email });
    if (!UserData) {
      res.status(401).json({ error: "Invalid email or password" });
    }
    // check if password matches
    // note that the order in password and hashedPassword are important !!
    const isMatched = await bcrypt.compare(password, UserData.password);
    // incorrect password
    if (!isMatched)
      res.status(401).json({ error: "Invalid email or password" });
    // correct password
    else {
        delete UserData.password;
      const token = jwt.sign( {id: user._id } , process.env.SECRET_TOKEN);
      res.status(200).json({UserData, token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};
