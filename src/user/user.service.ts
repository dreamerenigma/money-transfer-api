import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getUserSelectors } from "src/utils/constants";
import { hashPassword } from "src/utils/helpers";
import { User } from "src/utils/typeorm";
import { 
	CreateUserParams, 
	FindUserOptions, 
	FindUserParams, 
} from "src/utils/types/queries";
import { Repository } from "typeorm";
import { UserFoundException } from "./exceptions/UserFoundException";
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	findUser(params: FindUserParams, options?: FindUserOptions): Promise<User> {
		const select = getUserSelectors(options?.selectPassword);
		return this.userRepository.findOne({ where: params, select });
	}

	async createUser(params: CreateUserParams) {
		const existingUser = await this.findUser({ username: params.username });
		if (existingUser) throw new UserFoundException();
		params.password = await hashPassword(params.password);
		const newUser = this.userRepository.create(params);
		return this.userRepository.save(newUser);
	}
}
