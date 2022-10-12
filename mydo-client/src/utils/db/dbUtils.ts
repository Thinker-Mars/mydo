import { DatabaseName, DBVersionIdentify } from './constants';

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