const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }
  return import.meta.env[key] || ''
}

/** API entrypoint */
export const API_URL = getEnvVar('VITE_APP_API_URL')

export const isDevEnv = getEnvVar('DEV') // Vite feature
export const isProdEnv = getEnvVar('PROD') // Vite feature
