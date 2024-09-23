export const initialstate = {
  task: [],
};

export const TaskReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return {
        task: action.payload,
      };
    case "ADD_TASK":
      return {
        task: [...state.task, action.payload],
      };
    case "DELETE_TASK":
      return {
        task: state.task.filter((item) => item.id !== action.payload),
      };
    case "FAVORITE":
      return {
        task: state.task.map((item) =>
          item.id == action.payload
            ? { ...item, favorite: !item.favorite }
            : {...item}
        ),
      };
    case "EDIT_TASK":
      return {
        task: state.task.map(
          (item) =>
            item.id === action.payload.id // Compare by id
              ? { ...item, ...action.payload } // Update the task with the new properties
              : item // Keep the other tasks unchanged
        ),
      };
    default: {
      return state;
    }
  }
};
