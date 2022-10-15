import { getLogger } from '../logger';
import { DatabaseName, DBVersionIdentify, TableList } from './constants';
import * as Tables from './po';
import type { TablesType } from './po/type';

const logger = getLogger();

/**
 * 获取数据库对象
 * @param dbName 数据库名称
 * @param version 数据库版本
 */
const getDB = (dbName: string, version: number) => {
	return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);
    request.onsuccess = function(e: Event) {
      const db = (e.target as any).result;
      resolve(db);
    };
		request.onerror = function (e: Event) {
			const error = (e.target as any).error;
			reject(error);
		};
  });
}

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