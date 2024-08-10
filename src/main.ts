import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config';
// import { HttpExceptionFilter } from './base/utils/exception.filter';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';
import { applyAppSettings } from './settings/apply-app-settings';
import { appSettings } from './settings/app-settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   applyAppSettings(app);

   
  //const configService = app.get(ConfigService);
  app.enableCors();
  app.use(cookieParser());

   await app.listen(appSettings.api.PORT, () => {
     console.log('App starting listen port: ', appSettings.api.PORT);
     console.log('ENV: ', appSettings.env.getEnv());
   });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     stopAtFirstError: true,
  //     transform: true,
  //     exceptionFactory: (errors) => {
  //       const errorsForResponse = [];
  //       errors.forEach((e) => {
  //         const constrainsKeys = Object.keys(e.constraints);
  //         constrainsKeys.forEach((key) => {
  //           errorsForResponse.push({
  //             message: e.constraints[key],
  //             field: e.property,
  //           });
  //         });
  //       });

  //       throw new BadRequestException(errorsForResponse);
  //     },
  //   }),
  // );
  // app.useGlobalFilters(new HttpExceptionFilter());
  //  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //await app.listen(configService.get('PORT'));
}
bootstrap();


