const convertObjectToParams = (obj: Object): string => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Cannot convert object to params");
    }
    return JSON.stringify(obj);
}

const convertParamsToObject = <T>(params: string): T => {
    if (typeof params !== "string" || !params?.trim()) {
        throw new Error("Cannot convert params to object");
    }
    return JSON.parse(params);
}

export default {
    convertObjectToParams,
    convertParamsToObject,
};