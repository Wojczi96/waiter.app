import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config.js'

//selectors
export const getAllTables = state => state.tables;
export const getTableById = (state, tableId) => state.tables.find((table) => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const REMOVE_TABLE = createActionName("REMOVE_TABLE");
const ADD_TABLE = createActionName("ADD_TABLE");
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const EDIT_TABLE = createActionName("EDIT_TABLE");

// action creators
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(response => response.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};

export const addTableRequest = newTable => {
  return (dispatch) => {
    const navigate = useNavigate();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch(`${API_URL}/tables`, options)
      .then(() => { dispatch(addTable(newTable))
      navigate(`${API_URL}/`);
      })
      .catch(error => {
        console.error("An error occurred while editing the table:", error)
      });
  }
};

export const removeTableRequest = tableId => {
  return (dispatch) => {
    const navigate = useNavigate();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(`${API_URL}/tables/${tableId.toString()}`, options)
      .then(() => { dispatch(removeTable(tableId));
      navigate(`${API_URL}/`);
      })
      .catch(error => {
        console.error("An error occurred while editing the table:", error)
      });
  }
};

export const editTableRequest = thisTable => {
  return (dispatch) => {
    const navigate = useNavigate();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thisTable),
    };
    fetch(`${API_URL}/tables/${thisTable.id}`, options)
      .then(() => { dispatch(editTable(thisTable.id));
      navigate(`${API_URL}/`);
    })
    .catch(error => {
      console.error("An error occurred while editing the table:", error)
    });
  };
};


const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
      case ADD_TABLE:
        return { ...statePart, tables: [...statePart.tables, { ...action.payload }]};
      case REMOVE_TABLE:
        return { ...statePart, tables: [...statePart.tables.filter(table => action.payload !== table.id)]};
      case UPDATE_TABLES:
        return { ...statePart, tables: [...action.payload] };
      case EDIT_TABLE:
        return { ...statePart, tables: [...statePart.tables.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table)]};
      default:
        return statePart;
    };
  };

  export default tablesReducer;