import { Session } from 'express-session';
import { User } from './entities/User';

export { User, Session };

export const entities = [User, Session];
