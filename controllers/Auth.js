const db = require('../models');
const dotenv = require('dotenv');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
dotenv.config();
const secret_key = process.env.SECRET_KEY;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    accountType: user.accountType,
  };
  return jwt.sign(payload, secret_key, { expiresIn: '1h' });
  
};

const login = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const token = generateToken(user);
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const accountType = user.accountType;

    res.status(200).json({ id, name, email, accountType, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = {
  login: login,
};
