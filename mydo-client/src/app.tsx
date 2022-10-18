import { history } from 'umi';
import { initDB } from '@/utils';

export const render = async (oldRender: any) => {
	if (location.pathname === '/') { 
		history.push('/calendar');
	}
	await initDB();
	oldRender();
}