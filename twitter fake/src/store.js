import {createStore,applyMiddleware} from 'redux';
//o thunk e pra fazer requisicao assincrona
import thunk from 'redux-thunk'

function tweetsReducer(state=[],action={}){
    if(action.type === 'CARREGA_TWEETS'){
        state=action.tweets
    }
    //*******3- atualiza o estado com o novo tweet + os tweets antigos e depois retorna ele */
    if(action.type === 'ADICIONA_TWEET'){
        state=[action.novoTweet,...state]
    }
    if(action.type === 'REMOVE_TWEET'){
        const listaDeTweetsAtualizada = state.filter((tweet)=>tweet._id !== action.idTweetQueVaiSerRemovido)
        state=listaDeTweetsAtualizada
    }
    return state
}

// passar para o store o reducer e o apply middleware que e tipo um filtro (dado um evento vai executar alguma coisa 
//sem que vc perceba ) se o dispatch for em formato objeto javascript ele deixa passar, se for uma funcao ele 
//trata ela com o thunk, ele se encarrega de chamar a funcao carrega()
const store = createStore(tweetsReducer, applyMiddleware(thunk)) 

console.log('Primeira versao da store: ',store.getState())

// window.store=store

export default store