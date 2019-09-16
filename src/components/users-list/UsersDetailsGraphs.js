import React from 'react';
import ReactDom from 'react-dom';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official'

const dropDownStyle = {
    cursor : "pointer"
}

const options = {
    chart: {
      type: "pie"
    },
    title: {
      text: "Roles"
    },
    series: [
      {
        data: [
          {
            name : "Manager",
            y: 300
          },
          {
            name : "Employee",
            y: 50
          }
        ]
      }
    ]
  };

export default class UsersDetailsGraphs extends React.Component{

    render(){
        return (
            <div className="text-align-center">
                <div className="charts">
                    <div className="dropdown d-flex float-right">
                        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                        </button>
                        <div className="dropdown-menu mr-5" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" id="dropDown__workSite" style={dropDownStyle}>Work site</a>
                            <a className="dropdown-item" id="dropDown__department" style={dropDownStyle}>Department</a>
                            <a className="dropdown-item" id="dropDown__role" style={dropDownStyle}>Role</a>
                        </div>
                    </div>
                    <div id="containers">
                        <PieChart highcharts={Highcharts} options={options}/>
                    </div>
                </div>
            </div>
        )
    }
}