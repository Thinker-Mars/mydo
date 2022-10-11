import { Controller, Body, Post } from '@nestjs/common';
import { SubjectService } from './service';
import { Subject } from '../vo';

@Controller('subject')
class SubjectController {
	constructor(private readonly subjectService: SubjectService) { }
	
	/**
	 * 创建主题
	 */
	@Post('create')
  createSubject(@Body() subject: Subject): string {
    return this.subjectService.createSubject(subject);
  }
}

export {
	SubjectController
};