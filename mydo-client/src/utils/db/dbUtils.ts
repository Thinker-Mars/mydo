import { getLogger } from '../logger';
import { DatabaseName, DBVersionIdentify, TableList } from './constants';
import * as Tables from './po';
import type { TablesType } from './po/type';

const logger = getLogger();

/**
 * 获取db版本
 * 
 * 如果用户第一次使用则返回1
 */
 const getLocalDBVersion = () => {
  const dbVersion = Number(localStorage.getItem(DBVersionIdentify));
  if (dbVersion > 0) {
    return dbVersion;
  }
  return 1;
}

/**
 * 获取数据库对象
 */
const getDB = () => {
	const version = getLocalDBVersion();
	return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DatabaseName, version);
    request.onsuccess = function(e: Event) {
      const db = (e.target as any).result as IDBDatabase;
      resolve(db);
    };
		request.onerror = function (e: Event) {
			const error = (e.target as any).error;
			reject(error);
		};
  });
}

/**
 * 更新localStorage中的数据库版本
 */
const updateLocalDBVersion = (dbVersion: number) => {
	localStorage.setItem(DBVersionIdentify, dbVersion as any);
}

/**
 * 删除 localStorage 中 dbversion 的值
 */
const removeLocalDBVersion = () => {
	localStorage.removeItem(DBVersionIdentify);
}

/**
 * 初始化数据库
 */
export const initDB = () => {
	return new Promise<void>((resolve, reject) => {
		const dbVersion = getLocalDBVersion();
		const request = window.indexedDB.open(DatabaseName, dbVersion);
		request.onupgradeneeded = (e) => {
			logger.info('init table');
			updateLocalDBVersion(dbVersion);
			const db = (e?.target as any)?.result;
			for (const tableName in TableList) {
				if (!db.objectStoreNames.contains(tableName)) {
					const table = (Tables as TablesType)[tableName];
					const optionalParameters = {} as any;
					if (table.keyPath) {
						optionalParameters['keyPath'] = table.keyPath;
					}
					if (table.autoIncrement) {
						optionalParameters['autoIncrement'] = table.autoIncrement;
					}
					const objectStore = db.createObjectStore(tableName, optionalParameters);
					for (const column in table.columns) {
						objectStore.createIndex(column, column, { unique: table.columns[column].unique });
					}
				}
			}
		}
		request.onsuccess = () => {
			resolve();
		}
	})
}

/**
 * 同步新增一条记录
 * @param db 数据库对象
 * @param tableName 表名称
 * @param data 要更新的记录
 * @param key 表的主键
 * @returns 更新的记录行的id
 */
const updateRecordSync = (db: IDBDatabase, tableName: string, data: any, key?: any): Promise<number> => {
	return new Promise((resolve, reject) => {
		const request = db.transaction(tableName, 'readwrite')
				.objectStore(tableName)
				.put(data, key);
		request.onsuccess = (e) => {
			const resultKey = (e.target as any)!.result;
			logger.info(`更新数据: ${JSON.stringify(data)}`);
			resolve(resultKey);
		}
		request.onerror = (e) => {
			const errorInfo = (e.target as any)!.error;
			reject(errorInfo);
		}
	});
}

/**
 * 批量更新记录
 * @param tableName 表名称
 * @param data 要更新的记录
 * @param keyPath 表的主键
 * @returns 更新记录的行id
 */
export const updateRecord = (tableName: string, data: any[], keyPath?: any): Promise<number[]> => {
	return new Promise((resolve, reject) => {
		try {
			getDB().then(async (db) => {
				const resultKeys: number[] = [];
				for (const record of data) {
					const resultKey = await updateRecordSync(db, tableName, record, record[keyPath]);
					resultKeys.push(resultKey);
				}
				db.close();
				resolve(resultKeys);
			})
		} catch (error) {
			reject(error);
		}
	})
}