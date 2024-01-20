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