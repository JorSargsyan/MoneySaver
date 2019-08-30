import React, { Component } from 'react';
import PropTypes from "prop-types"
import Chart from 'react-apexcharts'

class Donut extends Component {
  constructor(props) {
    super(props);


    this.state = {
      options: {
        plotOptions: {
          pie: {
            expandOnClick: false
          }
        },
        legend : {
          show : true,
          position : "bottom"
        },
        labels: this.props.labels 
      },
      series : this.props.series 
    }
  }


  static getDerivedStateFromProps(props, state){
    return {
      series: props.series.length ? props.series : [0] ,
      options : {
        ...state.options,
        labels: props.labels.length ? props.labels : ["No Data"]
      }
    };
  }

  render() {
    return (
      <div className="pie">
        <Chart options={this.state.options} series={this.state.series} type="pie" width="100%" height="234" />
      </div>
    );
  }
}

Donut.propTypes = {
  labels: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
}



export default Donut;