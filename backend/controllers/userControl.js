import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await UserModal.findOne({ email });

    if (!existing)
      return res
        .status(404)
        .json({ message: "User does not exist, try again." });

    const correctPassword = await bcrypt.compare(password, existing.password);

    if (!correctPassword)
      return res
        .status(400)
        .json({ message: "Access Denied, invalid credentials." });

    const token = jwt.token.sign(
      { email: existing.email, id: existing._id },
      "testing",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existing, token });
  } catch (error) {
    res.status(500).json({ message: "Uh oh, something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existing = await UserModal.findOne({ email });
    if (existing)
      return res.status(400).json({
        message: "User with that email already exist, please sign in.",
      });
    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passwords do not match, try again.",
      });

    const hashed = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashed,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.token.sign(
      { email: existing.email, id: existing._id },
      "testing",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Uh oh, something went wrong." });
  }
};
