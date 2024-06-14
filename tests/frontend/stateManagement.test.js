import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { loginUser } from '../../actions/authActions';

test('should handle a login action', () => {
  const store = createStore(rootReducer);
  store.dispatch(loginUser({ username: 'testuser', token: 'testtoken' }));
  const state = store.getState().auth;
  expect(state.isAuthenticated).toBe(true);
  expect(state.user.username).toBe('testuser');
});
