import { Body, Controller, Delete, Get, HttpCode, InternalServerErrorException, Param, Patch, Post, Put, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ChangePasswordDto } from './dto/changePwd.dto';
import { CustomerSecurityService } from './customerSecurity.service';
import { CustomerProfileService } from './customerProfile.service';
import { CURRENCY_TYPE } from '@prisma/client';
import { Request, Response } from 'express';
import { CustomerKYCService } from './customerKyc.service';
import { CustomerKycDto } from './dto/customer.kyc.response.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../pipes/FileValidation.pipe';
import { CustomerKyc } from './dto/сustomer.kyc.request.dto';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { CacheInterceptor } from '@nestjs/cache-manager';
import * as fs from "node:fs"
import { OnlyAdminGuard } from '../guards/admin.guard';

@Controller('customer')
@UseInterceptors(CacheInterceptor)
export class CustomerController {

  constructor(
    private readonly securityService: CustomerSecurityService,
    private readonly profileService: CustomerProfileService,
    private readonly kycService: CustomerKYCService,
    private readonly configService: ConfigService
  ) {}

  // ###############################################################################################
  // ################################### profile bio area ##########################################
  // ###############################################################################################

  // @UseGuards(JwtAuthGuard)
  // @Get('dashboard')
  // async getDashboard(@Req() req: Request) {
  //   console.log({user: req.user})
  //   return "profile";
  // }


  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id/')
  @HttpCode(200)
  async getProfile(@Param('id') id: number) {
    return this.profileService.getProfile(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/update_profile/name/:name/')
  @HttpCode(202)
  async updateProfileName(
    @Req() req: Request,
    @Param("name") name: string) {
    return this.profileService.updateName(req["customer"].customerId, name);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/update_profile/avatar/:link/')
  @HttpCode(202)
  async updateProfileAvatar(
    @Req() req: Request,
    @Param("link") link: string) {
    return this.profileService.updateAvatar(req["customer"].customerId, link);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/update_profile/currency/:currency/')
  @HttpCode(202)
  async updateProfileCurrency(
    @Req() req: Request,
    @Param("currency") currency: CURRENCY_TYPE) {
    return this.profileService.updateCurrency(req["customer"].customerId, currency);
  }

  // ###############################################################################################
  // #################################### security area ############################################
  // ###############################################################################################

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/get_security/')
  @HttpCode(200)
  async getSecurityData(@Req() req: Request) {
    return this.securityService.getSecurity(req["customer"].customerId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('/change_pwd/')
  @HttpCode(202)
  async changePassword(@Body() dto: ChangePasswordDto) {
    return this.securityService.changePassword(dto);
  }

  // ###############################################################################################
  // ######################################## kyc area #############################################
  // ###############################################################################################

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor("documents", 3, 
    {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let folderPath =`${process.env.DOCUMENTS_PATH}/customerId_${req["customer"].customerId}`
          fs.mkdir(folderPath, (e) => {
            if(e) {
              if(e.code === "EEXIST") return
              else throw new InternalServerErrorException("Got an error at interceptor: ", e.message)
            }
          });
          cb(null, folderPath);
        },
        filename: async (req, file, cb) => {
          try {
            const fileName = file.originalname; //`${req["customer"].customerId}_${file.fieldname}_${file.originalname}`;
            cb(null, fileName);
          } catch(e) {
            throw new InternalServerErrorException("Got an error at interceptor: ", e.message)
          }
        },
      }),
      limits: {
        fileSize: 5_000_000
      },
    }
  ))
  @Post('/kyc/create/')
  @HttpCode(201)
  async createCustomerKyc(
    @Req() req: Request,
    @Body() dto: CustomerKyc,
    @UploadedFiles(new FileValidationPipe()) files: Array<Express.Multer.File> ) {
      await this.kycService.setKYC(req["customer"].customerId, dto, files);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/kyc/get/')
  @HttpCode(200)
  async getKyc(@Req() req: Request) {
    return this.kycService.getKYC(req["customer"].customerId);
  }

  @UseGuards(OnlyAdminGuard)
  @Get('/kyc/get_docs/')
  @HttpCode(200)
  async getDocuments(@Req() req: Request, @Res() res: Response) {
    let files: string[] = await this.kycService.getDocuments(req["customer"].customerId);
    for (let file of files) res.sendFile(file)
    res.end()
  }

  @UseGuards(OnlyAdminGuard)
  @Delete('/kyc/delete/')
  @HttpCode(200)
  async deleteKyc(@Req() req: Request) {
    return this.kycService.deleteKYC(req["customer"].customerId);
  }

  

}
