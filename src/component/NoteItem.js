import React from 'react';

function NoteItem(props) {
    const { data } = props;
    return (
        <>
           <div className="col-sm-3">
           <div className="card" >
                <div className="card-body">
                    <h5>{data.title}</h5>
                    <h6>{data.description}</h6>
                    <p>{data.tag}</p>
                </div>
            </div>
           </div>
        </>
    );
}

export default NoteItem;