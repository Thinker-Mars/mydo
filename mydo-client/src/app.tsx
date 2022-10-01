import { history } from 'umi';

export const render = (oldRender: any) => {
	if (location.pathname === '/') { 
		history.push('/calendar');
	}
	oldRender();
}