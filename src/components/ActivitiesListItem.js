import React from 'react';
import { Link } from 'react-router-dom';

const ActivitiesListItem = ({ dispatch, id, name, sport_type, skill_level, gender, message }) => (
    <div className="activity">
        <div className="activity-info">
            <p>
                <Link to={'/edit/'+id}>
                    {name} ({gender})<br />
                </Link>
                {sport_type} - {skill_level}<br /><br />
                {message}
            </p>
            <button className="button button-clear" onClick={() => {
                alert("Add Remove Activity code!");
            }}>Remove</button>
        </div>
    </div>
);

export default ActivitiesListItem;