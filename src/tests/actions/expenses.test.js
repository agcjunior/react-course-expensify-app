import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object',()=>{
    const action = removeExpense({id:'123abc'});
    expect(action).toEqual({
        type:'DEL_EXPENSE',
        id:'123abc'
    })
});

test('should setup edit expense action object',()=>{
    const action = editExpense('123abc', {note:'new note'});
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'123abc',
        updates:{
            note:'new note'
        }
    })
});

test('should setup add expense action object with values',()=>{
    const data = {
        description:'condominio',
        amount:100000,
        createdAt:1000,
        note:'first note'
    };
    const action = addExpense(data);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            ...data,
            id: expect.any(String)
        }
    })
});

test('should setup add expense action object with default values',()=>{
    const action = addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            description:'',
            amount:0,
            createdAt:0,
            note:'',
            id: expect.any(String)
        }
    })
});