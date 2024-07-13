import  { Component } from 'react'

interface IError {
    hasError:boolean;
}
export default class Error_Bbtn extends Component<IError> {
    state = {
        hasError:false,
    }


     CreateError = () =>{
        this.setState({hasError:true})
    } 

  render() {

    if(this.state.hasError){
        throw new Error('Error for you');
    }
    return (
      <div><button onClick={()=> this.CreateError()}>Err</button></div>
    )
  }
}
