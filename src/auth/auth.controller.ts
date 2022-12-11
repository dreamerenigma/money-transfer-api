import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { AuthUser } from "../utils/decorators";
import { User } from "../utils/typeorm";
import { Routes, Services } from "../utils/constants";
import { IAuthService } from "./auth";
import { RegisterUserDto } from "./dtos/RegisterUser.dto";
import { AuthenticatedGuard, LocalAuthGuard } from "./utils/Guards";

@Controller(Routes.AUTH)
export class AuthController {
	constructor(
		@Inject(Services.AUTH) private readonly authService: IAuthService,
	) {}

	@Post('register')
	async registerUser(@Body() registerUserPayload: RegisterUserDto) {
		return instanceToPlain(
			await this.authService.registerUser(registerUserPayload),
		);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login() {
		return 'OK';
	}

	@Get('status')
	@UseGuards(AuthenticatedGuard)
	status(@AuthUser() user: User) {
		return user;
	}
}
