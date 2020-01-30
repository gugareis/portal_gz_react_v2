import React from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export default props => {    
    return (
        <DataTable  value={props.CampanhasAtivas} paginator={true} rows={10} >            
            <Column field="descricao" header="Descrição" />
            <Column field="campanha" header="Campanha" />
        </DataTable>       
    )
} 