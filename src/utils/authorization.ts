import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET || 'as23e9!#wfviu34', { expiresIn: '30m' });
};
