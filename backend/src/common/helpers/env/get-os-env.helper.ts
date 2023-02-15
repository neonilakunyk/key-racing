const getEnvVar = (key: string): string | undefined => process.env[key];

export { getEnvVar };
