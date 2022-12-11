import { Module } from "@nestjs/common";
import { Services } from "../utils/constants";
import { Stripe } from "stripe";
import { StripeService } from "./stripe.service";

@Module({
	providers: [
		{
			provide: Services.STRIPE_CLIENT,
			useValue: new Stripe(process.env.STRIPE_SECRET_KEY, {
				apiVersion: '2022-11-15',
			}),
		},
		{
			provide: Services.STRIPE,
			useClass: StripeService,
		},
	],
	exports: [
		{
			provide: Services.STRIPE,
			useClass: StripeService,
		},
	],
})
export class StripeModule {}
