import { Component, ReactNode } from 'react'
import {StateProps} from '../../interfaces/index'
import { LocalStorageGet , LocalStorageWrite } from '../../utils/LocalStorage';
import { GetAllPokemons } from '../../api/FetchPokemon';
import ResultContainer from '../ResultContainer/ResultContainer';
import Loading from '../Loading/Loading';


interface Props {};

export default class SearchContainer extends Component<Props, StateProps> {
state:StateProps = {
    SearchWord: '',
    detailedPokemons_Obj: undefined,
    filteredPokemons: undefined,
    isLoaded: false,
};


    async componentDidMount() {
      this.setState({ isLoaded: false });
      const LocalStorageSavedWorld = LocalStorageGet('SearchWord');
      this.setState({ SearchWord: LocalStorageSavedWorld });
      if (this.state.detailedPokemons_Obj === undefined) {
   
        const detailedPokemons_Obj = await GetAllPokemons();
        
        this.setState({ detailedPokemons_Obj,filteredPokemons: detailedPokemons_Obj});
        this.setState({ isLoaded: true});
      }
      else return;
  
    }

    filterPokemons = () => {
      this.setState({ isLoaded: false });
        const {SearchWord, detailedPokemons_Obj} = this.state;
        if((!detailedPokemons_Obj)||(!SearchWord.trim())){
          this.setState({filteredPokemons:detailedPokemons_Obj });
          this.setState({ isLoaded: true });
          return;
        }

        const filtered =  detailedPokemons_Obj.filter(item => item.name.toLowerCase().includes(SearchWord.toLowerCase()));

        this.setState({filteredPokemons: filtered});
        this.setState({ isLoaded: true });
  };
  


    handleChangeInputSave = (e: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({SearchWord: e.target.value});
    };


    SearchForPokemon = () => {
      LocalStorageWrite('SearchWord', this.state.SearchWord);
      this.filterPokemons();
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
        

        {this.state.isLoaded ? (
  <ResultContainer results={this.state.filteredPokemons ? (this.state.filteredPokemons) : (this.state.detailedPokemons_Obj)} />
) : (
  <Loading isLoaded={this.state.isLoaded}/>
)}


      </div>
    )
  }
}
