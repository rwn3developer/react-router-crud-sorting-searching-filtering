import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View = () => {
    const navigate = useNavigate();
    let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
    const [record, setRecord] = useState(data);
    const [status, setStatus] = useState("");
    const [filterrecord, setFilterRecord] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [course, setCourse] = useState([])
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const deleteUser = (id) => {
        let d = record.filter(val => val.id !== id);
        localStorage.setItem('users', JSON.stringify(d));
        toast.error("Record Deleted");
        setFilterRecord(d);
    };

    useEffect(() => {
        let filtered = [...record];

        if (status) {
            filtered = filtered.filter(val => val.status === status);
        }

        if (search) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (sort) {
            if (sort == 'asc') {
                filtered.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            } else if (sort === 'dsc') {
                filtered.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
            }
        }

        if (course.length > 0) {
            filtered = filtered.filter(val => course.some(c => val.course.includes(c)));
            console.log(filtered);
        }

        if(startDate && endDate){
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = filtered.filter(val => {
                const date = new Date(val.date);
                return date >= start && date <= end;
            });
        }

        setFilterRecord(filtered);
    }, [status, search, sort, course,startDate,endDate]);

    // reset filter
    const resetFilter = () => {
        setFilterRecord(record)
        setSearch("")
        setSort("");
        setStatus("")
        setCourse([])
        setStartDate("")
        setEndDate("")
    }

    //course wise filter record
    const handleFilterCourse = (c, checked) => {
        let all = [...course];
        if (checked) {
            all.push(c)
        } else {
            all = all.filter(val => val != c)
        }
        setCourse(all)
    }



    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 mx-auto p-5 shadow">
                        <div className='d-flex justify-content-end'>
                            <Link to={`/add`}>
                                <button className='btn btn-primary btn-sm'>Add</button>
                            </Link>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-lg-3 mb-3">
                                <select onChange={(e) => setStatus(e.target.value)} className='form-control' value={status}>
                                    <option value="">---select status---</option>
                                    <option value="active">Active</option>
                                    <option value="unactive">Deactive</option>
                                </select>
                            </div>
                            <div className='col-lg-3'>
                                <form>
                                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className='form-control' placeholder='search here' />
                                </form>
                            </div>
                            <div className='col-lg-3'>
                                <select onChange={(e) => setSort(e.target.value)} className='form-control' value={sort}>
                                    <option value="">---select sorting---</option>
                                    <option value="asc">A-Z</option>
                                    <option value="dsc">Z-A</option>
                                </select>
                            </div>
                            <div className='col-lg-3'>
                                <button onClick={(e) => resetFilter()} className='btn btn-danger'>Reset</button>
                            </div>

                            {/* course wise filter */}
                            <div className='col-lg-6'>
                                {
                                    ["html", "css", "bootstrap", "js", "react js", "node js", "php", "angular", "python", "laravel"].map((c, index) => {
                                        return (
                                            <div key={++index} className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" checked={course.includes(c)} onChange={(e) => handleFilterCourse(c, e.target.checked)} />
                                                <label className="form-check-label" checked={c} htmlFor="inlineCheckbox1">{c}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>


                            {/* date wise filter */}
                            <div className='col-lg-6'>
                                <div className='d-flex justify-content-around'>
                                    <input type='date' className='form-control w-25' onChange={ (e) => setStartDate(e.target.value) } value={startDate} />
                                    <input type='date' className='form-control w-25' onChange={ (e) => setEndDate(e.target.value) } value={endDate} />
                                </div>
                            </div>


                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <button className='btn btn-danger btn-sm'>Delete</button>
                                    </th>
                                    <th>
                                        <button className='btn btn-info btn-sm'>Status</button>
                                    </th>
                                    <th scope="col">Srno</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterrecord.map((val, index) => (
                                        <tr key={val.id}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.gender}</td>
                                            <td style={{ width: '150px' }}>{val.course.join(' , ')}</td>
                                            <td>{val.date}</td>
                                            <td>
                                                {
                                                    val.status === "active" ? (
                                                        <button className='btn btn-success btn-sm'>{val.status}</button>
                                                    ) : (
                                                        <button className='btn btn-warning btn-sm'>{val.status}</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <button className='btn btn-danger btn-sm' onClick={() => deleteUser(val.id)}>Delete</button>
                                                <button onClick={() => navigate('/edit', { state: val })} className='btn btn-primary btn-sm mx-2'>Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default View;
