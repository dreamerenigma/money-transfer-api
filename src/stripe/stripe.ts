export interface IStripeService {
	createAccountLink();
	createAccount();
	getAccount(id: string);
	chargeAccount(id: string);
}