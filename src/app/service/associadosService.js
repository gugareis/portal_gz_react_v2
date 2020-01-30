import ApiService from '../apiservices'


class AssociadosService extends ApiService {
    constructor(){
        super('/api/associados')
    }
    getGrid(AssociadosFiltro){
        
        return this.post('/lista',AssociadosFiltro)
    }
    createCsv(AssociadosFiltro){        
        return this.post('/create/csv/associados',AssociadosFiltro)
    }
    getCampanhasAtivas(){
        return this.get('/campanhas/ativas')
    }
    
}
export default AssociadosService