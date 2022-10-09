import { Controller, Get } from '@nestjs/common';
import { CalendarService } from './service';

@Controller('calendar')
class CalendarController {
	constructor(private readonly calendarService: CalendarService) { }
	
	@Get()
  getHello(): string {
    return this.calendarService.getHello();
  }
}

export { 
	CalendarController
}
