import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";

function showEditForm(tour, setEditForm, setTourList, tourList) {
    return (
        <>
            <hr/>
            <Formik
                initialValues={{id: tour.id, title: tour.title, price: tour.price, description: tour.description}}
                enableReinitialize={true}
                onSubmit={(value, {resetForm}) => {
                    axios.put(`http://localhost:3001/tuors/${tour.id}`, value)
                        .then(() => {
                            setTourList(tourList.map(t => t.id === tour.id ? value : t))
                            setEditForm('')
                            alert('Success edited')
                        })
                }}
            >
                <Form>
                    <h2>Edit Form</h2>
                    <div>
                        <label htmlFor="">Title: </label>
                        <Field name={'title'} type={'text'} placeholder={'Title...'}/>
                    </div>
                    <div>
                        <label htmlFor="">Price: </label>
                        <Field name={'price'} type={'text'} placeholder={'Price...'}/>
                    </div>
                    <div>
                        <label htmlFor="">Description: </label>
                        <Field name={'description'} type="textarea" placeholder={'Description...'}/>
                    </div>
                    <button>Submit</button>
                    <button onClick={() => setEditForm('')}>Cancel</button>
                </Form>
            </Formik>
        </>
    )
}

function showDetail(tour, setDetail) {
    return (
        <>
            <hr/>
            <h2>Detail</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>{tour.id}</td>
                    <td>{tour.title}</td>
                    <td>{tour.price}</td>
                    <td>{tour.description}</td>
                </tr>
            </table>
            <button onClick={() => setDetail('')}>Return</button>
        </>
    )
}

function showAddForm(setAddForm) {
    return(
        <>
            <Formik
                initialValues={{title: '', price: '', description: ''}}
                onSubmit={(values, {resetForm}) => {
                    axios.post('http://localhost:3001/tuors', values)
                        .then((res) => {
                            window.location.reload()
                            resetForm()
                            alert('Success added')
                        })
                }}
            >
                <Form>
                    <h2>Add Form</h2>
                    <div>
                        <Field name={'title'} type={'text'} placeholder={'Title...'}/>
                    </div>
                    <div>
                        <Field name={'price'} type={'text'} placeholder={'Price...'}/>
                    </div>
                    <div>
                        <Field name={'description'} type="textarea" placeholder={'Description...'}/>
                    </div>
                    <button>Add</button>
                    <button onClick={() => setAddForm('')}>Cancel</button>
                    <hr/>
                </Form>
            </Formik>
        </>
    )

}

function App() {
    const [tourList, setTourList] = useState([])
    const [editForm, setEditForm] = useState('')
    const [detail, setDetail] = useState('')
    const [addForm, setAddForm] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/tuors')
            .then((res) => {
                setTourList(res.data)
            })
    }, [])

    return (
        <>
            <h1>Tour List</h1>

            <button onClick={() => setAddForm(showAddForm(setAddForm))}>Add Tour</button>

            <div>{addForm}</div>
            <table>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th colSpan={3}>Description</th>
                </tr>
                {tourList.map((tour) => (
                    <tr>
                        {/*<td>{tour.id}</td>*/}
                        <td>{tour.title}</td>
                        <td>{tour.price}</td>
                        <td>{tour.description}</td>
                        <td>
                            <button onClick={() => {
                                axios.delete(`http://localhost:3001/tuors/${tour.id}`)
                                    .then(() => {
                                        setTourList(tourList.filter(t => t !== tour))
                                        alert("Success deleted")})
                            }}>Delete
                            </button>
                        </td>
                        <td ><button onClick={() =>
                            setEditForm(showEditForm(tour, setEditForm, setTourList, tourList))}>Edit</button>
                        </td>
                        <td><button  onClick={() => setDetail(showDetail(tour, setDetail))}>Detail</button>
                        </td>
                    </tr>
                ))}
            </table>
            <div>{editForm}</div>
            <div>{detail}</div>
        </>
    );
}

export default App;
