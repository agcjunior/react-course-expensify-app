import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const HomePage = () => (
    <div>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default HomePage;