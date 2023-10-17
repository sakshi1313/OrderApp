export const initialState = null;

export const reducer = (state, action) => {
  console.log("{{{{{{{{{{{{{{{{{{{{{{{");
  console.log(action);
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
