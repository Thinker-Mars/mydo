const DefaultPrefix = 'Mydo: ';

class Logger {
	prefix: string;

	constructor(prefix?: string) {
		this.prefix = prefix || DefaultPrefix;
	}

	info(text: string) {
		window.console.info(`${this.prefix}%c${text}`, 'color: blue; font-weight: 600');
	}

	error(reason: string) {
		window.console.error(`${this.prefix}: %s`, reason)
	}
}

let loggerInstance: Logger;

const getLogger = (prefix?: string) => {
	if (!loggerInstance) {
		loggerInstance = new Logger(prefix);
	}
	return loggerInstance;
}

export {
	getLogger
}