import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators";
import { Request, Response } from 'express';
import { IStripeService } from "src/stripe/stripe";
import { Routes, Services } from "src/utils/constants";

@Controller(Routes.ONBOARDING)
export class OnboardingController {
	constructor(
		@Inject(Services.STRIPE) private readonly stripeService: IStripeService,
	) {}

	@Get('redirect')
	redirect(@Req() req: Request, @Res() res: Response) {
		console.log('redirect');
		res.send(200);
	}

	@Post()
	onboarding() {
		return this.stripeService.createAccountLink();
	}
}
