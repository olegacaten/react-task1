import { Component, ReactNode } from 'react'
import {StateProps} from '../../interfaces/index'
import { LocalStorageGet , LocalStorageWrite } from '../../utils/LocalStorage';
import { GetAllPokemons } from '../../api/FetchPokemon';
import ResultContainer from '../ResultContainer/ResultContainer';


interface Props {};

export default class SearchContainer extends Component<Props, StateProps> {
state:StateProps = {
    SearchWord: '',
    detailedPokemons_Obj: undefined,
};


    async componentDidMount() {
      const LocalStorageSavedWorld = LocalStorageGet('SearchWord');
      this.setState({ SearchWord: LocalStorageSavedWorld });
      if (this.state.detailedPokemons_Obj === undefined) {
   
        const detailedPokemons_Obj = await GetAllPokemons();
        console.log(this.state.detailedPokemons_Obj);
        this.setState({ detailedPokemons_Obj: detailedPokemons_Obj });
    
        console.log("ComponentdidMountworked");
      }
      else return;
  
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
        
        <ResultContainer results={this.state.detailedPokemons_Obj}/>
      </div>
    )
  }
}
