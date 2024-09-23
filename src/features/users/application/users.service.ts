import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from "../infrastructure/users.repository";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../domain/users.entity";
import { EmailConfirmationModel, UserCreateModel } from "../api/models/input/create-user.input.model";
import { UuidService } from "nestjs-uuid";
import { add } from 'date-fns'
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly uuidService: UuidService,
        private readonly usersRepository: UsersRepository,
        private readonly mailService: MailerService
    ) {
    }

    async createUser(user: UserCreateModel, isConfirm: boolean): Promise<string> {
        const emailConfirmation: EmailConfirmationModel = this.createEmailConfirmation(isConfirm)
        if (!isConfirm) {
            await this.sendActivationEmail(user.email, emailConfirmation.confirmationCode as string)
        }
        const newUser = new this.userModel({...user, emailConfirmation})
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

    private createEmailConfirmation(isConfirm: boolean) {
        const emailConfirmationNotConfirm: EmailConfirmationModel = {
            isConfirmed: false,
            confirmationCode: this.uuidService.generate(),
            expirationDate: add(new Date(), {
                  hours: 1,
                  minutes: 30,
              }
            ).toString()
        }
        const emailConfirmationIsConfirm: EmailConfirmationModel = {
            isConfirmed: true,
        }
        return isConfirm ? emailConfirmationIsConfirm : emailConfirmationNotConfirm
    }

    private async sendActivationEmail(to: string, link: string) {
        await this.mailService.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
              `
                <h1>Thank for your registration</h1>
                <p>To finish registration please follow the link below:
                    <a href='${link}'>Завершить регистрацию</a>
                </p>

            `
        })
    }

}
