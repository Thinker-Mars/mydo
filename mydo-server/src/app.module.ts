import { Module } from '@nestjs/common';
import { CalendarController, CalendarService } from './calendar';
import { SubjectController, SubjectService } from './subject';

@Module({
  imports: [],
  controllers: [CalendarController, SubjectController],
  providers: [CalendarService, SubjectService],
})

export class AppModule {}
