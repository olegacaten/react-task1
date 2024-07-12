import { Component, ReactNode } from 'react'
import {StateProps} from '../../interfaces/index'
import { LocalStorageGet , LocalStorageWrite } from '../../utils/LocalStorage';
import { GetAllPokemons } from '../../api/FetchPokemon';
import ResultContainer from '../ResultContainer/ResultContainer';

export default class SearchContainer extends Component<undefined, StateProps> {
state:StateProps = {
    SearchWord: '',
    detailedPokemons_Obj: undefined,
};


    componentDidMount() {
    const LocalStorageSavedWorld: string = LocalStorageGet('SearchWord');
    this.setState({SearchWord: LocalStorageSavedWorld});
    const detailedPokemons_Obj = await GetAllPokemons();
    this.setState({ detailedPokemons_Obj });

    }

    handleChangeInputSave = (e: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({SearchWord: e.target.value});
    };


    SearchForPokemon = () => {
      LocalStorageWrite('SearchWord', this.state.SearchWord);

    };


  render():ReactNode {
    return (
        <div className="search">
        <input
        type="text"
        className="search__field"
        value={this.state.SearchWord}
        onChange={this.handleChangeInputSave}
        />
        <button type="button" className="search__btn"  onClick={this.SearchForPokemon}>
          SEARCH
        </button>
        
        <ResultContainer results={detailedPokemons}/>
      </div>
    )
  }
}
