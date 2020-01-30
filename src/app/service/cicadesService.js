import ApiService from '../apiservices'


class CidadesService extends ApiService {
    constructor(){
        super('/api/cidades')
    }
    getGrid(){
        
        return this.post('/lista')
    }
}
export default CidadesService