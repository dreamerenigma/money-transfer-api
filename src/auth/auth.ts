import { User } from "src/utils/typeorm";
import { CreateUserParams, UserCredentialsParams } from "src/utils/types/queries";

export interface IAuthService {
	validateUser(params: UserCredentialsParams): Promise<User>;
	registerUser(params: CreateUserParams): Promise<User>;
}