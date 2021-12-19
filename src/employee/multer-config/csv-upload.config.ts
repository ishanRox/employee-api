import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path/posix";
import 'dotenv/config';

export const multerCsvConfig ={
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.originalname.match(/.*\.(csv)$/)) {
            // Allow storage of file 
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)} ! CSV file needed`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
      destination:process.env.DESTINATION_CSV
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  };