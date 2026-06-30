export interface Agent {
  id: string
  name: string
  role: string
  department: string
  phone: string
  email: string
  status: 'active' | 'offline' | 'busy'
  createdAt: string
}
