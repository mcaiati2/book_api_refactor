import type { Request } from 'express';
import type IJwtPayload from './JwtPayload.js';

export default interface IUserAuthRequest extends Request { 
  user: IJwtPayload
}
