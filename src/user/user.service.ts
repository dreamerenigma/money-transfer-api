import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/utils/helpers";
import { User } from "src/utils/typeorm";
import { CreateUserParams, FindUserParams } from "src/utils/types/queries";
import { Repository } from "typeorm";
import { UserFoundException } from "./exceptions/UserFoundException";
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	findUser(params: FindUserParams): Promise<User> {
		return this.userRepository.findOneBy(params);
	}

	async createUser(params: CreateUserParams) {
		const existingUser = await this.findUser({ username: params.username });
		if (existingUser) throw new UserFoundException();
		params.password = await hashPassword(params.password);
		const newUser = this.userRepository.create(params);
		return this.userRepository.save(newUser);
	}
}