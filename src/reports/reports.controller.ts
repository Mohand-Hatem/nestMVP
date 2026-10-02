import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { AuthGurad } from '../Guards/users.gurds';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Post()
  @UseGuards(AuthGurad)
  createReports(@Body() body: CreateReportDTO) {
    return this.reportService.create(body);
  }
}
