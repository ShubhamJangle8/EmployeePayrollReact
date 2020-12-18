import React, { useEffect, useState} from 'react';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import p from '../../assets/profile-images/Ellipse -1.png';
import p1 from '../../assets/profile-images/Ellipse -3.png';
import p2 from '../../assets/profile-images/Ellipse -7.png';
import p3  from '../../assets/profile-images/Ellipse -8.png'
import { useParams,Link,withRouter } from 'react-router-dom';

const PayrollForm = (props) => {
        let initialValue = {
            name: '',
            profileArray: [
                {url: '../payroll-form/assets/images/logo.png'},
                {url: '../payroll-form/assets/profile-images/Ellipse -1.png'},
                {url: '../payroll-form/assets/profile-images/Ellipse -3.png'},
                {url: '../payroll-form/assets/profile-images/Ellipse -7.png'},
                {url: '../payroll-form/assets/profile-images/Ellipse -8.png' }
            ],
            allDepartment: [
                'HR', "Sales", 'Finance', 'Engineer', 'Others'
            ],
            departmentValue: [],
            gender: '',
            salary: '400000',
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
    
    const onCheckChange = (name) =>{
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if(index > -1){
            checkArray.splice(index,1)
        }else{
            checkArray.push(name);
        }

        setForm({...formValue, departmentValue: checkArray});
    }
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
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

        if (formValue.departmentValue.length < 1) {
            error.department = 'department is required field'
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
    }
    const reset = () => {
        console.log(formValue);
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
        console.log(formValue);
    }
    const departments = ["HR", "Sales", "Finance", "Engineer", "Others"];

    function Department(props){
        return (<>
            <input className="checkbox" type="checkbox" id={props.department} onChange={() => onCheckChange(props.department)} 
                    defaultChecked={getChecked(props.department)} name="department" value={props.department} />
            <label className="text" htmlFor={props.department}>{props.department}</label>
        </>);
    }
    return(
        <div>
      <header className = "header-content header">
            <div className = "logo-content">
            <img src ={logo} alt ="Logo" />
                <div>
                    <span className = "emp-text">EMPLOYEE</span><br></br>
                    <span className = "emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
        </header>
        <div className ="form-content" id = "formId">
        <form className = "form" action = "#" onReset = {reset} onSubmit = {save}>
        <div className="form-head">Employee Payroll Form </div>
            <div className="row-content">
            <label className="label text" for ="name">Name</label>
            <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Enter name here" required/>
            </div><div className="error-output">{formValue.error.name}</div> 
        
        
        <div className = "row-content">
                    <label className = "label text" for = "profile">Profile Image</label>
                    <div className = "profile-radio-content">
                        <label>
                            <input type = "radio" checked={formValue.profileUrl==='../assets/profile-images/Ellipse -1.png'} name = "profileUrl"
                                   value ="../assets/profile-images/Ellipse -1.png" onChange={changeValue} required />
                            <img className = "profile" src={p} alt="" />
                        </label>
                        <label>
                            <input type = "radio" checked={formValue.profileUrl==='../assets/profile-images/Ellipse -3.png'} name = "profileUrl"
                                   value ="../assets/profile-images/Ellipse -3.png" onChange={changeValue} required />
                            <img className = "profile" src={p1} alt="" />
                        </label>
                        <label>
                            <input type = "radio" checked={formValue.profileUrl==='../assets/profile-images/Ellipse -7.png'} name = "profileUrl"
                                   value ="../assets/profile-images/Ellipse -7.png" onChange={changeValue} required />
                            <img className = "profile" src = {p2} alt=""/>
                        </label>
                        <label>
                            <input type = "radio" checked={formValue.profileUrl==='../assets/profile-images/Ellipse 1.png'} name = "profileUrl"
                                   value ="../assets/profile-images/Ellipse 1.png" onChange={changeValue} required />
                            <img className = "profile" src = {p3} alt=""/>
                        </label>
                    </div>
                </div>
                <div className="error-output">{formValue.error.profileUrl}</div>
                <div className = "row-content">
                    <label className = "label text" for = "gender">Gender</label>
                    <div>
                        <input type = "radio" id = "male" onChange={changeValue} name = "gender" value = "male" />
                        <label className = "text" for = "male">Male</label>
                        <input type = "radio" id = "female" onChange={changeValue} name = "gender" value = "female" />
                        <label className = "text" for = "female">Female</label>                       
                    </div>
                </div>
                <div className="error-output">{formValue.error.gender}</div>
                {/* <div className = "row-content">
                    <label className = "label text" htmlFor = "department">Department</label>
                    <div>
                        {formValue.allDepartment.map(item =>(
                            <span key ={item}>
                                <input className = "checkbox" type = "checkbox" onChange={() => onCheckChange(item)} name = {item} 
                                defaultChecked={() => getChecked(item)} value ={item} />
                        <label className = "text" htmlFor ={item}>{item}</label>
                            </span>
                        ))}
                        </div>
                </div> */}
                <div className="row-content">
                    <label className="label text" htmlFor="department">Department</label>
                    <div>
                        {departments.map((department) => <Department key={department.toString()} department={department} />)}
                    </div>
                </div>
                <div className="error-output">{formValue.error.department}</div>
                <div className = "row-content">
                    <label className = "label text" htmlFor = "salary">Choose your salary:</label>
                    <input className = "slider" type = "range" min = "300000" max = "500000" step = "100"
                           name = "salary" id = "salary" defaultValue = {formValue.salary} onChange = {changeValue}  />
                    <output className = "salary-output text" htmlFor = "salary">{formValue.salary}</output>
                </div>
                <div className = "row-content">
                    <label className = "label text" for = "startDate">StartDate</label>
                      <div id = "date">
                        <select onChange={changeValue} id = "day" name ="Day">
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                            <option value = "6">6</option>
                            <option value = "7">7</option>
                            <option value = "8">8</option>
                            <option value = "9">9</option>
                            <option value = "10">10</option>
                            <option value = "11">11</option>
                            <option value = "12">12</option>
                            <option value = "13">13</option>
                            <option value = "14">14</option>
                            <option value = "15">15</option>
                            <option value = "16">16</option>
                            <option value = "17">17</option>
                            <option value = "18">18</option>
                            <option value = "19">19</option>
                            <option value = "20">20</option>
                            <option value = "21">21</option>
                            <option value = "22">22</option>
                            <option value = "23">23</option>
                            <option value = "24">24</option>
                            <option value = "25">25</option>
                            <option value = "26">26</option>
                            <option value = "27">27</option>
                            <option value = "28">28</option>
                            <option value = "29">29</option>
                            <option value = "30">30</option>
                            <option value = "31">31</option>
                        </select>
                        <select onChange={changeValue} id = "month" name = "Month">
                            <option value = "Jan">January</option>
                            <option value = "Feb">February</option>
                            <option value = "March">March</option>
                            <option value = "April">April</option>
                            <option value = "May">May</option>
                            <option value = "June">June</option>
                            <option value = "July">July</option>
                            <option value = "Aug">August</option>
                            <option value = "Sept">September</option>
                            <option value = "Oct">October</option>
                            <option value = "Nov">November</option>
                            <option value = "Dec">December</option>
                        </select>
                        <select onChange={changeValue} id = "year" name = "Year">
                            <option value = "2020">2020</option>
                            <option value = "2019">2019</option>
                            <option value = "2018">2018</option>
                            <option value = "2017">2017</option>
                            <option value = "2016">2016</option>
                        </select>
                    </div>
                    </div>
                    <div className="error-output">{formValue.error.startDate}</div>
                
                
                <div className = "row-content">
                    <label className = "label text" for = "notes">Notes</label>
                    <textarea className = "input" onChange={changeValue} id = "notes" value={formValue.notes} name = "notes"
                              placeholder = "" ></textarea>
                </div>
                <div className="buttonParent">
                            <a routerLink="./home.html" className="resetButton button cancelButton">cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }



export default withRouter(PayrollForm);