export class LoginDto {
  loginOrEmail: string;
  password: string;
}

export class ActivateAccountDto {
  code: string
}

export class ResendActivateCodeDto {
  email: string
}

export class PasswordRecoveryDto {
  email: string
}
