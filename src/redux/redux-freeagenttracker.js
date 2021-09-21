import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ACTION GENERATORS

const addActivity = ({ name, message = '', sport_type = 'hockey', skill_level = 'basic', gender = 'Male' } = {}) => ({
    type: 'ADD_ACTIVITY',
    activity: {
        id: uuid(),
        name,
        sport_type,
        gender,
        skill_level,
        message
    }
})
  
const removeActivity = ({ id } = {}) => ({
    type: 'REMOVE_ACTIVITY',
    id
});

const editActivity = (id, updates) => ({
    type: 'EDIT_ACTIVITY',
    id,
    updates
});

const setFilterText = (text = '') => ({
    type: 'SET_FILTER_TEXT',
    text
});

const setFilterType = (sport_type = 'all') => ({
    type: 'SET_FILTER_TYPE',
    sport_type
});

const sortByName = () => ({
    type: 'SORT_BY_NAME'
});

const sortBySkill = () => ({
    type: 'SORT_BY_SKILL'
});

// REDUCERS

// the default list of free agents, which is empty
const freeAgentDefaultState = [];

const freeAgentReducer = (state = freeAgentDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return [
                ...state,
                action.activity
            ];

        case 'REMOVE_ACTIVITY':
            return state.filter(({ id }) => id !== action.id);

        case 'EDIT_ACTIVITY':
            return state.map((activity) => {
                if (activity.id === action.id) {
                    return {
                        ...activity,
                        ...action.updates
                    };
                }
                else {
                    return activity;
                }
            });

        default:
            return state;
    }
};

// the default items that we can possibly filter by
const filtersDefaultState = {
    text: '',
    sport_type: 'all',
    skill_level: 'all',
    sort_by: 'name'
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_TEXT':
            return {
                ...state,
                text: action.text
            };
        case 'SET_FILTER_TYPE':
            return {
                ...state,
                sport_type: action.sport_type
            };
        case 'SORT_BY_NAME':
            return {
                ...state,
                sort_by: 'name'
            };
        case 'SORT_BY_SKILL':
            return {
                ...state,
                sort_by: 'skill_level'
            };
        default:
            return state;
    }
};

// Get visible activities
const getVisibleActivities = (activities, { text, sport_type, skill_level, sort_by }) => {
    return activities.filter((activity) => {

        // match the text search
        const textNameMatch = activity.name.toLowerCase().includes(text.toLowerCase());
        const textMessageMatch = activity.message.toLowerCase().includes(text.toLowerCase());

        // match the sport type
        let typeMatch = false;
        if (sport_type == 'all' || sport_type == activity.sport_type) {
            typeMatch = true;
        }

        // match the skill level
        let skillMatch = false;
        if (skill_level == 'all' || skill_level == activity.skill_level) {
            skillMatch = true;
        }

        return (textNameMatch || textMessageMatch) && typeMatch && skillMatch;

    }).sort((a, b) => {

        if (sort_by === 'name') {
            return a.name > b.name ? 1 : -1;
        } else if (sort_by === 'skill_level') {
            return a.skill_level > b.skill_level ? 1 : -1;
        }
    });
};

// use combineReducers to specify which data to control which reducers
const store = createStore(
    combineReducers({
        activities: freeAgentReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleActivities = getVisibleActivities(state.activities, state.filters);
    console.log(visibleActivities);
});

console.log("#####Add 2 Activities#####");
const activityOne = store.dispatch(addActivity({ name: 'Rob Myers', skill_level: 'intermediate', sport_type: 'softball' }));
const activityTwo = store.dispatch(addActivity({ name: 'Jane Doe', skill_level: 'expert', gender: 'Female', message: 'I love softball', sport_type: 'hockey'  }));

console.log("#####Remove and Update Activities#####");
// store.dispatch(removeActivity({ id: activityOne.activity.id }));
store.dispatch(editActivity(activityOne.activity.id, { skill_level: 'basic' }));

console.log("#####Filter Type 'hockey'#####");
store.dispatch(setFilterType('hockey'));

console.log("#####Filter Type 'softball'#####");
store.dispatch(setFilterType('softball'));

console.log("#####Remove Filter#####");
store.dispatch(setFilterType());

console.log("#####Filter for 'love'#####");
store.dispatch(setFilterText('love'));

console.log("#####Remove Filter#####");
store.dispatch(setFilterText());

console.log("#####Sorting by Name#####");
store.dispatch(sortByName());

console.log("#####Sorting by Skill#####");
store.dispatch(sortBySkill());
