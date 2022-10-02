export type SubjectProps = {

}

export type SubjectInstance = {
	/**
	 * 新建主题
	 */
	addSubject: () => void;
	/**
	 * 编辑主题
	 */
	modifySubject: (subjectId: number) => void;
}