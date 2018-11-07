import {connect} from 'react-redux'
import * as TweetsAPI from '../api/TweetsAPI'
import Tweet from '../components/Tweet'


//ajustando o Container Component

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch,propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
        }
    }
}

const tweetPadraoContainer = connect(mapStateToProps,mapDispatchToProps)(Tweet)

export default tweetPadraoContainer