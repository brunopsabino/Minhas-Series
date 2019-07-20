import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assitindo',
    'toWatch': 'Assistir'
}

class NewSeries extends Component{

    constructor(props){
        super(props)
  
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false
        }
        this.SaveSeries = this.SaveSeries.bind(this)
      }

      componentDidMount(){
        this.setState({isLoading: true})
        api.loadGenres()
          .then((res) =>{
            this.setState({
              isLoading: false,
              genres: res.data
            })
          })
      }

    SaveSeries(){
        const newSeries = {
            'name': this.refs.name.value,
            'status': this.refs.status.value,
            'genre': this.refs.genre.value,
            'comments': this.refs.comments.value
        }
        api.saveSeries(newSeries)
            .then((res)=>this.setState({
              redirect: '/series/' + this.refs.genre.value
            }))
    }

    render(){
        return (<section className="intro-section">
                    {
                      this.state.redirect &&
                      <Redirect to={this.state.redirect} />
                    }
                    <h1>Nova Série</h1>
                    <form>
                        Nome: <input type='text' ref='name' className='form-control' /><br/>
                        Status: <select ref='status'>    
                                  {
                                      Object
                                      .keys(statuses)
                                      .map( key => <option key={key} value={key}>{statuses[key]}</option>)
                                  }
                                </select><br/>
                        Gênero: <select ref='genre'>    
                                  {
                                      this.state.genres
                                      .map( key => <option key={key} value={key}>{[key]}</option>)
                                  }
                                </select><br/>
                        Comentários <textarea ref='comments' className='form-control'></textarea><br/>
                        <button type='button' onClick={this.SaveSeries}>Salvar</button>
                    </form>
                </section>
                )
        
    }
}

export default NewSeries