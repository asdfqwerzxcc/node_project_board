// import { PassportStrategy } from "@nestjs/passport";
// import {Strategy, ExtractJwt} from 'passport-jwt'
// export class JwtRefrshStrategy extends PassportStrategy(Strategy,'access'){
//     constructor(){
//         super({
//             jwtFromRequest:(req)=>{
//                 const cookie=req.cookies['refreshToken'];
//                 return cookie;
//             },
//             secretOrKey: '123'
//         });
//     }    
//     validate(payload){
//         console.log(payload);
//         return{
//             id:payload.id
//         }
//     }
// }
