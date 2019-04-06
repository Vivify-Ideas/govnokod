import { AUTH_TOKEN } from './constants'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN)
export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN, token)
