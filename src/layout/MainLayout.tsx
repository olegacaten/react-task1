import { Component, ReactNode } from 'react';
import mainlayout from './MainLayout.module.scss';

export default class MainLayout extends Component<{children:ReactNode}> {
  render():ReactNode {
    return (
      <div className={mainlayout.Container}>
        {this.props.children}
      </div>
    )
  }
}
