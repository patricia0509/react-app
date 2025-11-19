import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchThreads } from '../store/threadsSlice';
import { fetchUsers } from '../store/usersSlice';
import ThreadItem from '../components/ThreadItem';
import LoadingSpinner from '../components/LoadingSpinner';

const ThreadList = () => {
  const dispatch = useDispatch();
  const { threads, isLoading, error } = useSelector((state) => state.threads);
  const { users } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Forum Threads - Dicoding Forum</title>
        <meta name="description" content="Browse and discuss various topics in Dicoding Forum" />
      </Helmet>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>Forum Threads</h1>
          {token && (
            <Link
              to="/create-thread"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
            Create Thread
            </Link>
          )}
        </div>

        {error && (
          <div style={{
            color: 'red',
            backgroundColor: '#ffebee',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {threads.length === 0 ? (
          <p>No threads available.</p>
        ) : (
          threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              owner={getUserById(thread.ownerId)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ThreadList;