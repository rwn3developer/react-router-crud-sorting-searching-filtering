import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Add = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectcourse, setSelectCourse] = useState([]);
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
    const [record, setRecord] = useState(data)

    const handleCourseChange = (course, checked) => {
        let all = [...selectcourse];
        if (checked) {
            all.push(course);
        } else {
            all = all.filter(val => val != course);
        }
        setSelectCourse(all)
    }

    let course = ["html", "css", "bootstrap", "js", "react js", "node js", "php", "angular", "python", "laravel"]

    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            id: Math.floor(Math.random() * 10000),
            name: name,
            email: email,
            password: password,
            gender: gender,
            course: selectcourse,
            date: date,
            status : status
        }
        let newrecord = [...record, obj]
        localStorage.setItem('users', JSON.stringify(newrecord));
        toast.success("Record Add");
        setName("");
        setEmail("");
        setPassword("");
        setGender("");
        setSelectCourse([]);
        setDate("")
    }


    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-9 mx-auto">
                        <div className="card">
                            <div className="card-header d-flex justify-content-end">
                                <Link to={`/`}>
                                    <button className='btn btn-primary btn-sm'>View</button>
                                </Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter Your Name' />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Your Email' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Your Password' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Gender</label>
                                        <div>
                                            <div className="form-check">
                                                <input className="form-check-input" value="male" onChange={(e) => setGender(e.target.value)} type="radio" checked={gender === "male"} name="flexRadioDefault" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" value="female" onChange={(e) => setGender(e.target.value)} name="flexRadioDefault" checked={gender === "female"} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="exampleInputPassword1" className="form-label">Course</label>
                                        <div>
                                            {
                                                course.map((c, index) => {
                                                    return (
                                                        <div key={++index} className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" checked={selectcourse.includes(c)} onChange={(e) => handleCourseChange(c, e.target.checked)} />
                                                            <label className="form-check-label" checked={c} htmlFor="inlineCheckbox1">{c}</label>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="exampleInputPassword1" className="form-label">Date</label>
                                        <input type="date" onChange={(e) => setDate(e.target.value)} value={date} className='form-control w-25' />
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="exampleInputPassword1" className="form-label">Select status</label>
                                        <select onChange={ (e) => setStatus(e.target.value) } value={status}className='form-control'>
                                            <option>---select status---</option>
                                            <option value="active">active</option>
                                            <option value="unactive">unactive</option>
                                        </select>
                                    </div>


                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>

                            </div>
                        </div>




                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Add
