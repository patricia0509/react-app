import authSlice, { logout } from '../../store/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    token: null,
    isLoading: false,
    error: null,
  };

  it('should return initial state', () => {
    const result = authSlice(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should handle logout', () => {
    const previousState = { token: 'test-token', isLoading: false, error: null };
    const result = authSlice(previousState, logout());
    expect(result.token).toBe(null);
  });
});