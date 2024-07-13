import { Component, ReactNode } from "react";
import LoadingStyle from './Loading.module.scss'
interface ILoading {
    isLoaded: boolean;
}


export default class Loading extends Component<ILoading> {

    render(): ReactNode {
            const isLoading = this.props;

        return(

            <div className={isLoading? `${LoadingStyle.active}` : ('')}>
                    <div className={LoadingStyle.spinner}></div>
            </div>

        );
        
    }

}