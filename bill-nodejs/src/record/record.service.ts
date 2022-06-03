import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async getRecords(): Promise<Record[]> {
    return this.prisma.record.findMany();
  }

  async createRecord(params: {
    name: string;
    type: number;
    price: number;
  }): Promise<Record> {
    const { name, type, price } = params;
    return await this.prisma.record.create({
      data: {
        name,
        type,
        price,
      },
    });
  }

  async updateRecord(params: {
    id: number;
    name: string;
    type: number;
    price: number;
  }): Promise<Record> {
    const { id, name, type, price } = params;
    return await this.prisma.record.update({
      where: { id },
      data: {
        name,
        type,
        price,
      },
    });
  }

  async deleteRecord(params: { id: number }): Promise<Record> {
    const { id } = params;
    return await this.prisma.record.delete({
      where: { id },
    });
  }
}
