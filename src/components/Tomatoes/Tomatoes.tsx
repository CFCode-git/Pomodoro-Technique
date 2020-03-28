import React, {Component} from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';

class Tomatoes extends Component {
  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction/>
      </div>
    );
  }
}

const mapStateToProps=(state,ownProps)=>({
  tomatoes:state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);