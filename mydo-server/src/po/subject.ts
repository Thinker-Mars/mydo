export class Subject {
	/**
	 * 主题id
	 */
	private id: string;
	/***
	 * 主题名称
	 */
	private subjectName: string;
	/**
	 * 主题创建时间（ms）
	 */
	private createTime: number;
	/**
	 * 主题下todo的id
	 */
	private todoIds?: string[];
	/**
	 * 父级主题的id
	 */
	private parentSubjectId?: string;
	/**
	 * 父级todo的id
	 */
	private parentTodoId?: string;
}