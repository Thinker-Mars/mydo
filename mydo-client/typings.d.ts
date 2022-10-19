declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare type SubjectType = {
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

declare type TodoType = {
	/**
	 * todo的id
	 */
	id?: number;
	/**
	 * todo的内容
	 */
	content: string;
}
