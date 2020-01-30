import React from 'react'
import {withRouter} from 'react-router-dom'
import NavBarItem from './navBarItem'
import SessionStorage from '../app/service/sessionStorageService';
class NavBar extends React.Component{
    state = {
      ItensNavbar : null
    } 
    
    componentDidMount() {
      var item = JSON.parse(SessionStorage.getItem('_user'));
      
      if(item != null){

        let modulos = item.moduloAcesso.map((el) => {
          let link=`/consulta-${el.modulo}`;
          return <NavBarItem href={link} label={el.descricao}></NavBarItem>
        }) 
        this.setState({ItensNavbar : modulos})
      }else{        
        this.props.history.push("login");
      }
    }
    logout = () =>{
      SessionStorage.removeItem()
      this.props.history.push("login");
    }
    render(){
      return(
          <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
          <div className="container">
            <a  href="home.html" 
                className="navbar-brand" >Portal Grupo Zelo</a>
            <button className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div  className="collapse navbar-collapse" 
                  id="navbarResponsive">
              <ul className="navbar-nav mr-auto">
                {this.state.ItensNavbar}       
                
                
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <button className="btn btn-primary my-2 my-sm-0" onClick={this.logout}>Sair</button>
              </form>
      
            </div>
          </div>
        </div>
     )
   }
}
export default withRouter (NavBar)