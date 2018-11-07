import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Home from './pages/Home/App'
import LoginPage from './pages/LoginPage'

// --------------------COMPONENT NORMAL ---------------------------------
// class PrivateRoute extends Component {
//     render(){
//         if(localStorage.getItem("TOKEN")){
//             return (<Route  {...this.props}/>)
//         }else{
//             return <Redirect to="/login"/>
//         }
//     }
// }

// --------------------- STATELESS COMPONENT -----------------------------------
const PrivateRoute = (props) => {  
        if(localStorage.getItem("TOKEN")){
             return (<Route {...props}/>)
        }else{
            return <Redirect to="/login"/>
        }
}


const Roteamento = () => {
    return(
        <Switch>
            <PrivateRoute path='/' component={Home} exact/>
            <Route path='/login' component={LoginPage}/>
        </Switch>
    )
}

export default Roteamento