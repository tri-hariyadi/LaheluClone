class ErrorUtils {
    private static isErrorWithMessage(maybeError: unknown): maybeError is {name: string; message: string} {
        return (
            typeof maybeError === 'object' &&
            maybeError !== null &&
            'message' in maybeError &&
            typeof (maybeError as Record<string, unknown>).message === 'string'
        );
    }

    public static getErrorMessage(error: unknown): {name: string; message: string} {
        if (this.isErrorWithMessage(error)) {
            return error;
        }

        try {
            return new Error(JSON.stringify(error));
        } catch {
            return Error(String(error));
        }
    }

    public static consoleError(title: string, error: unknown, message?: string) {
        if (__DEV__) {
            const dataError = this.getErrorMessage(error);
            const isErrorConstructor = dataError instanceof Error;

            console.info(
                `\x1b[31m[at ${title}]:: \x1b[36m${message || ''}${message ? ' ' : ''}${
                    isErrorConstructor ? dataError : JSON.stringify(dataError)
                }`,
            );
        }
    }
}

export default ErrorUtils;
