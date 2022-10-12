const Subject = {
	columns: {
		Id: {
			remark: '主题id',
			unique: true
		},
		SubjectName: {
			remark: '主题名称',
			unique: false
		},
		CreateTime: {
			remark: '主题创建时间（ms）',
			unique: false
		},
		TodoList: {
			remark: '主题下todo的id',
			unique: false
		},
		ParentSubjectId: {
			remark: '父级主题的id',
			unique: false
		},
		ParentTodoId: {
			remark: '父级todo的id',
			unique: false
		}
	},
	keyPath: 'Id'
}

export {
	Subject
}