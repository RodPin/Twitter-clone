
//essa funcao
export const carrega= ()=>{
    //essa outra funcao que e passada para o tweetsAPI.carrega() no home.js
    return((dispatch)=>{
        fetch(
            `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
                .then((response)=>response.json())
                .then(responseEmJson=>{
                    dispatch({type:'CARREGA_TWEETS',tweets:responseEmJson})
                }
        )
    }
)
}
//***********2- Registra no banco de dados e chama o reducer 'ADICIONA_TWEETS' passando a resposta de quando adiciona,
// ou seja o proprio tweet */
export const adiciona = (novoTweet) => {
    return(dispatch)=>{
        if(novoTweet){
            fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {method:'POST',body:JSON.stringify({conteudo:novoTweet})})
            .then(response=> response.json())
            .then((novoTweetRegistradoNoServer)=>{
                dispatch({type:'ADICIONA_TWEET',novoTweet:novoTweetRegistradoNoServer})
            })
        }
    }
}

export const remove = (idTweetQueVaiSerRemovido) => {
    return (dispatch) => {
        fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
            method:'DELETE'
        }).then((data)=>data.json())
        .then((response)=>{
            console.log(response)
            dispatch({type:'REMOVE_TWEET',idTweetQueVaiSerRemovido})
        })
    }
}