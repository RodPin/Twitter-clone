import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
// import Tweet from '../../components/Tweet' antigo
import Tweet from '../../containers/TweetPadrao' //atual
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'
import * as TweetsAPI from '../../api/TweetsAPI'

class Home extends Component {
    //tem que habilitar isso para o this.context.store funcionar
    static contextTypes = {
        store:PropTypes.object
    }
    
    constructor() {
        super();
        this.state = {
            novoTweet: '',
            tweets:[],
            tweetAtivo:{}
        };
    }
    
    componentWillMount(){
        //******4 - o subscribe faz com que a funcao seja chamada quandoatualizamos o stado global no 3, */
        //assim atualizamos o estado dessa tela com o estado global no store    
          this.context.store.subscribe(()=>{
              console.log('subscribe')
            this.setState({
                  tweets:this.context.store.getState()
            })
          })
      }
      componentDidMount(){
        // fetch(
        //     `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        //     .then((response)=>response.json())
        //     .then(responseEmJson=>{
        //         window.store.dispatch({type:'CARREGA_TWEETS',tweets:responseEmJson})
        //     })
        this.context.store.dispatch(TweetsAPI.carrega())
      }

      abreModalParaTweet= (event,IDtweetSelecionado) => {
          const isTweetFooter = event.target.closest('.tweet__footer')
          if(isTweetFooter) return false

          const tweetSelecionado = this.state.tweets.find(tweet=>tweet._id === IDtweetSelecionado)

          this.setState({tweetAtivo:tweetSelecionado})
      }

      fechaModal = (event) => {
          const isModal = event.target.closest('.widget')
          if (!isModal){
              this.setState({
                  tweetAtivo:{}
              })
          }
      }

      atualizarInput(texto, nome){
        
        let estado = {...this.state};
        estado[nome] = texto.target.value;
        this.setState(estado);
      }
      
    //   twittar(event){
    //     event.preventDefault();
    //     const novoTweet = this.state.novoTweet
    //     const tweetsAntigos =this.state.tweets
    //     if(novoTweet){
    //         fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
    //         method:'POST',
    //         body:JSON.stringify({conteudo:novoTweet})
    //     }).then((response)=> response.json())
    //     .then((novoTweetRegistradoNoServer)=>{
    //         //COM REDUX : 
    //         this.context.store.dispatch({type:'ADICIONA_TWEET',novoTweet:novoTweetRegistradoNoServer})

    //                          // this.setState({
    //                          //       tweets:[novoTweetRegistradoNoServer,...tweetsAntigos],
    //                          //     novoTweet:''                     SEM REDUX
    //                          // })
    //     })
    //     }
    // }

    //nova funcao para o redux
      twittar(event){
          //************************************** 1-dispatch e chama o adiciona no tweetsAPI */
          event.preventDefault()
          this.context.store.dispatch(
              TweetsAPI.adiciona(this.state.novoTweet)
          )
          this.setState({
              novoTweet:''
          })
      }
      
    //   removeTweet(idTweetQueVaiSerRemovido){
    //     fetch(`http://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
    //         method:'DELETE'}).then((data)=>data.json()).
    //         then((response)=>{
    //             console.log(response)
    //             const listaDeTweetsAtualizada = this.state.tweets.filter((tweet)=>tweet._id !== idTweetQueVaiSerRemovido)
    //             this.setState({tweets:listaDeTweetsAtualizada,tweetAtivo:{}})
    //         })
    //   }

    // removeTweet(idTweetQueVaiSerRemovido){
    //     this.context.store.dispatch(TweetsAPI.remove(idTweetQueVaiSerRemovido)) 
    // }           RETIRADO PCAUSA DO CONTAINER

      editar(editado,index){
               let array=[...this.state.tweets]
        array[index].conteudo=editado
        this.setState({
            tweets:array
        })
    }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>

                    <form className="novoTweet" onSubmit={(event)=>this.twittar(event)}>
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status ${this.state.novoTweet.length>140 ? 'novoTweet__status--invalido':''}`}>{this.state.novoTweet.length}/140</span>
                            <textarea 
                                value={this.state.novoTweet}
                                className="novoTweet__editor" 
                                placeholder="O que está acontecendo?"  
                                onChange={novoTweet=> this.atualizarInput(novoTweet, 'novoTweet')}
                            >
                            </textarea>
                        </div>
                        <button type="submit" className="novoTweet__envia"  onClick={()=>console.log('asijdsa') } disabled={this.state.novoTweet.length>140}>Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget> 
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {
                            this.state.tweets.length==0?
                                <span>Escreva um tweet</span>
                            :
                                this.state.tweets.map(
                                    (tweetInfo,index)=> 
                                        <Tweet  
                                            key={tweetInfo._id} 
                                            ttt={tweetInfo}                                     
                                            removeHandler={event=>this.removeTweet(tweetInfo._id)}
                                            handleAbreModalParaTweet={event=>this.abreModalParaTweet(event,tweetInfo._id)}
                                        />
                                )
                        }
                    </div> 
                </Widget>
            </Dashboard>
        </div>
        <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
             <Widget>
                 <Tweet
                    key={this.state.tweetAtivo._id}
                    // removeHandler={(event)=>{this.removeTweet(this.state.tweetAtivo._id)}}
                    texto={this.state.tweetAtivo||''}
                    tweetInModal={true}
                    ttt={this.state.tweetAtivo}
                 />
             </Widget>
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
