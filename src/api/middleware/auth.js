import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'fail',
        error: 'Authentication token missing',
      });
    }

    const tokenProvidedByUser = authHeader.replace('Bearer ', '').trim();

    const decoded = jwt.verify(
      tokenProvidedByUser,
      process.env.JWT_SECRET_KEY
    );

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': tokenProvidedByUser,
    });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        error: 'Invalid token or user not found',
      });
    }

    req.token = tokenProvidedByUser;
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      error: 'Please authenticate.',
    });
  }
};

export default auth;
