import React,{Fragment} from 'react'
import spinner from "../../img/loading.gif"

function Spinner(props) {
    return (
        <Fragment>
            <img alt="Loading..." style={{width:100,margin:"auto",display:"block",position: "absolute",top: "calc(50vh - 50px)",left: "calc(50vw - 50px)"}} src={spinner}></img>
        </Fragment>
    )
}


export default Spinner


