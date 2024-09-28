import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { Request, Response } from "express";
import { UserCreateModel } from "../../users/api/models/input/create-user.input.model";
import { UsersService } from "../../users/application/users.service";
import { UsersQueryRepository } from "../../users/infrastructure/users.query-repository";
import {
  ActivateAccountDto,
  LoginDto,
  PasswordRecoveryDto,
  ResendActivateCodeDto
} from "./models/input/auth.input.model";
import { AuthOutputModel, RecoveryPasswordModel } from "./models/output/auth.output.model";
import { ValidationPipe } from "../../../infrastructure/pipes/validation.pipe";
import { JwtAuthGuard } from "../../../infrastructure/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersQueryRepository: UsersQueryRepository
  ) {
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    const userData = await this.authService.getMe(req.headers.authorization as string);
    return userData;
  }

  @UsePipes(ValidationPipe)
  @Post("login")
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthOutputModel> {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return {
      accessToken
    };
  }

  @Post("registration")
  @HttpCode(204)
  async register(@Body() dto: UserCreateModel, @Res({ passthrough: true }) res: Response) {
    const userId = await this.usersService.createUser(dto, false)
    const newUser = await this.usersQueryRepository.userOutput(userId)
    // res.status(204).send('Письмо с активацией отправлено')
    return 'Письмо с активацией отправлено'
  }

  @Post("registration-confirmation")
  @HttpCode(204)
  async activateEmail(@Body() dto: ActivateAccountDto) {
    return await this.usersService.activateEmail(dto.code)
  }

  @Post("registration-email-resending")
  @HttpCode(204)
  async resendEmail(@Body() dto: ResendActivateCodeDto) {
    return await this.usersService.resendEmail(dto.email)
  }

  @Post("password-recovery")
  @HttpCode(204)
  async passwordRecovery(@Body() dto: PasswordRecoveryDto) {
    return await this.usersService.passwordRecovery(dto.email)
  }

  @Post("new-password")
  async newPasswordApprove(@Body() recoveryPasswordData: RecoveryPasswordModel) {
    return await this.usersService.approveNewPassword(recoveryPasswordData)
  }

}
