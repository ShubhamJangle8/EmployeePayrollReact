import React from "react";
import searchIcon from "../../assets/icons/search.png"
import addIcon from "../../assets/icons/add-24px.svg"
import "./home.scss";
import EmployeeService from "../../services/employee-service"
import Display from "../Display/display"
import logo from "../../assets/images/logo.png"
// import SearchBar from "material-ui-search-bar";
// import { Link } from "react-router-dom";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchExpand: false,
      employeeArray: [],
      AllEmployeeArray: [],
    };
    this.employeeService = new EmployeeService();
  }
  openSearch = () => {
    this.setState({ searchExpand: true });
  };
  componentDidMount() {
    this.getAllEmployee();
  }

  getAllEmployee = () => {
    this.employeeService
      .getAllEmployee()
      .then((data) => {
        this.setState({ 
          employeeArray: data.data.data,
          AllEmployeeArray: data.data.data,
        });
      })
      .catch((err) => {
        console.log("err after ", err);
      });
  };
  search = async (event) => {
    let search = event.target.value;
    await this.setState({ employeeArray: this.state.AllEmployeeArray });
    let empArray = this.state.employeeArray;
    if (search.trim().length > 0)
      empArray = empArray.filter(
        (element) =>
          element.name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    this.setState({ employeeArray: empArray });
  };

  render() {
    return (
      <div>
        <header className="header-content header">
          <div className="logo-content">
            <img src={logo} alt="Logo" />
            <div>
              <span className="emp-text">EMPLOYEE</span><br />
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div>
        </header>
        <div className="column content">
          <div className="emp-detail">
            <div className="detail-text">
              Employee Details <div className="count">{this.state.employeeArray.length}</div>
            </div>
            <div className="search-box" onClick={this.openSearch}>
              <input
                className={
                  "input " + (this.state.searchExpand && "input-expand")
                }
                onChange={this.search}
                type="text"
                placeholder="Search..."
              />
              <img className="search-icon" src={searchIcon} alt="" />
            </div>
            <div className="row center button-box">
              <a href="http://localhost:3002/employee" className='add-button flex-row-center'>
                <img className="add-icon" src={addIcon} alt="Add User" />Add User
              </a>
            </div>
          </div>
          <div className="table-main">
            <Display
              employeeArray={this.state.employeeArray}
              getAllEmployee={this.getAllEmployee}
            />
          </div>
        </div>
      </div>
    );
  }
}