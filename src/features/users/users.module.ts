import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./api/users.controller";
import { UsersService } from "./application/users.service";
import { UsersRepository } from "./infrastructure/users.repository";
import { UsersQueryRepository } from "./infrastructure/users.query-repository";
import { User, UserSchema } from "./domain/users.entity";
import { UuidModule } from "nestjs-uuid";

@Module({
  imports: [
    UuidModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository
  ]
})
export class UsersModule {
}
