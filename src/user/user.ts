import { User } from "src/utils/typeorm";
import { 
	CreateUserParams,
	FindUserOptions, 
	FindUserParams, 
} from "src/utils/types/queries";

export interface IUserService {
	findUser(
		params: FindUserParams,
		options?: FindUserOptions,
		): Promise<User | undefined>;
	createUser(params: CreateUserParams): Promise<User>;
}