import { Injectable } from '@nestjs/common';

@Injectable()
class CalendarService {
  getHello(): string {
    return 'calendar!';
  }
}

export {
	CalendarService
};
