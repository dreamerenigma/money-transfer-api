import { User } from "../typeorm";

export enum Routes {
	AUTH = 'auth',
	ONBOARDING = 'onboarding',
	USERS = 'users',
	STRIPE = 'stripe',
}

export enum Services {
	AUTH = 'AUTH_SERVICE',
	ONBOARDING = 'ONBOARDING_SERVICE',
	USERS = 'USERS_SERVICE',
	STRIPE_CLIENT = 'STRIPE_CLIENT',
	STRIPE = 'STRIPE_SERVICE',
}

export const findUserSelectors: (keyof User)[] = [
	'firstName',
	'lastName',
	'id',
	'username',
	'createdAt',
	'stripeAccount',
];

export const getUserSelectors = (selectPassword?: boolean): (keyof User)[] =>
selectPassword ? [...findUserSelectors, 'password'] : findUserSelectors;
