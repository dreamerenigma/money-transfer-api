import { Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { AuthController } from "src/auth/auth.controller";
import { AuthenticatedGuard } from "src/auth/utils/Guards";
import { Routes, Services } from "src/utils/constants";
import { AuthUser } from "src/utils/decorators";
import { User } from "src/utils/typeorm";
import { IStripeService } from "./stripe";

@UseGuards(AuthenticatedGuard)
@Controller(Routes.STRIPE)
export class StripeController {
	constructor(
		@Inject(Services.STRIPE) private readonly stripeService: IStripeService,
	) {}

	@Post('accounts')
	createStripeAccount(@AuthUser() user: User) {
		return this.stripeService.createAccount();
	}

	@Get('accounts/:id')
	getStripeAccount(@Param('id') id: string) {
		return this.stripeService.getAccount(id);
	}

	@Post('charge/:id')
	chargeConnectAccount(@Param('id') id: string) {
		return this.stripeService.chargeAccount(id);
	}
}