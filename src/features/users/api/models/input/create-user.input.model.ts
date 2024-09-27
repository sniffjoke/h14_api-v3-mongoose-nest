export class UserCreateModel {
    login: string;
    email: string;
    password: string;
}

export class EmailConfirmationModel {
    confirmationCode?: string
    expirationDate?: string
    isConfirmed: boolean
}
