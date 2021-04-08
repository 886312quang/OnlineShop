const jwtHelper = require("../helpers/jwt.helper");
const User = require("../models/userModel");
const { validationResult } = require("express-validator/check");
const { auth } = require("../services/index");
const { transSuccess, transErrors } = require("../../../lang/vi");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "60s";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ||
  "access-token-secret-example.com-blue-cat-a@456789";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET ||
  "refresh-token-secret-MinhQuangDev.com-red-cat-a@456789";

/**
 * Register
 * @param {*} req
 * @param {*} res
 */
let register = async (req, res) => {
  let errorArr = [];
  let successArr = [];
  console.log(req.body)

  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorArr.push(item.msg);
    });

    return res.status(401).send({ success: false });
  }
  try {
    let createUserSuccess = await auth.register(
      req.body.email,
      req.body.password,
      req.body.userName,
      req.body.role,
    );
    successArr.push(createUserSuccess);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
let login = async (req, res) => {
  try {
    const userData = await User.login(req.body);
    const accessToken = await jwtHelper.generateToken(
      userData,
      accessTokenSecret,
      accessTokenLife,
    );

    const expToken = await jwtHelper.verifyToken(
      accessToken,
      accessTokenSecret,
    );

    const refreshToken = await jwtHelper.generateToken(
      userData,
      refreshTokenSecret,
      refreshTokenLife,
    );

    // Luu DB
    tokenList[refreshToken] = { accessToken, refreshToken };

    const user = userData.transform();

    return res.status(200).json({
      accessToken,
      refreshToken,
      user,
      exp: expToken.exp,
      iat: expToken.iat,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * controller refreshToken
 * @param {*} req
 * @param {*} res
 */
let refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;

  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret,
      );

      const userData = decoded.data;

      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife,
      );

      const expToken = await jwtHelper.verifyToken(
        accessToken,
        accessTokenSecret,
      );

      return res
        .status(200)
        .json({ accessToken, exp: expToken.exp, iat: expToken.iat });
    } catch (error) {
      res.status(403).json({
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

module.exports = {
  login,
  register,
  refreshToken,
};
