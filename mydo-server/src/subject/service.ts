import { Injectable } from '@nestjs/common';
import { Subject } from '../vo';

@Injectable()
class SubjectService {
	/**
	 * 创建主题
	 */
	createSubject(subject: Subject): string {
		console.log(subject);
    return 'subject!';
  }
}

export {
	SubjectService
};
