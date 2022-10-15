export type TableType = {
	/**
	 * 表中的列
	 */
	columns: Record<string, {
		/**
		 * 注释
		 */
		remark?: string;
		/**
		 * 是否唯一
		 */
		unique?: boolean;
	}>;
	/**
	 * 主键
	 */
	keyPath?: string | string[];
	/**
	 * 自增
	 */
	autoIncrement?: boolean;
}

export type TablesType = Record<string, TableType>;

export type TodoType = {
	/**
	 * todo的id
	 */
	id?: number;
	/**
	 * todo的内容
	 */
	content: string;
}

export type SubjectType = {
	/**
	 * 主题的id
	 */
	id?: number;
	/**
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
	todoList?: number[];
	/**
	 * 父级主题的id
	 */
	parentSubjectId?: number;
	/**
	 * 父级todo的id
	 */
	parentTodoId?: number;
}