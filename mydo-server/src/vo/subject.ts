class Subject {
	/**
	 * 主题id
	 */
	id: number;
	/***
	 * 主题名称
	 */
	subjectName: string;
	/**
	 * 主题创建时间（ms）
	 */
	createTime: number;
	/**
	 * 主题下todo的id
	 */
	todoList?: string[];
	/**
	 * 父级主题的id
	 */
	parentSubjectId?: number;
	/**
	 * 父级todo的id
	 */
	parentTodoId?: number;
}

export {
	Subject
};