import axios from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Une erreur est survenue'

    if (error.response?.status === 401) {
      toast.error('Session expirée. Veuillez vous reconnecter.')
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
      }
    } else if (error.response?.status === 403) {
      toast.error('Accès refusé.')
    } else if (error.response?.status >= 500) {
      toast.error('Erreur serveur. Réessayez plus tard.')
    }

    return Promise.reject({ message, status: error.response?.status })
  }
)

export default api
