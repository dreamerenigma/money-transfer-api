import { User } from "src/utils/typeorm";
import { FindUserParams } from "src/utils/types/queries";

export interface IUserService {
	findUser(params: FindUserParams): Promise<User>;
	createUser(params: FindUserParams): Promise<User>;
}