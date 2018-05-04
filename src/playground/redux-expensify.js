import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// EXPENSE ACTIONS
const addExpense = (
    {
        description='', 
        note='',
        amount=0,
        createdAt = 0
    } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense =  ({id} = {}) => ({
    type:'DEL_EXPENSE',
    id
});

const editExpense = (id, updates) =>  ({
    type:'EDIT_EXPENSE',
    id,
    updates
})

// Expenses reducers
const expensesReducerDefaultState= [];
const expensesReducer = (state=expensesReducerDefaultState,action) => {
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

//FILTERS ACTIONS

const setTextFilter = (textToSet='') => ({
    type:'SET_TEXT',
    textToSet
});

const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type:'SORT_BY_DATE'
});

const setStartDate = (date='undefined') => ({
    type:'SET_START_DATE',
    date
})

const setEndDate = (date='undefined') => ({
    type:'SET_END_DATE',
    date
})

// Filter Reducers
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state=filterReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT':
            return {
                ...state,
                text: action.textToSet
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy:'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy:'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate:action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate:action.date
            }
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    });
}

// Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});


const expenseOne = store.dispatch(addExpense({description:'Condominio',amount:100000, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description:'lanche',amount:500, createdAt:-1000}));
/*
store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense(expenseTwo.expense.id, {amount:450}));

store.dispatch(setTextFilter('Condominio'));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());


store.dispatch(setStartDate(125))
store.dispatch(setStartDate())

store.dispatch(setEndDate(1250))
*/

//store.dispatch(setTextFilter('lanche'));
store.dispatch(sortByAmount());

const demoState = {
    expenses: [{
        id:'adssfdjh',
        description: 'Condominio de Abril',
        note:'Ultimo com taxa extra da recisão',
        amount:54600,
        createdAt: 0
    }],
    filters: {
        text: 'Condominio',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

/*
const user = {
    nome: 'AJ',
    age: 56
};

console.log({
    ...user, local:'Fortaleza'
});
*/