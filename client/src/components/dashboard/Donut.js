import React, { Component } from 'react';
import PropTypes from "prop-types"
import Chart from 'react-apexcharts'

class Donut extends Component {
  constructor(props) {
    super(props);
    debugger;

    this.state = {
      options: {
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%"
          }
        },
        plotOptions: {
          pie: {
            expandOnClick: false
          }
        },
        labels: this.props.labels
      },
      series : this.props.series
    }
  }


  static getDerivedStateFromProps(props, state){
    return {
      series: props.series,
      options : {
        ...state.options,
        labels: props.labels
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