export type UserCreateModel = {
    login: string;
    email: string;
    password: string;
}

export type EmailConfirmationModel = {
    confirmationCode?: string
    expirationDate?: string
    isConfirmed: boolean
}
