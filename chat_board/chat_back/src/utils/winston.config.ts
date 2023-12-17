import { utilities, WinstonModule } from "nest-winston";
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as moment from 'moment-timezone';

const appendTimestamp = winston.format((info, opts) => {
    if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format();
    }
    return info;
});
const env = process.env.NODE_ENV
//로그 저장 파일 옵션
const dailyOptins = {
    level: 'http',//http보다 높은 단계의 로그만 기록
    dataPattern: 'YYYY-MM-DD', //날짜 포멧 지정
    dirname: __dirname + '/../../../logs', //저장할 URL
    filename: 'app.log.%DATE%',
    maxFiles: 30, //30일 저장
    zippedArchive: true, //로그가 쌓였을때 압축
    colorize: false,
    handleExceptions: true,
    json: false,
};

export const winstonLogger = WinstonModule.createLogger({
    transports: [
        //콘솔 출력 옵션지정
        new winston.transports.Console({
            level: env === 'production' ? 'http' : 'silly',
            format:
                env === 'production'
                    ? winston.format.simple()
                    : winston.format.combine(
                        winston.format.timestamp(),
                        utilities.format.nestLike('NestJs Project', {
                            prettyPrint: true,
                        })
                    )

        }),

        new winstonDaily(dailyOptins),
    ],
    format: winston.format.combine(
        appendTimestamp({ tz: 'Asia/Seoul' }),
        winston.format.json(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level} [${process.pid}: ${info.message}]`
        })
    )
})