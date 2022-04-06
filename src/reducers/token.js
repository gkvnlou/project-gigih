const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE':
      return (state = action.payload);
    default:
      return state;
  }
};

export default tokenReducer;
