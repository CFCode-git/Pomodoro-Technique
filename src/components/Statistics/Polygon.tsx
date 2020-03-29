import React from 'react';

interface IPolygonProps {
  data: any
  totalFinishedCount: number
}

class Polygon extends React.Component<IPolygonProps> {
  constructor(props) {
    super(props);
  }

  point = () => {
    const dates = Object.keys(this.props.data).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const firstDay = dates[0];
    if (firstDay) {

      const range = new Date().getTime() - Date.parse(firstDay);
      let finishedCount = 0;
      let finalY;
      const pointArray = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 240;
        finishedCount += this.props.data[date].length;
        const y = (1 - (finishedCount / this.props.totalFinishedCount)) * 60;
        finalY = y;
        return `${x},${y}`;
      });
      return ['0,60', ...pointArray, `240,${finalY}`,'240,60'].join(' ');
    } else {
      return '0,60 240,60';
    }
  };

  render() {
    return (
      <div className="Polygon">
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.point()}/>
        </svg>
      </div>
    );
  }
}

export default Polygon;
