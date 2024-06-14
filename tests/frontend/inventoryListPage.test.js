import { render, screen } from '@testing-library/react';
import InventoryListPage from '../../public/inventoryListPage';
import { Provider } from 'react-redux';
import store from '../../store';

test('renders inventory list page', () => {
  render(
    <Provider store={store}>
      <InventoryListPage />
    </Provider>
  );
  expect(screen.getByText(/inventory list/i)).toBeInTheDocument();
});

test('displays inventory items', async () => {
  render(
    <Provider store={store}>
      <InventoryListPage />
    </Provider>
  );
  const items = await screen.findAllByTestId('inventory-item');
  expect(items.length).toBeGreaterThan(0);
});
