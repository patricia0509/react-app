import { configureStore } from '@reduxjs/toolkit';
import authSlice, { loginUser } from '../../store/authSlice';

// Mock API
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}));

import api from '../../services/api';

describe('auth thunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authSlice },
    });
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    api.login.mockResolvedValue({
      status: 'success',
      data: { token: 'test-token' },
    });

    await store.dispatch(loginUser({ email: 'test@test.com', password: 'password' }));

    const state = store.getState().auth;
    expect(state.token).toBe('test-token');
  });
});