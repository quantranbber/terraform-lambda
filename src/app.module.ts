import { AppConfigModule } from '@core/modules/app-config.module';
import { DbConfigModule } from '@core/modules/db-config.module';
import { ApiModule } from '@modules/api.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '@core/interceptors/logger-interceptor.service';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { JwtAuthGuard } from '@core/strategy/jwt-auth.guard';

@Module({
  imports: [AppConfigModule, DbConfigModule, ApiModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
