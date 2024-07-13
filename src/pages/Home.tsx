import { Component, ReactNode } from 'react'
import SearchContainer from '../components/SearchContainer/SearchContainer'


export default class Home extends Component {
  render():ReactNode {
    return (
      <div>
        <SearchContainer/>
      </div>
    )
  }
}
