import { Inject, Injectable } from "@nestjs/common"
import Stripe from "stripe";
import { Services } from "../utils/constants";
import { IStripeService } from "./stripe";

@Injectable()
export class StripeService implements IStripeService {
	constructor(
		@Inject(Services.STRIPE_CLIENT)
		private readonly stripe: Stripe,
	) {}

	createAccount() {
		return this.stripe.accounts.create({
			type: 'express',
			country: 'US',
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
		});
	}

	createAccountLink() {
		return this.stripe.accountLinks.create({
			account: 'acct_1MDmgV4IwVB9Hhhr',
			refresh_url: process.env.STRIPE_CONNECT_REFRESH_URI,
			return_url: process.env.STRIPE_CONNECT_RETURN_URI,
			type: 'account_onboarding',
		});
	}

	getAccount(stripeAccount: string) {
		return this.stripe.accounts.retrieve(stripeAccount);
	}

	chargeAccount(stripeAccount: string) {
		return this.stripe.paymentIntents.create(
			{
				amount: 1000,
				currency: 'usd',
				payment_method_types: ['card'],
				capture_method: 'automatic',
			},
			{
				stripeAccount,
			},
		);
	}
}
