const db = require('../models');
const argon2 = require('argon2');

const login = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    req.session.userId = user.id;
    const id = user.id;
    const name = user.name;
    const email = user.email;
    const accountType = user.accountType;

    res.status(200).json({ id, name, email, accountType });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const me = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  try {
    const user = await db.user.findOne({
      attributes: ['id', 'name', 'email', 'accountType'],
      where: {
        id: req.session.userId
      }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    res.status(200).json(user);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(400).json({ msg: "Tidak dapat logout" });
    }
    res.status(200).json({ msg: "Anda telah logout" });
  });
};

module.exports = {
  login: login,
  logOut: logOut,
  me: me
};
