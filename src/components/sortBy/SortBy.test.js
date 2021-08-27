import React from "react";
import { cleanup, fireEvent, render } from '@testing-library/react';

import SortBy from "./SortBy";

const sortOptions = ['name', 'dateLastEdited'];
const sortCol = 'name';

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

it('SortBy renders with proper values and fires the sortChange event on change', () => {
    const changeSort = jest.fn()
    render(<SortBy options={sortOptions} selected={sortCol} onSelect={changeSort} />);
    const select = document.getElementsByTagName('SELECT')[0];
    expect(select).toHaveClass('sort-selector');
    expect(select).toHaveValue('name');
    expect(select).toHaveDisplayValue('name');

    expect(select.children[0]).toHaveValue('name');
    expect(select.children[1]).toHaveValue('dateLastEdited');

    fireEvent.change(select, {target: {value: 'dateLastEdited'}});
    expect(changeSort).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('dateLastEdited');
    expect(select).toHaveDisplayValue('date Last Edited');
    // screen.debug();
});
