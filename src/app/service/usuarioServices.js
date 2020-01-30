import ApiService from '../apiservices'

class UsuarioService extends ApiService {
    constructor(){
        super('/api/user')
    }
    auth(credenciais){
        return this.post('/auth/login',credenciais)
    }
}
export default UsuarioService