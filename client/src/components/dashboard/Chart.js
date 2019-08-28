import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTransactionsByDate } from "../../actions/index";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as moment from "moment"
import Spinner from "../layout/Spinner"
import Moment from "react-moment"



function Chart(props) {
    return (
        <div>
            This is chart Component
        </div>
    )
}

Chart.propTypes = {

}

export default Chart

