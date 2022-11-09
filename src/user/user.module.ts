import { Module } from "@nestjs/common";
import { Services } from "src/utils/constants";
import { UserService } from "./user.service";

@Module({
	imports: [], 
	controllers: [], 
	providers: [
		{
			provide: Services.USERS,
			useClass: UserService,
		},
	],
})
export class UserModule { }