import React from "react";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import SearchBar from "./SearchBar"

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

it('SearchBar renders and fires the text search on keytype', () => {
    const search = jest.fn()
    render(<SearchBar filter={search} text={'hello'} />);
    const input = screen.getByPlaceholderText('Search in name or description');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('hello');
    
    fireEvent.change(input, {target: {value: 'c'}});
    fireEvent.change(input, {target: {value: 'ca'}});
    fireEvent.change(input, {target: {value: 'cat'}});
    expect(search).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue('cat');
    screen.debug();
});
