import { render, screen } from '@testing-library/react';
import InventoryItemDetailsPage from '../../public/inventoryItemDetailsPage';
import { Provider } from 'react-redux';
import store from '../../store';
import { MemoryRouter, Route } from 'react-router-dom';

test('renders inventory item details page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/inventory/1']}>
        <Route path="/inventory/:id" component={InventoryItemDetailsPage} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/item details/i)).toBeInTheDocument();
});
