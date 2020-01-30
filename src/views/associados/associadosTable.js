import React from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

export default props => {    
    return (
        <DataTable  value={props.Associados} paginator={true} rows={20} sortField="data" sortOrder={1}>            
            <Column field="nome" header="nome" sortable={true}/>
            <Column field="data" header="data" sortable={true}/>
            <Column field="cpf" header="cpf" />
            <Column field="celular" header="celular" />
        </DataTable>       
    )
} 