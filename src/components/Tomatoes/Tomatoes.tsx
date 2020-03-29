import React, {Component} from 'react';
import './Tomatoes.scss';
import TomatoAction from './TomatoAction';
import {connect} from 'react-redux';
import {addTomato, initTomatoes, updateTomato} from '../../redux/actions/tomatoes';
import TomatoList from './TomatoList';
import axios from '../../config/axios';
import _ from 'lodash';
// import {format} from 'date-fns';
import dayjs from 'dayjs';


interface ITomatoesProps {
  addTomato: (payload: any) => any
  initTomatoes: (payload: any[]) => any
  tomatoes: any[]
  updateTomato: (payload: any) => any
}

class Tomatoes extends Component <ITomatoesProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getTomatoes();
  }

  get unfinishedTomato() {
    return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
  }

  get finishTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    // console.log(format(new Date(),'yyyy-MM-d'))
    // console.log(finishedTomatoes);
    // finishedTomatoes.map(t=>{
    //   console.log(format(new Date(t.started_at),'yyyy-MM-d'))
    // })
    // const obj = _.groupBy(finishedTomatoes, (tomato) => {
    //   return format(new Date(tomato.started_at), 'yyyy-MM-d');
    // });
    return _.groupBy(finishedTomatoes, (tomato) => {
      return dayjs(tomato.started_at).format('YYYY-MM-D');
    });
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get('tomatoes');
      // 放入 redux 中
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato}
                      updateTomato={this.props.updateTomato}/>
        <TomatoList finishedTomatoes={this.finishTomatoes}/>
      </div>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  addTomato,
  updateTomato,
  initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);