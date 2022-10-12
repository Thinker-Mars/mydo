const Todo = {
	columns: {
		Id: {
			remark: 'todo的id',
			unique: true
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