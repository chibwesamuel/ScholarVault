import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationPage from '../../public/registrationPage';
import { Provider } from 'react-redux';
import store from '../../store';

test('renders registration page', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('validates registration form', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  fireEvent.click(screen.getByText(/register/i));
  expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
});
