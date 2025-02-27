import { SignInRequestDto } from "./dtos/signIn.dto"
import { SignUpRequestDto } from "./dtos/signUp.dto"


export abstract class AuthI {
  abstract validate2faCode(code: string): Promise<void>;
  abstract signupLocal(dto: SignUpRequestDto): Promise<void>;
  abstract activate(link: string): Promise<void>;
  abstract login(dto: SignInRequestDto): Promise<string>;
  abstract issueTokenPair(payload: any): Promise<string>;
  abstract checkTwoStepStatus(email: string): Promise<void>;
}