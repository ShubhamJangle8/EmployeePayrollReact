import React, { useEffect, useState } from 'react';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import p from '../../assets/profile-images/Ellipse -1.png';
import p1 from '../../assets/profile-images/Ellipse -3.png';
import p2 from '../../assets/profile-images/Ellipse -7.png';
import p3 from '../../assets/profile-images/Ellipse -8.png'
import { useParams, Link, withRouter } from 'react-router-dom';
import EmployeeService from "../../services/employee-service";

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/images/logo.png' },
            { url: '../../assets/profile-images/Ellipse -1.png' },
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' }
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
        startDate: new Date(),
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
            startDate: '',
            notes: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const params = useParams();
    const employeeService = new EmployeeService();
    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) => {
        employeeService
            .getEmployee(id)
            .then((data) => {
                console.log("data is ", data.data);
                let obj = data.data;
                setData(obj);
            })
            .catch((err) => {
                console.log("err is ", err);
            });
    };

    const changeValue = (event) => {
        console.log(event.target.name+"=="+event.target.value);
        setForm({ ...formValue, [event.target.name]: event.target.value })
        
    }
    const setData = (obj) => {
        let array = obj.startDate.split(" ");
        console.log(obj);
        setForm({
            ...formValue,
            obj,
            name: obj.name,
            gender: obj.gender,
            salary: obj.salary,
            departmentValue: obj.department,
            notes: obj.notes,
            isUpdate: true,
            day: array[0],
            month: array[1],
            year: array[2],
            profileUrl: obj.profile
        });
        
    };
    const onCheckChange = (name) => {
        console.log(name)
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
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
            error.gender = 'Gender is required field'
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'Salary is required field'
            isError = true;
        }
        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'Profile is required field'
            isError = true;
        }

        if (formValue.departmentValue.length < 1) {
            error.department = 'Department is required field'
            isError = true;
        }
        if (formValue.notes.length < 1) {
            error.notes = 'Notes is required field'
            isError = true;
        }
        // if (formValue.startDate.length < 1) {
        //     error.startDate = 'Date is required field'
        //     isError = true;
        // }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validData()) {
            console.log("error", formValue);
            return;
        }
        let object = {
            name: formValue.name,
            // department: [],
            department: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.startDate}`,
            notes: formValue.notes,
            id: formValue.id,
            profile: formValue.profileUrl,
        };
        console.log(object.startDate)
        console.log(JSON.stringify(object));
        if (formValue.isUpdate) {
            employeeService
                .updateEmployee(object)
                .then((data) => {
                    console.log("data after update", data);
                    props.history.push("");
                })
                .catch((err) => {
                    console.log("Error after update");
                });
        } else {
            employeeService
                .addEmployee(object)
                .then((data) => {
                    console.log("Employee payroll added");
                    props.history.push("");
                })
                .catch((err) => {
                    console.log("error occured while adding employee");
                });
        }
    };

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });

        console.log(formValue);
    }
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
            <div className="form-content" id="formId">
                <form className="form" action="#" onReset="resetForm()" onSubmit={save}>
                    <div className="form-head">Employee Payroll Form </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Enter name here" />
                    </div><div className="error">{formValue.error.name}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profile">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" checked={formValue.profileUrl === '../assets/profile-images/Ellipse -1.png'} name="profileUrl"
                                    value="../assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                <img className="profile" src={p} alt="" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === '../assets/profile-images/Ellipse -3.png'} name="profileUrl"
                                    value="../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" src={p1} alt="" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === '../assets/profile-images/Ellipse -7.png'} name="profileUrl"
                                    value="../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" src={p2} alt="" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === '../assets/profile-images/Ellipse -8.png'} name="profileUrl"
                                    value="../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" src={p3} alt="" />
                            </label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.profileUrl}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.gender}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(name => (
                                <span key={name}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(name)} name={name}
                                        checked={getChecked(name)} value={name} />
                                    <label className="text" htmlFor={name}>{name}</label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="error">{formValue.error.department}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Choose your salary:</label>
                        <input className="slider" type="range" onChange={changeValue} min="300000" max="500000" step="100"
                            name="salary" id="salary" value={formValue.salary} />
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">StartDate</label>
                        <input type="date" id="date" name="startDate" onChange={changeValue} />
                    </div>
                    <div className="error">{formValue.error.startDate}</div>


                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea className="input" onChange={changeValue} id="notes" value={formValue.notes} name="notes"
                            placeholder="add notes..." ></textarea>
                    </div>
                    <div className="error">{formValue.error.notes}</div>
                    <div className="buttonParent">
                        <Link to="" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}



export default withRouter(PayrollForm);