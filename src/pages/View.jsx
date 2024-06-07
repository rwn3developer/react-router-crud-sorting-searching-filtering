import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const View = () => {
    const navigate = useNavigate()
    let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
    const [record, setRecord] = useState(data)
    const [status, setStatus] = useState("")
    const [filterrecord, setFilterRecord] = useState([])
    const [search,setSearch] = useState("")

    

    const deleteUser = (id) => {
        let d = record.filter(val => val.id != id);
        localStorage.setItem('users', JSON.stringify(d));
        toast.error("Record Delete");
        setRecord(d);
    }

    useEffect(() => {

        let filtered = record;

        if (status) {
            filtered = filtered.filter(val => val.status === status);
        }else{
            filtered = record
        }
    
        if (search) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilterRecord(filtered);
    }, [status,search])


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
                            <div className="col-lg-4 mb-3">
                                <select onChange={(e) => setStatus(e.target.value)} className='form-control'>
                                    <option value="">---select status---</option>
                                    <option value="active">Active</option>
                                    <option value="unactive">Deactive</option>
                                </select>
                            </div>
                            <div className='col-lg-4'>
                                <form>
                                    <input type="text" onChange={ (e) => setSearch(e.target.value) } className='form-control' placeholder='search here'/>
                                </form>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
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
                                        filterrecord.map((val) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td>{val.id}</td>
                                                    <td>{val.name}</td>
                                                    <td>{val.email}</td>
                                                    <td>{val.gender}</td>
                                                    <td style={{ width: '300px' }}>{val.course.join(' , ')}</td>
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
                                            )
                                        }) 
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default View
