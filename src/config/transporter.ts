import { ConfigModule } from '@nestjs/config';
import {createTransport} from "nodemailer"
//ConfigModule.forRoot()
//npm i nodemailer
export const transporter=createTransport({
   service: 'gmail',
    auth:{
        user:"jobsmatch23@gmail.com",
        pass:"hgvhfyooardqcrha",
    }, 
})

/*
//EJEMPLO para enviar email
await transporter.sendMail({
        to:result.email,
        from:"jobsmatch23@gmail.com",
        subject:"confirme su email",
        html:""
        )}
 */

/*
    host:"smtp.gmail.com",
    port:"465",
    secure:true,
 */