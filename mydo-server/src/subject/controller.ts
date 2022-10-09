import { Controller, Get } from '@nestjs/common';
import { SubjectService } from './service';

@Controller('subject')
class SubjectController {
	constructor(private readonly subjectService: SubjectService) { }
	
	@Get()
  getHello(): string {
    return this.subjectService.getHello();
  }
}

export {
	SubjectController
};