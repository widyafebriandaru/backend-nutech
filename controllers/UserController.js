const db = require('../models');
const express = require('express');
const argon2 = require('argon2');

//GET ALL USER
const getUsers = async (req, res) => {
    try {
      const users = await db.user.findAll();
        res.status(200).json(users)
        
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };

  //GET SPECIFIC USER
const getUserById = async(req, res) =>{
    try {
        const response = await db.user.findOne({
            attributes:['id','name','email'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  }

  //Create New User
const createUser = async(req, res) =>{
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password tidak matching"});
    const hashPassword = await argon2.hash(password);
    try {
      await db.user.create({
        name: name,
        email: email,
        password: hashPassword,
        accountType: "Pegawai",
      });
      res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
      res.status(400).json({msg: error.message});
    }
  }

  //Delete Existing User
const deleteUser = async(req, res) =>{
    const user = await db.user.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await db.user.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
  }
  
  module.exports = {
    getUsers:getUsers, 
    getUserById:getUserById,
    createUser:createUser,
    deleteUser:deleteUser
  };