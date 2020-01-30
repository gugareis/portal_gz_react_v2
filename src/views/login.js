import React from 'react'

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';

import UsuárioService from '../app/service/usuarioServices' 
import SesionStorageService from '../app/service/sessionStorageService'
import {withRouter} from 'react-router-dom'
import Logo from "./img/grupoZeloLogo3.jpg";

import FundoLogin from "./img/hands-1838658_960_720.webp";

import { showMessageError } from '../components/toastr'

class Login extends React.Component{

    state = {
        nome:'',
        password: '',
        mensagemErro: null
    }
    constructor(props){
        super(props);
        this.service = new UsuárioService();
    }
    
    
    componentDidMount() {
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundImage = `url(${FundoLogin})`;
    }
    componentWillUnmount() {
        document.body.style.backgroundImage = "none";
    }

    login = () =>{
        if (!this.state.nome || !this.state.password) {
            showMessageError("Erro de Login",  "Preencha e-mail e senha para continuar!" );
        } else {

            const params ={
              
                    "nome":this.state.nome,
                    "senha":this.state.password
              
              }
              this.service.auth(params).then(response =>{
                    SesionStorageService.addItem('_user',response.data)
                  
                    this.props.history.push("/consulta-associados")
            }).catch(erro => {
                if(erro != null && erro.response != null && erro.response.data != null){
                    console.log(erro.response)
                    showMessageError("Erro de Login",  erro.response.data.message)
                }
            })
        }
    } 
    render(){
        
        return (
            <div className="container" style={{  boxShadow: 'rgba(0,0,0,0.3)',borderRadius: '10px 10px 10px 10px',opacity: '0.9' }}>
                <div className="row"  >
                    <div className="col-md-6" style={{ position: 'relative',marginLeft: '400px'}}>
                        <div style={{ width: '300px',backgroundColor : '#ffffff'}}>
                                <div className="row">
                                    <span>{this.state.mensagemErro}</span>
                                </div>
                                <div className="wrapper fadeInDown" 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column', 
                                            justifyContent: 'center',
                                            width: '100%',
                                            minHeight: '100%',
                                            padding: '20px'
                                          }}
                                          
                                >
                                    <div id="formContent" style={{

                                            borderRadius: '10px 10px 10px 10px',
                                            backgroundColor: '#fff',
                                            width: '90%',
                                            maxWidth: '450px',
                                            position: 'relative',
                                            padding: '0px',
                                            boxShadow: '0 30px 60px 0 rgba(0,0,0,0.3)',
                                            textAlign: 'center'
                                          }}>
                                        <div className="fadeIn first">
                                        <img src={Logo} id="icon" alt="User Icon" />
                                        </div>
                                        
                                        <InputText id="nome" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} 
                                                    placeholder="Nome"/>                                    
                                        <br></br>                                  
                                        <br></br>
                                        <Password id="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} 
                                                    placeholder="Password"/>
                                        <br></br>                                  
                                        <br></br>                                       
                                        
                                        <Button label="Entrar" onClick={this.login}  style={{marginRight: '.25em'}}/>                                 
                                        <br></br>                                  
                                        <br></br> 
                                    </div>
                                </div>
                           
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter (Login)