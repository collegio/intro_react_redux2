import React from 'react';
import ActivityForm from './ActivityForm';

const EditActivityPage = (props) => {
    return (
        <div className="container">
            <h1>Edit Activity</h1>
            <ActivityForm
                activity={props.activity}
                onSubmit={(activity) => {
                    alert ("Add Edit Activity code!");
                }}
            />
            <button className="button button-delete" onClick={() => {
                alert ("Add Remove Activity code!");
            }}>Remove</button>
        </div>
    );
}

export default EditActivityPage;