const expensesReducerDefaultState= [];

export default (state=expensesReducerDefaultState,action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            //return state.concat(action.expense);
            return [...state, action.expense];
        case 'DEL_EXPENSE':        
            return state.filter(({id}) => action.id !== id );
        case 'EDIT_EXPENSE':        
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};