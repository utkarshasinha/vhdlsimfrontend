import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL,
  withCredentials: true,
})

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload extends LoginPayload {
  username: string
}

export interface AuthResponse {
  token: string
  user?: {
    id?: string
    email?: string
    username?: string
  }
}

export interface User {
  id: string
  email: string
  username: string
}

export interface SimulatePayload {
  code: string
  language?: string
  entityName?: string
  testbench?: string
}

export interface SimulationResponse {
  success: boolean
  output: string
  error?: string
  waveform?: unknown
}

export const authLogin = (payload: LoginPayload) => api.post<AuthResponse>('/auth/login', payload)
export const authSignup = (payload: SignupPayload) => api.post<AuthResponse>('/auth/signup', payload)
export const authMe = () => api.get<{ user: User }>('/auth/me')
export const runSimulationRequest = (payload: SimulatePayload) => api.post<SimulationResponse>('/simulate', payload)

export interface Design {
  id: string
  title: string
  language: string
  creator: string
  downloads: number
  description: string
  code: string
  waveform?: unknown
}

export const getDesigns = () => {
  // Use a public request for designs so CORS works with wildcard origin
  const publicApi = axios.create({
    baseURL,
    withCredentials: false,
  })
  return publicApi.get<{ data: Design[] } | Design[]>('/designs')
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('vhdl_token', token)
    }
  } else {
    delete api.defaults.headers.common.Authorization
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('vhdl_token')
    }
  }
}

export const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('vhdl_token')
}

export const logout = () => {
  setAuthToken(null)
}

export const initAuth = () => {
  const token = getStoredToken()
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

initAuth()

export default api
