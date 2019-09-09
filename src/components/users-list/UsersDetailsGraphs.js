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
    series: [
      {
        data: [
          {
            y: 300
          },
          {
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
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle button_Dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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