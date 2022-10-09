import { Injectable } from '@nestjs/common';

@Injectable()
class SubjectService {
  getHello(): string {
    return 'subject!';
  }
}

export {
	SubjectService
};
