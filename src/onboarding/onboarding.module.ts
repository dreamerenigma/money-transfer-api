import { Module } from '@nestjs/common';
import { StripeModule } from '../stripe/stripe.module';
import { OnboardingController } from './onboarding.controller';

@Module({
	imports: [StripeModule],
	controllers: [OnboardingController],
	providers: [],
})

export class OnboardingModule {}
