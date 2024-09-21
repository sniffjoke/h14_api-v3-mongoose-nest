import {Injectable} from "@nestjs/common";
import {HydratedDocument} from "mongoose";
import {User} from "../domain/users.entity";


@Injectable()
export class UsersRepository {
    constructor(
    ) {
    }

    async saveBlog(user: HydratedDocument<User>) {
        const saveUser = await user.save()
        return saveUser
    }

}
