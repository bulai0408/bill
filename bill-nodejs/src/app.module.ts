import { Module } from '@nestjs/common';

import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService, PrismaService],
})
export class AppModule {}
