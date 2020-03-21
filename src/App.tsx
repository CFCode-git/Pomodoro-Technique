import * as React from 'react';
import {Button, Rate} from 'antd';
import './App.css';



class App extends React.Component{
  public render(){
    return (
      <div className="App">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </div>
    );
  }
}

export default App;
