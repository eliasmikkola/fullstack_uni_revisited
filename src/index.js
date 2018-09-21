import React from 'react'
import ReactDOM from 'react-dom'

import {createStore} from 'redux'

import counterReducer from './store/counterReducer';


const store = createStore(counterReducer)


const Button = (props) => (<button onClick={props.handler}>{props.title}</button>)

const Header = (props) => (
    <h1>{props.title}</h1>
)
const Statistic = (props) => (
    <tr>
        <td>{props.title}</td>
        <td>{props.stat}</td>
    </tr>
)


const Statistics = (props) => {
    if (props.total > 0) {
        return (
            <table>
                <tbody>
                    {
                        props.stats.map(n => {
                            return (
                                <Statistic title={n.title} stat={n.stat} key={n.title} />
                            )
                        })
                    }
                </tbody>
            </table>)

    } else {
        return <p>ei yhtään palautatte annettu</p>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            total: 0
        }
    }


    vote = (type) => {
        store.dispatch({ type: type })
        
    }


    render() {
        const state = store.getState()
        const total = state.good + state.neutral + state.bad
        const median = Math.round((total > 0 ? (state.good + (state.bad * -1)) / total : 0) * 10) / 10
        const positive = Math.round(100 * (total > 0 ? state.good / total : 0) * 10) / 10 + "%"
        
        const stats = [
            {
                title: "hyvä",
                stat: state.good
            },
            {
                title: "neutraali",
                stat: state.neutral
            },
            {
                title: "huono",
                stat: state.bad
            },
            {
                title: "keskiarvo",
                stat: median
            },
            {
                title: "positiivista",
                stat: positive
            }
        ]
        
        return (
            <div>
                <div>
                    <Header title="Anna palautetta" />
                    <Button handler={() => this.vote('GOOD')} title={"hyvä"} />
                    <Button handler={() => this.vote('NEUTRAL')} title={"neutraali"} />
                    <Button handler={() => this.vote('BAD')} title={"huono"} />
                    <Header title="Statistiikka" />
                    <Statistics stats={stats} total={total} />
                    {
                        total > 0 ? <button onClick={() => store.dispatch({type: 'ZERO'})}>nollaa </button> : ''
                    }
                    
                </div>
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
  renderApp()
  store.subscribe(renderApp)
  