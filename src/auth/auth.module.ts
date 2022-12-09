import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { Services } from "src/utils/constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SessionSeriaizer } from "./dtos/SesssionSerializer";
import { LocalStrategy } from "./utils/LocalStrategy";

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [
		{
			provide: Services.AUTH,
			useClass: AuthService,
		},
		SessionSeriaizer,
		LocalStrategy,
	],
})
export class AuthModule {}
