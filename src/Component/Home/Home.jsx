import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Home() {
    let token = localStorage.getItem('token');
    let baseUrl = "https://note-sigma-black.vercel.app/api/v1"
    const [Notes, setNotes] = useState([]);
    const [Note, setNote] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        getUserNotes();
        return () => {

        }
    }, [])

    // Get User Notes from server
    /**
     * get user notes function
     * send request to server to get user notes
     * if success set notes state
     * if error set notes state to empty array
     */
    async function getUserNotes() {
        setLoading(false);
        try {
            const token = localStorage.getItem('token');
            let { data } = await axios.get(baseUrl + "/notes", {
                headers: {
                    "token": token
                }
            })
            setLoading(true);
            setNotes(data.notes)
        }
        catch (error) {
            let { data } = error.response;
            console.log(data);
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: data.msg,
                footer: 'try to add Note to get started!'
            })
            setNotes([]);
        }

    }
    //get new Note from user
    /**
     * get note function
     * be listen to input change
     * and set note state
     * 
     */
    function getNote({ target }) {
        setNote({ ...Note, [target.name]: target.value });
    }

    //   Add Note
    /**
     * add note function
     * add note to server
     * is success get user notes again
     * and show success message
     */
    async function addNote(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            let { data } = await axios.post(baseUrl + '/notes', {
                ...Note,
            }, {
                headers: { token }
            })
            if (data.msg === 'done') {

                Swal.fire('Added', 'Note Added Successfully', 'success').then(() => {
                    getUserNotes();
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    /*
    *delete Note function 
    * take note id as parameter
    * send request to server to delete note
    * if success get user notes again
    * if error show error message
    */
    async function deleteNote(noteID) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                (async () => {
                    const token = localStorage.getItem("token");
                    let { data } =await axios.delete(baseUrl + "/notes/" + noteID, {
                        headers: {
                            "token": token
                        }
                    })

                    if (data.msg == "done") {
                        setTimeout(() => {
                            getUserNotes()
                        }, 2000);
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted .',
                            'success'
                        )
                    }
                })();


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    }

    //update note function
    /*
     * function to update note data in server 
     * take index of the note as parameter
     * save note data in server
     * get new notes from server
     */
    function getNotetoEdition(index) {
        console.log(Notes[index]);
        document.querySelector("#EditionModal1 input").value = Notes[index].title;
        document.querySelector("#EditionModal1 textarea").value = Notes[index].content;
        setNote({ ...Note, "title": Notes[index].title, "content": Notes[index].content, "NoteID": Notes[index]._id })
    }
    function updateNote(e) {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to Update this Note!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                (async () => {
                    const headers = {
                        'token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                      };                      
                    console.log(Note);
                    let { data } = await axios.put(baseUrl + "/notes/"+Note.NoteID, { ...Note },{headers:headers})
                    console.log(data);
                    if (data.msg == "done") {
                        getUserNotes()
                        swalWithBootstrapButtons.fire(
                            'Updated!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })();


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    return <React.Fragment>
        <div className="container my-5">
            <div className="col-md-12 text-end">
                <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                    New</a>
            </div>
        </div>


        {/* <!-- Add Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form id="add-form" onSubmit={addNote} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                            <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="content" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        {/* <!-- Edit Modal --> */}
        <div className="modal fade" id="EditionModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form id="edit-form" onSubmit={updateNote}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                            <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="content" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                            <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>



        {/* <!-- ==========================Notes=============================== --> */}
        <div className="container">
            <div className="row">

                {Notes.map((note, index) => {
                    return <div key={index} className="col-md-4 my-4">
                        <div className="note p-4">
                            <h3 className="float-start">{note.title}</h3>
                            <a onClick={() => { getNotetoEdition(index) }} data-bs-toggle="modal" data-bs-target="#EditionModal1" ><i className="fas fa-edit float-end edit"></i></a>
                            <a onClick={() => { deleteNote(note._id) }}> <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                            <span className="clearfix"></span>
                            <pre>{note.content}</pre>
                        </div>
                    </div>
                })}



            </div>

            {Notes.length == 0 && loading ? <div className="row">
                <h2 className='text-white text-center '>No notes found</h2>
            </div> : ""}
        </div>




    </React.Fragment>
}