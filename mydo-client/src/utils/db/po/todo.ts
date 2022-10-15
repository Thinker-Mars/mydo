import type { TableType } from './type';

const Todo: TableType = {
	columns: {
		Id: {
			remark: 'todo的id',
			unique: true,
		},
		Content: {
			remark: 'todo内容',
			unique: false
		}
	},
	keyPath: 'Id'
}

export {
	Todo
}