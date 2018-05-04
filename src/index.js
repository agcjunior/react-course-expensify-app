import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(addExpense({description:'Condominio',amount:100000, createdAt: 1000}));
store.dispatch(addExpense({description:'lanche',amount:500, createdAt:-1000}));
store.dispatch(addExpense({description:'Coelce',amount:35000, createdAt: 1200}));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);

console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
