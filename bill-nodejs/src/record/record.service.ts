import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async getRecords(): Promise<Record[]> {
    return this.prisma.record.findMany({
      include: {
        type: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createRecord(params: {
    name: string;
    typeId: number;
    price: number;
  }): Promise<Record> {
    const { name, typeId, price } = params;
    return await this.prisma.record.create({
      data: {
        name,
        price,
        typeId,
      },
    });
  }

  async updateRecord(params: {
    id: number;
    name: string;
    typeId: number;
    price: number;
  }): Promise<Record> {
    const { id, name, typeId, price } = params;
    return await this.prisma.record.update({
      where: { id },
      data: {
        name,
        price,
        typeId,
      },
    });
  }

  async deleteRecord(params: { id: number }): Promise<Record> {
    const { id } = params;
    return await this.prisma.record.delete({
      where: { id },
    });
  }

  async createType(params: { name: string; belong: number }) {
    return await this.prisma.type.create({
      data: params,
    });
  }

  async getTypes() {
    return await this.prisma.type.findMany();
  }
}
