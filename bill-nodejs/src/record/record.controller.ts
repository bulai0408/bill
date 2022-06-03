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

  @Get('list')
  async list() {
    const data = await this.recordService.getRecords();
    return {
      code: 0,
      data,
    };
  }

  @Post('create')
  create(@Body() requestData: { name: string; type: number; price: number }) {
    return this.recordService.createRecord(requestData);
  }

  @Put('/:id')
  update(
    @Param() paramsData: { id: string },
    @Body() requestData: { name: string; type: number; price: number },
  ) {
    const { id } = paramsData;
    if (judgeIsNaN(id)) {
      return null;
    }
    return this.recordService.updateRecord({
      id: Number(id),
      ...requestData,
    });
  }

  @Delete('/:id')
  delete(@Param() paramsData: { id: string }) {
    const { id } = paramsData;
    if (judgeIsNaN(id)) {
      return null;
    }
    return this.recordService.deleteRecord({
      id: Number(id),
    });
  }
}
