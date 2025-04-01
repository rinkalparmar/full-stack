import React, { useContext, useState, useRef, useEffect } from 'react';
import NoteContext from '../context/NoteContext';
import NewNoteAdd from './NewNoteAdd';
import { useNavigate } from "react-router";



function Note() {
    const context = useContext(NoteContext);
    const { notes, DeleteNote, EditNote, GetNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            GetNote();
            navigate("/Home");
        }
        else {
            navigate("/Login");
        }
    }, [navigate]);
    const [input, setInput] = useState({ id: "", updatetitle: "", updatedescription: "", updatetag: "" });

    const changeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInput((input) => ({ ...input, [name]: value }));
    };

    const ref = useRef(null);//used to give single reference to only one element must used with current keywird

    const UpdateNote = (data) => {
        ref.current.click();
        setInput({
            id: data._id,
            updatetitle: data.title,
            updatedescription: data.description,
            updatetag: data.tag,
        });
    };

    const handleChangeSubmit = (event) => {
        console.log("update" + JSON.stringify(input));
        event.preventDefault();
        EditNote(input.id, input.updatetitle, input.updatedescription, input.updatetag);
    };


    return (
        <>
            <NewNoteAdd />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleChangeSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">title</label>
                                    <input type="text" className="form-control" onChange={changeInput} value={input.updatetitle} name="updatetitle" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">description</label>
                                    <input type="text" className="form-control" onChange={changeInput} value={input.updatedescription} name='updatedescription' />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">tag</label>
                                    <input type="text" className="form-control" onChange={changeInput} value={input.updatetag} name='updatetag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleChangeSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Your Notes</h3>
            <div className="row" >
                {Array.isArray(notes) ? notes.map((data) => {
                    return <div className="col-sm-3" key={data._id || Math.random().toString(36).substr(2, 9)}>
                        <div className="card" >
                            <div className="card-body">
                                <h5>{data.title}</h5>
                                <h6>{data.description}</h6>
                                <p>{data.tag}</p>
                                <i className="fa-solid fa-trash mx-3" onClick={() => { DeleteNote(data._id); }}></i>
                                <i className="fa-solid fa-pen-to-square" onClick={() => { UpdateNote(data); }}></i>
                            </div>
                        </div>
                    </div>;
                }) : ""}
            </div>

        </>
    );
}

export default Note;