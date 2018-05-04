import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined,{ type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove an expense by id', () => {
    const action = {type:'DEL_EXPENSE', id: expenses[1].id};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if id not found', () => {
    const action = {type:'DEL_EXPENSE', id: '-1'};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add a new expense', () => {
    const newExpense = {
        id:'10',
        description:'New expense',
        note:'',
        amount:100,
        createdAt:0
    };
    const action = {type:'ADD_EXPENSE', expense:newExpense};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses,newExpense]);
});

test('should edit an expense', () => {
    const newExpense = {
        id:'1',
        description:'New expense',
        note:'',
        amount:100,
        createdAt:0
    };
    const action = {type:'EDIT_EXPENSE', id:'1', updates:newExpense};
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe('New expense');
});

test('should not edit an expense not found', () => {
    const newExpense = {
        id:'1',
        description:'New expense',
        note:'',
        amount:100,
        createdAt:0
    };
    const action = {type:'EDIT_EXPENSE', id:'-1', updates:newExpense};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})