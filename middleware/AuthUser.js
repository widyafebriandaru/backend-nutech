const jwt = require('jsonwebtoken');
const db = require('../models');
const dotenv = require('dotenv');

const verifyUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Token not provided' });
  }

  try {
    const secret_key = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secret_key); 

    const user = await db.user.findOne({
      attributes: ['id', 'name', 'email', 'accountType'],
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User tidak ditemukan' });
    }

    req.userId = user.id;
    req.accountType = user.accountType;

    next();
  } catch (error) {
    res.status(403).json({ msg: 'Invalid token' });
  }
};

const adminOnly = async (req, res, next) => {
  if (req.accountType !== 'Admin') {
    return res.status(403).json({ msg: 'Akses terlarang' });
  }
  next();
};

module.exports = {
  verifyUser: verifyUser,
  adminOnly: adminOnly,
};
