import React from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import axios from '../../../config/axios';
import {updateTomato, editTomato} from '../../../redux/actions/tomatoes';
import './TomatoHistoryItem.scss';

interface ITomatoHistoryItemProps {
  tomato: any
  itemType: string
  updateTomato: (payload: any) => void
  editTomato: (payload: number) => void
}

interface ITomatoHistoryItemState {
  editText: string
}

class TomatoHistoryItem extends React.Component <ITomatoHistoryItemProps, ITomatoHistoryItemState> {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.tomato.description
    };
  }

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.tomato.id}`, params);
      this.props.updateTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  onKeyUp = (e) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.updateTomato({description: this.state.editText});
    }
  };

  editTomato = () => {
    this.props.editTomato(this.props.tomato.id);
  };


  render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText}
               onChange={e => this.setState({editText: e.target.value})}
               onKeyUp={this.onKeyUp}
        />
        <div>
          <span onClick={() => this.updateTomato({description: this.state.editText})}>提交</span>
        </div>
      </div>
    );

    const Text = (
      <div className="action">
      <span className="text" onDoubleClick={() => this.editTomato()}>
      {this.props.tomato.description}
    </span>
        {
          this.props.itemType === 'aborted' ?
            <span className="button" onClick={() => this.updateTomato({aborted: false})}>恢复至已完成</span> :
            <span className="button" onClick={() => this.updateTomato({aborted: true})}>移除</span>
        }
      </div>);


    let action;
    let formatText;
    let time;
    if (this.props.itemType === 'finished') {
      formatText = 'HH:mm';
      time = this.props.tomato.updated_at;
      action = this.props.tomato.editing ? Editing : Text;
    } else if (this.props.itemType === 'aborted') {
      formatText = 'YYYY-MM-DD';
      time = this.props.tomato.updated_at;
      action = (
        <div>
          {this.props.tomato.editing ? Editing : Text}
        </div>
      );
    }

    return (
      <div className="TomatoHistoryItem" id="TomatoHistoryItem">
        <div className="text">
          <span className="time">
            {dayjs(this.props.tomato.updated_at).format(`${formatText}`)}
          </span>
          {action}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});
const mapDispatchToProps = {
  updateTomato,
  editTomato,
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem);