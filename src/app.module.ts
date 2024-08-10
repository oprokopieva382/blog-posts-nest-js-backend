import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { BlogModule } from './features/blogs/blog.module';
import { TestingModule } from './features/testing/testing.module';
import { AuthModule } from './features/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { appSettings, AppSettings } from './settings/app-settings';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const dbName = appSettings.env.isTesting()
          ? appSettings.api.DB_NAME_TEST
          : appSettings.api.DB_NAME;

        return {
          uri: appSettings.api.MONGO_DB_ATLAS,
          dbName: dbName,
        };
      },
    }),
    UserModule,
    BlogModule,
    AuthModule,
    TestingModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 5,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: AppSettings,
      useValue: appSettings,
    },
  ],
})
export class AppModule {}
