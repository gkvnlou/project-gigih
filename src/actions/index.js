export const increment = (multiply) => {
    return {
        type: 'INCREMENT',
        payload: multiply
    };

}
export const decrement = (multiply) => {
    return {
        type: 'DECREMENT',
        payload: multiply
    };

}
export const updateToken = (token) => {
    return {
        type: 'UPDATE',
        payload: token
    };

}