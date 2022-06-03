import { NestFactory } from '@nestjs/core';

import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3001);
}
bootstrap();
