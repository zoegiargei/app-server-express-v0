import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

//NODE_ENV es convencion para definir en que entorno estamos
//NODE_ENV CAN BE:
// dev
// test
// prod

program
    .option('PERSISTENCE <persistence>', 'metodo de persistencia de datos', 'MONGO')
    .option('NODE_ENV <environment>', 'entorno en el que queremos correr el programa', 'dev')
    .option('PORT <port>', 'puerto del servidor', 8080)
    .option('MONGO_CNX_STR <url>', 'URL de conexion a la base de datos', '')
    .option('JWT_PRIVATE_KEY <key>', 'private key para autenticacion con JWT')
    .option('SECRET_WORD <secret>', 'Palabra secreta para firmar cookies')
program.parse();

dotenv.config({
    path: 
        process.env.NODE_ENV === 'prod'
        ? '.env'
        : '.env'
})

export default {
    PERSISTENCE: process.env.PERSISTENCE,
    PORT: process.env.PORT,
    MONGO_CNX_STR: process.env.MONGO_CNX_STR,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    SECRET_WORD: process.env.SECRET_WORD,
}

