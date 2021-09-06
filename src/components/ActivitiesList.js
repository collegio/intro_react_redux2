import React from 'react';
import ActivitiesListItem from './ActivitiesListItem';

const ActivitiesList = (props) => (
    <div className="activities-list">
        <h1>Activities List</h1>
        <div className="activity-list">
            {props.activities.map((activity) => {
                return <ActivitiesListItem key={activity.id} {...activity} />;
            })}
        </div>
    </div>
);

export default ActivitiesList;