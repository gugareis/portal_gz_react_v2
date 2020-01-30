import React from 'react'
import LocalStorageService from '../app/service/localStorageService'

export const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProviderAuth extends React.Component {
    state = {
        userAuthenticade : null,
        isAuthenticade : false
    }
    initSession = (user) => {

    }

    endSession = () => {
        LocalStorageService.removeItem();
    }
    render (){
        return (
            <AuthProvider>
                {this.props.children}
            </AuthProvider>
        )
    }
}