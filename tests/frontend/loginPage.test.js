import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../public/loginPage';
import { Provider } from 'react-redux';
import store from '../../store';

test('renders login page', () => {
  render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('validates login form', () => {
  render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  fireEvent.click(screen.getByText(/login/i));
  expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
});
