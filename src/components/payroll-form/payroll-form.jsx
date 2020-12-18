import React, {useState} from 'react'
import './payroll-form.scss'
import logo from '../../assets/images/logo.png';
import p from '../../assets/profile-images/Ellipse -1.png';
import p1 from '../../assets/profile-images/Ellipse -3.png';
import p2 from '../../assets/profile-images/Ellipse -7.png';
import p3  from '../../assets/profile-images/Ellipse -8.png'
import { withRouter } from 'react-router-dom';
const PayrollForm = (props) => {
  let initialValue = {
    name: '',
    profileArray: [
        {url: '../../assets/images/logo.png'},
        {url: '../../assets/profile-images/Ellipse -1.png'},
        {url: '../../assets/profile-images/Ellipse -3.png'},
        {url: '../../assets/profile-images/Ellipse -5.png'},
        {url: '../../assets/profile-images/Ellipse -7.png' }
    ],
    allDepartment: [
        'HR', "Sales", 'Finance', 'Engineer', 'Others'
    ],
    departmentValue: [],
    gender: '',
    salary: '',
    day: '1',
    month: 'Jan',
    year: '2020',
    startDate: '',
    notes: '',
    id: '',
    profileUrl: '',
    isUpdate: false,
    error: {
        department: '',
        name: '',
        gender: '',
        salary: '',
        profileUrl: '',
        startDate: ''
    }
  }
const [formValue, setForm] = useState(initialValue);
const changeValue = (event) => {
  setForm({ ...formValue, [event.target.name]: event.target.value })
}

const validData = async () => {
  let isError = false;
  let error = {
      department: '',
      name: '',
      gender: '',
      salary: '',
      profileUrl: '',
      startDate: ''
  }
  if (formValue.name.length < 1) {
      error.name = 'name is required field'
      isError = true;
  }
  if (formValue.gender.length < 1) {
      error.gender = 'gender is required field'
      isError = true;
  }
  if (formValue.salary.length < 1) {
      error.salary = 'salary is required field'
      isError = true;
  }
  if (formValue.profileUrl.length < 1) {
      error.profileUrl = 'profile is required field'
      isError = true;
  }

  if (formValue.departMentValue.length < 1) {
      error.department = 'department is required field'
      isError = true;
  }
  await setForm({ ...formValue, error: error })
  return isError;
}
  return (
    <div className="payroll-main">
      <header className="header header-content">
        <div className="logo-content">
          <img src={logo} alt="" />
          <div>
            <span className="emp-text">Employee</span><br/>
            <span className="emp-text emp-payroll">Payroll</span>
          </div>
        </div>
      </header>
      <div className="form-content">
        <form className="form" action="#">
          <div className="form-head">Employee Payroll Form</div>
          <div className="row-content">
            <label className="label text" htmlFor="name">Name</label>
            <input className="input" type="text" id="name" name="name" placeholder="Your name"></input>
          </div>
          <div className = "row-content">
            <label className = "label text" for = "profile">Profile Image</label>
            <div className = "profile-radio-content">
              <label>
                  <input type = "radio" name = "profileUrl"
                          value ="../../assets/profile-images/Ellipse -1.png" required />
                  <img src={p} className = "profile" alt="" />
              </label>
              <label>
              <input type = "radio" name = "profileUrl"
                          value ="../../assets/profile-images/Ellipse -1.png" required />
                  <img src={p1} className = "profile" alt="" />
              </label>
              <label>
              <input type = "radio" name = "profileUrl"
                          value ="../../assets/profile-images/Ellipse -1.png" required />
                  <img src={p2} className = "profile" alt="" />
              </label>
              <label>
              <input type = "radio" name = "profileUrl"
                          value ="../../assets/profile-images/Ellipse -1.png" required />
                  <img src={p3} className = "profile" alt="" />
              </label>
            </div>
          </div>
          <div className = "row-content">
            <label className = "label text" for = "gender">Gender</label>
            <div>
              <input type = "radio" id = "male" name = "gender" value = "male" />
              <label className = "text" for = "male">Male</label>
                <input type = "radio" id = "female" name = "gender" value = "female" />
              <label className = "text" for = "female">Female</label>                       
            </div>
          </div>
          <div className = "row-content">
            <label className = "label text" htmlFor = "department">Department</label>
            <div>
              {formValue.allDepartment.map(item =>(
                <span key ={item}>
                  <input className = "checkbox" type = "checkbox" name = {item} value ={item} />
                  <label className = "text"></label>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>

    </div> 
  );
  }

export default PayrollForm;