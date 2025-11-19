/**
 * Skenario pengujian threads thunks:
 *
 * - fetchThreads thunk
 *   - should dispatch correct actions when fetch is successful
 *   - should dispatch correct actions when fetch fails
 *
 * - createThread thunk
 *   - should dispatch correct actions when creation is successful
 *   - should dispatch correct actions when creation fails
 *
 * - createComment thunk
 *   - should dispatch correct actions when comment creation is successful
 *   - should dispatch correct actions when comment creation fails
 */

import { configureStore } from '@reduxjs/toolkit';
import threadsSlice, { fetchThreads, createThread, createComment } from '../../store/threadsSlice';

// Mock API
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    getThreads: jest.fn(),
    createThread: jest.fn(),
    createComment: jest.fn(),
  },
}));

import api from '../../services/api';

describe('threads thunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadsSlice,
      },
    });
    jest.clearAllMocks();
  });

  describe('fetchThreads thunk', () => {
    it('should dispatch correct actions when fetch is successful', async () => {
      // Arrange
      const mockThreads = [
        { id: 'thread-1', title: 'First Thread' },
        { id: 'thread-2', title: 'Second Thread' },
      ];
      const mockResponse = {
        status: 'success',
        data: { threads: mockThreads },
      };
      api.getThreads.mockResolvedValue(mockResponse);

      // Act
      await store.dispatch(fetchThreads());

      // Assert
      const state = store.getState().threads;
      expect(state.threads).toEqual(mockThreads);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should dispatch correct actions when fetch fails', async () => {
      // Arrange
      const mockResponse = {
        status: 'fail',
        message: 'Failed to fetch threads',
      };
      api.getThreads.mockResolvedValue(mockResponse);

      // Act
      try {
        await store.dispatch(fetchThreads()).unwrap();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      const state = store.getState().threads;
      expect(state.threads).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to fetch threads');
    });
  });

  describe('createThread thunk', () => {
    it('should dispatch correct actions when creation is successful', async () => {
      // Arrange
      const newThread = {
        id: 'thread-new',
        title: 'New Thread',
        body: 'Thread content',
      };
      const mockResponse = {
        status: 'success',
        data: { thread: newThread },
      };
      api.createThread.mockResolvedValue(mockResponse);

      const threadData = {
        title: 'New Thread',
        body: 'Thread content',
      };
      const token = 'mock-token';

      // Act
      await store.dispatch(createThread({ threadData, token }));

      // Assert
      const state = store.getState().threads;
      expect(state.threads).toContain(newThread);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should dispatch correct actions when creation fails', async () => {
      // Arrange
      const mockResponse = {
        status: 'fail',
        message: 'Failed to create thread',
      };
      api.createThread.mockResolvedValue(mockResponse);

      const threadData = {
        title: 'New Thread',
        body: 'Thread content',
      };
      const token = 'mock-token';

      // Act
      try {
        await store.dispatch(createThread({ threadData, token })).unwrap();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      const state = store.getState().threads;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to create thread');
    });
  });

  describe('createComment thunk', () => {
    it('should dispatch correct actions when comment creation is successful', async () => {
      // Arrange
      const initialState = {
        threads: [],
        currentThread: {
          id: 'thread-1',
          title: 'Test Thread',
          comments: [],
        },
        isLoading: false,
        error: null,
      };

      store = configureStore({
        reducer: {
          threads: threadsSlice,
        },
        preloadedState: {
          threads: initialState,
        },
      });

      const newComment = {
        id: 'comment-new',
        content: 'New comment',
      };
      const mockResponse = {
        status: 'success',
        data: { comment: newComment },
      };
      api.createComment.mockResolvedValue(mockResponse);

      const threadId = 'thread-1';
      const content = 'New comment';
      const token = 'mock-token';

      // Act
      await store.dispatch(createComment({ threadId, content, token }));

      // Assert
      const state = store.getState().threads;
      expect(state.currentThread.comments).toContain(newComment);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should dispatch correct actions when comment creation fails', async () => {
      // Arrange
      const mockResponse = {
        status: 'fail',
        message: 'Failed to create comment',
      };
      api.createComment.mockResolvedValue(mockResponse);

      const threadId = 'thread-1';
      const content = 'New comment';
      const token = 'mock-token';

      // Act
      try {
        await store.dispatch(createComment({ threadId, content, token })).unwrap();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      const state = store.getState().threads;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to create comment');
    });
  });
});