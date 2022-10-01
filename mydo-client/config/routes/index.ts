import calendarRoutes from './calendar';
import collectionRoutes from './collection';
import subjectMangerRoutes from './subjectManger';

const routes = [
	{
		path: '/',
		component: '@/layout',
		routes: [
			...calendarRoutes,
			...subjectMangerRoutes,
			...collectionRoutes
		]
	}
]

export default routes;