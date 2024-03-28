import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ROLE from '@constants/roles';
import RESPONSE_STATUS from '@constants/status';
import Role from '@models/role';
import User from '@models/user';
import { COMMON_ERROR, SERVER_ERROR, USER_ERROR } from 'types';
import { ObjectId } from 'mongodb';

const saltRounds = +process.env.SALT_ROUNDS || 16;
const jwtSecret = process.env.JWT_SECRET;

export const register = async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || username.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter);
    if (!password || password.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter);

    const existUser = await User.findOne({ username, isDisabled: 0 });
    if (!!existUser) return response.status(USER_ERROR.UserExist.status).json(USER_ERROR.UserExist);

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username: username, password: hashPassword, role: ROLE.USER.id });
    return response.status(RESPONSE_STATUS.SUCCESS).json(user);
  } catch (error) {
    console.error(error.message);
    response.status(SERVER_ERROR.DefaultError.status).json({
      message: `Register failed with error: ${error.message}`,
    });
  }
};

export const login = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || username.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter);
    if (!password || password.length === 0)
      return response.status(COMMON_ERROR.MissingParameter.status).json(COMMON_ERROR.MissingParameter);

    const user = await User.findOne({ username: username, isDisabled: false });
    if (!user) return response.status(USER_ERROR.UserNotExist.status).json(USER_ERROR.UserNotExist);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(USER_ERROR.PasswordWrong.status).json(USER_ERROR.PasswordWrong);
    }

    const token = await jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '7d' });

    return response.status(RESPONSE_STATUS.SUCCESS).json({ token: token });
  } catch (error) {
    console.error(error.message);
    response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError);
  }
};

const softDelete = async (request, response) => {};

const findAll = async (request, response) => {
  try {
    const user = await User.find({
      attributes: {
        exclude: ['password', 'token'],
      },
      include: [Role],
      where: {
        is_deleted: 0,
      },
    });
    return response.status(RESPONSE_STATUS.SUCCESS).json(user);
  } catch (error) {
    console.error(error.message);
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError);
  }
};

const update = async (request, response) => {
  try {
    const id = request.user.id;
    const description = request.body.description;
    await User.updateOne(
      {
        description,
      },
      {
        where: { id, is_deleted: 0 },
      }
    );
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
    return response.status(RESPONSE_STATUS.SUCCESS).json(user);
  } catch (error) {
    console.error(error.message);
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError);
  }
};

export const me = async (request, response) => {
  try {
    const bearer = request.headers.authorization;
    const token = bearer.replace('Bearer ', '');
    const parser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: new ObjectId(parser.id) });
    console.log('user: ', user);
    return response.status(RESPONSE_STATUS.SUCCESS).json(user);
  } catch (error) {
    console.error(error.message);
    return response.status(SERVER_ERROR.DefaultError.status).json(SERVER_ERROR.DefaultError);
  }
};
