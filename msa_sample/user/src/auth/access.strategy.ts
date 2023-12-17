// import { PassportStrategy } from "@nestjs/passport"
// import { Strategy, ExtractJwt } from 'passport-jwt'

// export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
//     constructor() {
//         super({
//             jwtFromRequset: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: '123',
//         });
//     }

//     validate(payload) {
//         console.log(payload);
//         return {
//             id: payload.id,
//             name: payload.name,
//             index: payload.index

//         }
//     }
// }