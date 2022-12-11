import { User } from "./typeorm";

export interface AuthenticatedRequest extends Request {
	user: User;
}