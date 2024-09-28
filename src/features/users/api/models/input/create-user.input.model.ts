import { IsString } from "class-validator";

export class UserCreateModel {
    @IsString({message: 'Должно быть строкой'})
    login: string;
    email: string;
    password: string;
}

export class EmailConfirmationModel {
    confirmationCode?: string
    expirationDate?: string
    isConfirmed: boolean
}
