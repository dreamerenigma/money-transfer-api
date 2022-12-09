import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUserService } from "src/user/user";
import { UserModule } from "src/user/user.module";
import { Services } from "src/utils/constants";
import { compareHash } from "src/utils/helpers";
import { User } from "src/utils/typeorm";
import { 
	CreateUserParams, 
	UserCredentialsParams,
} from "src/utils/types/queries";
import { IAuthService } from "./auth";

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@Inject(Services.USERS) private readonly userService: IUserService,
	) {}
	async validateUser(params: UserCredentialsParams) {
		const user = await this.userService.findUser(
			{ username: params.username },
			{ selectPassword: true },
		);
		console.log(user);
		const isPasswordValid = await compareHash(params.password, user.password);
		if (!isPasswordValid)
			throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
		return user;
	}
	registerUser(params: CreateUserParams): Promise<User> {
		return this.userService.createUser(params);
	}
}
