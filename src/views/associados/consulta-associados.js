import React from 'react'
import SesionStorageService from '../../app/service/sessionStorageService'
import {withRouter} from 'react-router-dom'
import AssociadosTable from './associadosTable'
import CampanhasAtivasTable from './campanhasAtivasTable'
import AssociadosService from '../../app/service/associadosService'

import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {Dialog} from 'primereact/dialog';
import {ProgressSpinner} from 'primereact/progressspinner';
import {MultiSelect} from 'primereact/multiselect';

import NavBar from '../../components/navbar'
import { showMessageAlert } from '../../components/toastr'
import CidadesService from '../../app/service/cicadesService'





class Associados extends React.Component{
    
    constructor(){
        super();
        //    this.service = new UsuárioService();
        this.service = new AssociadosService();

        this.cidadesService = new CidadesService();

        this.state = {
            associados : [],
            datainclusao : null,
            onHide : false,
            campanhasAtivas : [],
            consultaStatus : false,
            listaCidades : [],
            cidadesSelected : []
        };
        
        this.onHide = this.onHide.bind(this);
       
    }

   
    onHide() {
        this.setState({campanhasAtivasModal: false});
    }
    componentDidMount() {
        const userLogged = JSON.parse(SesionStorageService.getItem('_user'))
        
        if(userLogged == null){            
            this.props.history.push("/login")
        }
        this.getlistaCidades();
    }

    getlistaCidades = () => {
        this.cidadesService.getGrid().then(response => {
            this.setState({listaCidades : response.data})
            
        }).catch(erro => {                      
        })
    }

    getCampanhasAtivas = () => {
        this.service.getCampanhasAtivas().then(response => {
            let data = JSON.parse(response.data.data);
            let campanhas = data.campanhas;
            this.setState({campanhasAtivas : campanhas,campanhasAtivasModal: true})
            
        }).catch(erro => {                      
        })
    }

    getAssociados = () => {
        this.setState({consultaStatus : true});
        let dataIni = "";
        let dataFim = "";
        let data = this.state.datainclusao;
        if(data != null){
            dataIni = this.dataAtualFormatada(data[0]);
        }
        if (data != null && data[1] != null){
            dataFim = this.dataAtualFormatada(data[1]);
        }
        console.log(JSON.stringify(this.state.cidadesSelected));
        const associadosFiltro = {
            dataInclusaoIni : dataIni,
            dataInclusaoFim : dataFim,
            cidades : this.state.cidadesSelected
        }
        this.service.getGrid(associadosFiltro).then(response => {
            this.setState({consultaStatus : false});
            this.setState({associados : response.data})
        }).catch(erro => {
            this.setState({consultaStatus : false});
                showMessageAlert("Alerta",  "Não houve retorno da consulta na base de dados.")
            
        }) 
        
    }
    dataAtualFormatada = (data) => {
        let dataTemp = new Date(data);
        let dia  = dataTemp.getDate();
        let diaF = (dia.length === 1) ? '0'+dia : dia;
        let mes  = (dataTemp.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
        let mesF = (mes.length === 1) ? '0'+mes : mes;
        let anoF = dataTemp.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
    }
    createCsvAssociados = () => {
        const userLogged = JSON.parse(SesionStorageService.getItem('_user'))
        let dataIni = "";
        let dataFim = "";
        let data = this.state.datainclusao;
        
        if(data != null){
            dataIni = this.completaDigitoEsqquerda(data[0].getDate()) + "/" +  this.completaDigitoEsqquerda((data[0].getMonth()+1))+ "/" + data[0].getFullYear();
        }
        if (data != null && data[1] != null){
            dataFim = this.completaDigitoEsqquerda(data[1].getDate()) + "/" + this.completaDigitoEsqquerda((data[1].getMonth()+1)) + "/" + data[1].getFullYear();
        }
        
        const associadosFiltro = {
            dataInclusaoIni : dataIni,
            dataInclusaoFim : dataFim,
            userCode : userLogged.codigo
        }
        this.service.createCsv(associadosFiltro).then(response => {
            this.setState({associados : response.data})
        }).catch(erro => {

        }) 
        
    }

    render (){
        const ptbr = {
			firstDayOfWeek: 1,
			dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
			dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
			dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
			monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
			monthNamesShort: ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        };
        const style = {
            marginRight:'10px'
        }       
        
        return (
            <>
                    
            <Dialog header="Lista Campanhas Ativas" visible={this.state.campanhasAtivasModal} style={{width: '50vw',zIndex:'99999999'}} onHide={this.onHide} >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">                                
                                <CampanhasAtivasTable CampanhasAtivas={this.state.campanhasAtivas}/>
                            </div>
                        </div>
                    </div>
            </Dialog>
            <NavBar></NavBar>
            <div  className="container">
                <Card title="Consulta Associados">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <div className="p-col-12 p-md-4">
                                    
                                    <label htmlFor="inputDataInclusao1">Data inclusão </label>
                                    <br></br>
                                        <Calendar dateFormat="dd/mm/yy"
                                            value={this.state.datainclusao} 
                                            id='inputDataInclusao1'
                                            onChange={(e) => this.setState({datainclusao: e.target.value})} 
                                            selectionMode="range" 
                                            readonlyInput={true}  
                                            monthNavigator={true} 
                                            yearNavigator={true} 
                                            yearRange="1991:2030" 
                                            locale={ptbr} 
                                            showIcon={true}/>
                                    <br></br>
                                    <br></br>

                                    <label htmlFor="selectCidade">Cidades </label>
                                    <br></br>
                                    <MultiSelect id="selectCidade" value={this.state.cidadesSelected} options={this.state.listaCidades} onChange={(e) => this.setState({cidadesSelected: e.value})}
                                        style={{minWidth:'12em'}} filter={true} placeholder="Escolha" />
                                </div>
                                <br></br>
                                <Button  onClick={this.getAssociados} label='Buscar' icon="pi pi-search" iconPos="right"></Button>
                                <br></br>
                                <br></br>
                                <div >
                                <Button onClick={this.createCsvAssociados} label='Criar campanha SmartNX' className="p-button-success" style={style}  icon="pi pi-upload"  iconPos="right"> </Button>
                                <Button label='Lista campanhas ativa SmartNX' className="p-button-warning"   icon="pi pi-list"  iconPos="right" onClick={this.getCampanhasAtivas}> </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    
                </Card>
            </div>
            
                <Card title="Lista Associados">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                {this.state.consultaStatus ? <ProgressSpinner style={{width: '50px', height: '50px',marginLeft: '50%'}}/> : <AssociadosTable Associados={this.state.associados}/>}
                                
                            </div>
                        </div>
                    </div>
                </Card>
                </>
/*            inscricao;
		byte controle;
		Character grupo;
		Character subgrupo;*/
        )
    }
} 
export default withRouter (Associados)