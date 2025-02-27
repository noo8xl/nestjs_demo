import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {SignUpRequestDto} from "./dtos/signUp.dto";
import { SignInRequestDto } from './dtos/signIn.dto';
import { CustomerSecurityService } from '../customer/customerSecurity.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerSecurityService
  ){}

  
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post('/sign_up/local/')
  async signUpEmail(@Body() dto: SignUpRequestDto): Promise<void> {
    return this.authService.signupLocal(dto)
  }

  // // @UsePipes(new ValidationPipe())
  // @HttpCode(201)
  // @Post('/sign_up/google/')
  // async signUpGoogle(
  //   @Body('dto') dto: SignUpRequestDto) {
  //   return this.authService.signup(dto)
  // }

  // // @UsePipes(new ValidationPipe())
  // @HttpCode(201)
  // @Post('/sign_up/apple')
  // async signUpApple(
	// 	@Body('dto') dto: SignUpRequestDto) {
  //   return this.authService.signup(dto)
  // }

  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  @Patch('/activate/:link/')
  async activate(@Param("link") link: string): Promise<void> {
		await this.authService.activate(link)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/sign_in/local/')
  async login( 
    @Res() res: Response, 
    @Body() loginDto: SignInRequestDto
  ): Promise<void> {
			const token: string = await this.authService.login(loginDto)
      res.header('Authorization', `Bearer ${token}`).end()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(202)
  @Patch('/forgot_pwd/:email/')
  async forgotPassword(@Param('email') email: string ): Promise<void> {
    return this.customerService.forgotPassword(email)
  }

}
