import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors-ts";
import {SETTINGS} from "./infrastructure/settings/settings";
// import {NotFoundExceptionFilter} from "./infrastructure/common/exception-filters/not-found-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });
  // app.setGlobalPrefix('api')
  // app.useGlobalFilters(new NotFoundExceptionFilter())
  app.use(cors({
    // credentials: true,
  }))
  await app.listen(SETTINGS.PORT, () => console.log('DB connect'));
  // app.use(cookieParser())
}
bootstrap();
