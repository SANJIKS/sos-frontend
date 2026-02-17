/**
 * Уровни логирования
 */
enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

/**
 * Конфигурация логирования
 */
interface LoggerConfig {
    level: LogLevel;
    enableConsole: boolean;
}

class Logger {
    private config: LoggerConfig;

    constructor() {
        this.config = {
            level: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG,
            enableConsole: true
        };
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
        const currentIndex = levels.indexOf(this.config.level);
        const messageIndex = levels.indexOf(level);
        return messageIndex >= currentIndex;
    }

    private formatMessage(level: LogLevel, message: string, ...args: unknown[]): string {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        return `${prefix} ${message}`;
    }

    debug(message: string, ...args: unknown[]): void {
        if (this.shouldLog(LogLevel.DEBUG) && this.config.enableConsole) {
            console.debug(this.formatMessage(LogLevel.DEBUG, message), ...args);
        }
    }

    info(message: string, ...args: unknown[]): void {
        if (this.shouldLog(LogLevel.INFO) && this.config.enableConsole) {
            console.info(this.formatMessage(LogLevel.INFO, message), ...args);
        }
    }

    warn(message: string, ...args: unknown[]): void {
        if (this.shouldLog(LogLevel.WARN) && this.config.enableConsole) {
            console.warn(this.formatMessage(LogLevel.WARN, message), ...args);
        }
    }

    error(message: string, error?: Error | unknown, ...args: unknown[]): void {
        if (this.shouldLog(LogLevel.ERROR) && this.config.enableConsole) {
            const errorInfo = error instanceof Error 
                ? { message: error.message, stack: error.stack }
                : error;
            console.error(this.formatMessage(LogLevel.ERROR, message), errorInfo, ...args);
        }
    }

    /**
     * Настройка уровня логирования
     */
    setLevel(level: LogLevel): void {
        this.config.level = level;
    }

    /**
     * Включить/выключить консольный вывод
     */
    setConsoleEnabled(enabled: boolean): void {
        this.config.enableConsole = enabled;
    }
}

// Экспортируем singleton экземпляр
export const logger = new Logger();

