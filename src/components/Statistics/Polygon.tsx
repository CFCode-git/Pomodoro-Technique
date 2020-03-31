import React from 'react';

interface IPolygonProps {
  data: any
  totalFinishedCount: number
  polygonWidth:null | number
}

class Polygon extends React.Component<IPolygonProps> {
  constructor(props) {
    super(props);
  }

  point = () => {
    let {polygonWidth} = this.props
    polygonWidth = polygonWidth === null ? 240 : polygonWidth
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
      return ['0,60', ...pointArray, `${polygonWidth},${finalY}`, `${polygonWidth},60`].join(' ');
    } else {
      return `0,60 ${polygonWidth},60`;
    }
  };

  render() {

    return (
      <div className="Polygon">
        <svg style={{width: '100%', height: '60'}}>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1" points={this.point()}/>
        </svg>
      </div>
    );
  }
}

export default Polygon;

