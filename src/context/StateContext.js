import { useState } from "react";
import NoteContext from "./NoteContext";

const StateContext = (props) => {
    // const data={
    //     id:"101",
    //     name:"hello"
    // }/value={data}

    const host = "http://localhost:3001";

    // const noteinitialize = [
    //     {
    //         "_id": "67e66ceec2df5187a5688686",
    //         "user": "67e666e19578bd013aee6f1c",
    //         "title": "dori",
    //         "description": "it's a cartoon movie ",
    //         "tag": "cartoon movie",
    //         "date": "2025-03-28T09:33:34.021Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67e66d362dd31f5dfba01f8b",
    //         "user": "67e666e19578bd013aee6f1c",
    //         "title": "pokemon",
    //         "description": "cartoon",
    //         "tag": "kartoon",
    //         "date": "2025-03-28T09:34:46.804Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "67e66d3d2dd31f5dfba01f8d",
    //         "user": "67e666e19578bd013aee6f1c",
    //         "title": "doramon",
    //         "description": "cartoon",
    //         "tag": "kartoon",
    //         "date": "2025-03-28T09:34:53.763Z",
    //         "__v": 0
    //     }
    // ];

    const noteinitialize = [];

    const [notes, setNotes] = useState(noteinitialize);//used to add new note also

    // @@@@@@@@@@@@@@@@ add new notes
    const GetNote = async () => {
        // server side
        const response = await fetch(`${host}/note/fetchnote`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTc4ZDRlY2U0M2IwMTJmOGQyNzYyMyIsImlhdCI6MTc0MzIyODIzOH0.yYqeXToHAtch2qrZR5DsRPH_UdUhuyhL0MZHkNkC4Dw"
            },
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json.userid );//this userid come from the bakend when fetch data
    };



    // @@@@@@@@@@@@@@@@ add new notes
    const AddNote = async (title, description, tag) => {
        // server side
        const response = await fetch(`${host}/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        // setNotes(notes.concat(note))
        setNotes((prevNotes) => [...prevNotes, note]); 



        // add new note at client side
        // const note = {
        //     "_id": "67e66d3d2dd31f5dfba01f118d",
        //     "user": "67e666e19578bd013aee6f1c",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2025-03-28T09:34:53.763Z",
        //     "__v": 0
        // };
        // setNotes(notes.concat(note));
    };

    // @@@@@@@@@@@@@@@@ delete notes
    const DeleteNote = async (id) => {
        // server side
        const response = await fetch(`${host}/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        });
        await response.json();


        // client side
        // console.log(id);
        const deleteid = notes.filter((item) => { return item._id !== id; });
        setNotes(deleteid);
    };

    // @@@@@@@@@@@@@@@@ update notes
    const EditNote = async (id, title, description, tag) => {
        // server side
        const response = await fetch(`${host}/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        await response.json();
        // console.log(id);


        // client side
        const newarray = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newarray.length; i++) {
            const storedata = newarray[i];
            if (storedata._id === id) {
                newarray[i].title = title;
                newarray[i].description = description;
                newarray[i].tag = tag;
                break;
            }
        }
        setNotes(newarray);
        console.log(newarray);
    };

    return (
        <NoteContext.Provider value={{ notes, AddNote, DeleteNote, EditNote, GetNote }}>
            {props.children}
        </NoteContext.Provider>
    );

};
export default StateContext; 