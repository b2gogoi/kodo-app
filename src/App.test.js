import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Feed header', () => {
  render(<App />);
  const header = screen.getByText('Feeds');
  expect(header).toBeInTheDocument();
});
