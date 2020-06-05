import axios from 'axios'

const api = axios.create ({
  baseURL: 'https://apinodementions.rj.r.appspot.com'
})

export default api