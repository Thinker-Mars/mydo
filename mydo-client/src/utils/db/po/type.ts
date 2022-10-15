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
	id?: number;
	content: string;
}