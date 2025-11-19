/**
 * Skenario pengujian threadsSlice:
 *
 * - threadsSlice reducer
 *   - should return initial state when given unknown action
 *   - should handle clearError action correctly
 *   - should handle fetchThreads.pending action correctly
 *   - should handle fetchThreads.fulfilled action correctly
 *   - should handle fetchThreads.rejected action correctly
 *   - should handle fetchThreadDetail.fulfilled action correctly
 *   - should handle createThread.fulfilled action correctly
 *   - should handle createComment.fulfilled action correctly
 */

import threadsSlice, { clearError, fetchThreads, fetchThreadDetail, createThread, createComment } from '../../store/threadsSlice';

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    currentThread: null,
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = threadsSlice(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle clearError action correctly', () => {
    const previousState = {
      threads: [],
      currentThread: null,
      isLoading: false,
      error: 'Some error',
    };

    const action = clearError();
    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: [],
      currentThread: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle fetchThreads.pending action correctly', () => {
    const action = { type: fetchThreads.pending.type };
    const nextState = threadsSlice(initialState, action);

    expect(nextState).toEqual({
      threads: [],
      currentThread: null,
      isLoading: true,
      error: null,
    });
  });

  it('should handle fetchThreads.fulfilled action correctly', () => {
    const previousState = {
      threads: [],
      currentThread: null,
      isLoading: true,
      error: null,
    };

    const mockThreads = [
      { id: 'thread-1', title: 'Thread 1' },
      { id: 'thread-2', title: 'Thread 2' },
    ];

    const action = {
      type: fetchThreads.fulfilled.type,
      payload: mockThreads,
    };

    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: mockThreads,
      currentThread: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle fetchThreads.rejected action correctly', () => {
    const previousState = {
      threads: [],
      currentThread: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: fetchThreads.rejected.type,
      error: { message: 'Failed to fetch threads' },
    };

    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: [],
      currentThread: null,
      isLoading: false,
      error: 'Failed to fetch threads',
    });
  });

  it('should handle fetchThreadDetail.fulfilled action correctly', () => {
    const previousState = {
      threads: [],
      currentThread: null,
      isLoading: true,
      error: null,
    };

    const mockThread = {
      id: 'thread-1',
      title: 'Thread Detail',
      comments: [],
    };

    const action = {
      type: fetchThreadDetail.fulfilled.type,
      payload: mockThread,
    };

    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: [],
      currentThread: mockThread,
      isLoading: false,
      error: null,
    });
  });

  it('should handle createThread.fulfilled action correctly', () => {
    const previousState = {
      threads: [{ id: 'thread-1', title: 'Existing Thread' }],
      currentThread: null,
      isLoading: true,
      error: null,
    };

    const newThread = { id: 'thread-2', title: 'New Thread' };

    const action = {
      type: createThread.fulfilled.type,
      payload: newThread,
    };

    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: [newThread, { id: 'thread-1', title: 'Existing Thread' }],
      currentThread: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle createComment.fulfilled action correctly', () => {
    const previousState = {
      threads: [],
      currentThread: {
        id: 'thread-1',
        title: 'Thread with Comments',
        comments: [{ id: 'comment-1', content: 'First comment' }],
      },
      isLoading: true,
      error: null,
    };

    const newComment = { id: 'comment-2', content: 'New comment' };

    const action = {
      type: createComment.fulfilled.type,
      payload: newComment,
    };

    const nextState = threadsSlice(previousState, action);

    expect(nextState).toEqual({
      threads: [],
      currentThread: {
        id: 'thread-1',
        title: 'Thread with Comments',
        comments: [
          { id: 'comment-1', content: 'First comment' },
          { id: 'comment-2', content: 'New comment' },
        ],
      },
      isLoading: false,
      error: null,
    });
  });
});