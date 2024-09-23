import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./application/auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/domain/users.entity";
import { UsersRepository } from "../users/infrastructure/users.repository";
import { TokensService } from "../tokens/application/tokens.service";
import { TokenEntity, TokenSchema } from "../tokens/domain/tokens.entity";
import { JwtService } from "@nestjs/jwt";
import { TokensModule } from "../tokens/tokens.module";
import { UsersService } from "../users/application/users.service";
import { UuidModule } from "nestjs-uuid";
import { UsersQueryRepository } from "../users/infrastructure/users.query-repository";

@Module({
  imports: [
    UuidModule,
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema,
    }]),
    MongooseModule.forFeature([{
      name: TokenEntity.name,
      schema: TokenSchema,
    }]),
    TokensModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    TokensService,
    JwtService,
    UsersService,
    UsersQueryRepository
  ],
})
export class AuthModule {
}
