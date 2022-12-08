import { User } from "src/utils/typeorm";
import { CreateUserParams } from "src/utils/types/queries";

export interface IAuthService {
	validateUser();
	registerUser(params: CreateUserParams): Promise<User>;
}