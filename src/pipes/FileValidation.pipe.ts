import { ArgumentMetadata, Injectable, PipeTransform, PreconditionFailedException, UnsupportedMediaTypeException } from "@nestjs/common";

@Injectable()
export class FileValidationPipe implements PipeTransform {

  private readonly AVAILABLE_FILE_TYPES: string[] = ['jpeg','jpg','pdf','png']

  async transform(value: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
    await this.validateFileType(value);
    await this.validateFileSize(value);

    return value
  }

  private async validateFileType(filesList: Array<Express.Multer.File>): Promise<void> {
    let isValid: boolean = false

    for (let i = 0; i < filesList.length; i++) {
      let type = filesList[i].mimetype.split("/")[1]
      for (let j: number = 0; j < this.AVAILABLE_FILE_TYPES.length; j++) {
        if (type.trim().toLowerCase() === this.AVAILABLE_FILE_TYPES[j]) isValid = true
      }
    }

    if(!isValid) throw new UnsupportedMediaTypeException("Got a wrong file type. Supported types are: jpeg, jpg, pdf, png");
  }

  private async validateFileSize(filesList: Array<Express.Multer.File>): Promise<void> {
    let maxSize: number = 5_000_000;

    for (let i = 0; i < filesList.length; i++) {
      if(filesList[i].size <= maxSize) continue;
      else throw new PreconditionFailedException("File size is to large. Max size is 5MB.") 
    }
  }
}