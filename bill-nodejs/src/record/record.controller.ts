import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RecordService } from 'src/record/record.service';

const judgeIsNaN = (id: number | string) => !id || isNaN(Number(id));

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('')
  async list() {
    const data = await this.recordService.getRecords();
    return {
      code: 0,
      data,
    };
  }

  @Post('')
  async create(
    @Body()
    requestData: {
      name: string;
      typeId: number;
      price: number;
    },
  ) {
    const data = await this.recordService.createRecord(requestData);
    return {
      data,
      code: 0,
    };
  }

  @Put('/:id')
  async update(
    @Param() paramsData: { id: string },
    @Body()
    requestData: { name: string; typeId: number; price: number },
  ) {
    const { id } = paramsData;
    if (judgeIsNaN(id)) {
      return {
        code: 1,
        data: null,
      };
    }
    const data = await this.recordService.updateRecord({
      id: Number(id),
      ...requestData,
    });
    return {
      code: 0,
      data,
    };
  }

  @Delete('/:id')
  async delete(@Param() paramsData: { id: string }) {
    const { id } = paramsData;
    if (judgeIsNaN(id)) {
      return {
        code: 1,
        data: null,
      };
    }
    const data = await this.recordService.deleteRecord({
      id: Number(id),
    });
    return {
      code: 0,
      data,
    };
  }

  @Post('type')
  async createType(@Body() requestData: { name: string; belong: number }) {
    const data = await this.recordService.createType(requestData);
    return {
      code: 0,
      data,
    };
  }

  @Get('type')
  async getTypeList() {
    const data = await this.recordService.getTypes();
    return {
      code: 0,
      data,
    };
  }
}
