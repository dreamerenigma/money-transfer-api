import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stripe-accounts' })
export class StripeAccount {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'stripe_id' })
	stripeId: string;
}