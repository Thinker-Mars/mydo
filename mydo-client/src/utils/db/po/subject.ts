import type { TableType } from './type';

const Subject: TableType = {
	columns: {
		id: {
			remark: '主题id',
			unique: true,
		},
		subjectName: {
			remark: '主题名称',
			unique: false
		},
		createTime: {
			remark: '主题创建时间（ms）',
			unique: false
		},
		todoList: {
			remark: '主题下todo的id',
			unique: false
		},
		parentSubjectId: {
			remark: '父级主题的id',
			unique: false
		},
		parentTodoId: {
			remark: '父级todo的id',
			unique: false
		}
	},
	keyPath: 'id',
	autoIncrement: true
}

export {
	Subject
}