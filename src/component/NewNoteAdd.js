import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

function NewNoteAdd() {
    const context = useContext(NoteContext);
    const { AddNote } = context;

    const [input, setInput] = useState({title:"",description:"",tag:""});

    const changeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInput((input) => ({ ...input, [name]: value }));
    };

    const handleChangeSubmit = (event) => {
        event.preventDefault();
        AddNote(input.title,input.description,input.tag);   
        setInput({title:"",description:"",tag:""})
    };
    return (
        <>
            <div className="container">
                <form onSubmit={handleChangeSubmit}>
                    <h2>Add New Notes</h2>
                    <div className="mb-3">
                        <label className="form-label">title</label>
                        <input type="text" className="form-control" onChange={changeInput} value={input.title} name="title"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">description</label>
                        <input type="text" className="form-control" onChange={changeInput} value={input.description} name='description'/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">tag</label>
                        <input type="text" className="form-control" onChange={changeInput} value={input.tag} name='tag'/>
                    </div>
                    <button type="submit" className="btn btn-primary my-4">Submit</button>
                </form>
            </div>
        </>
    );
}

export default NewNoteAdd;