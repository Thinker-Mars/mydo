import type { TableType } from './type';

const Todo: TableType = {
	columns: {
		id: {
			remark: 'todo的id',
			unique: true,
		},
		content: {
			remark: 'todo内容',
			unique: false
		}
	},
	autoIncrement: true,
	keyPath: 'id'
}

export {
	Todo
}