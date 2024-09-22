import dotenv from 'dotenv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';

export class AppConfig {
  constructor() {
    dotenv.config();
  }

  static create() {
    return new AppConfig();
  }

  static configure() {
    return AppConfig.create().configDayjs();
  }

  configDayjs() {
    dayjs.extend(utc);
    dayjs.extend(isoWeek);
    dayjs.extend(timezone);
    dayjs.extend(isLeapYear);
    dayjs.extend(objectSupport);
    dayjs.extend(customParseFormat);
    dayjs.locale('pt-br');
    dayjs.tz.setDefault('America/Sao_Paulo');
  }
}
