import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = () => render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

test('renders the property listings page with the initial inventory', () => {
  renderApp();

  expect(screen.getByRole('heading', { name: /property listings/i })).toBeInTheDocument();
  expect(screen.getByText(/petts wood road/i)).toBeInTheDocument();
  expect(screen.getAllByTestId('property-card').length).toBeGreaterThan(0);
});

test('filters properties by postcode and updates the visible results', async () => {
  renderApp();

  userEvent.click(screen.getByRole('button', { name: /search properties/i }));
  userEvent.type(screen.getByLabelText(/postcode/i), 'BR6');
  userEvent.click(screen.getByRole('button', { name: /^search$/i }));

  expect(screen.getByText(/crofton road orpington br6/i)).toBeInTheDocument();
  expect(screen.getByText(/property listings/i)).toBeInTheDocument();
});

test('toggles favourites without adding duplicates', () => {
  renderApp();

  const addButtons = screen.getAllByRole('button', { name: /add to favourites/i });
  userEvent.click(addButtons[0]);
  userEvent.click(addButtons[0]);

  expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  expect(screen.getByText(/petts wood road/i)).toBeInTheDocument();
});

test('filters properties by a date-added range', () => {
  renderApp();

  userEvent.click(screen.getByRole('button', { name: /search properties/i }));
  userEvent.type(screen.getByLabelText(/date added from/i), '2024-10-01');
  userEvent.type(screen.getByLabelText(/date added to/i), '2024-10-31');
  userEvent.click(screen.getByRole('button', { name: /^search$/i }));

  expect(screen.getByText(/petts wood road/i)).toBeInTheDocument();
  expect(screen.getByText(/property listings/i)).toBeInTheDocument();
});

test('shows a no-results message when no properties match', () => {
  renderApp();

  userEvent.click(screen.getByRole('button', { name: /search properties/i }));
  userEvent.type(screen.getByLabelText(/postcode/i), 'ZZ99');
  userEvent.click(screen.getByRole('button', { name: /^search$/i }));

  expect(screen.getByText(/no properties found matching your criteria/i)).toBeInTheDocument();
});
