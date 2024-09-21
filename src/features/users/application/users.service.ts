import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from "../infrastructure/users.repository";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../domain/users.entity";
import {UserCreateModel} from "../api/models/input/create-user.input.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly usersRepository: UsersRepository
    ) {
    }

    async createUser(user: UserCreateModel): Promise<string> {
        const newUser = new this.userModel(user)
        const saveData = await this.usersRepository.saveBlog(newUser)
        return saveData._id.toString()
    }

    async deleteUser(id: string) {
        const findedUser = await this.userModel.findById(id)
        if (!findedUser) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        const deleteUser = await this.userModel.deleteOne({_id: id})
        return deleteUser
    }

}
