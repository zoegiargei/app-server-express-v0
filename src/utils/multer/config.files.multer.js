import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

class ConfigMulter{
    constructor(destination){
        this.storage = multer.diskStorage({
            destination,
            filename: (req, file, cb) => {
                const newName = `${uuidv4()}-${file.originalname}`
                cb(null, newName)
            }
        })
    }

    configUpload(){
        const upload = multer({
           storage: this.storage,
           fileFilter: function (req, file, cb) {
               
               const filetypes = /jpeg|jpg|png|gif/;
               const mimetype = filetypes.test(file.mimetype);
               const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
       
               if (mimetype && extname) {
                   return cb(null, true);
               }
       
               cb("Error: File upload only supports the following filetypes - " + filetypes);
           },
           limits: { fileSize: 1000000 }
       })

       return upload
    }
};

export default ConfigMulter;
