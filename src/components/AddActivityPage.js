import React from 'react';
import ActivityForm from './ActivityForm';

const AddActivityPage = (props) => (
    <div className="container">
        <h1>Add a Activity</h1>
        <ActivityForm 
            onSubmit={(activity) => {
                alert("You still need to add your create activity code!");
            }}
        />
    </div>
);

export default AddActivityPage;