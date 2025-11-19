/**
 * Skenario pengujian ThreadItem component:
 *
 * - ThreadItem component
 *   - should render thread information correctly
 *   - should display thread title as clickable link
 *   - should show thread body when provided
 *   - should display owner information when provided
 *   - should show comment count and creation date
 *   - should render owner avatar when available
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from '../../components/ThreadItem';

// Helper function to render with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ThreadItem component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: 'This is a test thread body content',
    createdAt: '2024-01-01T07:00:00.000Z',
    totalComments: 5,
  };

  const mockOwner = {
    id: 'user-1',
    name: 'Test User',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('should render thread information correctly', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test thread body content')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should display thread title as clickable link', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    const titleLink = screen.getByRole('link');
    expect(titleLink).toHaveAttribute('href', '/thread/thread-1');
    expect(titleLink).toContainElement(screen.getByText('Test Thread Title'));
  });

  it('should show thread body when provided', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    expect(screen.getByText('This is a test thread body content')).toBeInTheDocument();
  });

  it('should not show thread body when not provided', () => {
    // Arrange
    const threadWithoutBody = { ...mockThread, body: null };

    // Act
    renderWithRouter(<ThreadItem thread={threadWithoutBody} owner={mockOwner} />);

    // Assert
    expect(screen.queryByText('This is a test thread body content')).not.toBeInTheDocument();
  });

  it('should display owner information when provided', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should show Unknown when owner is not provided', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={null} />);

    // Assert
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('should show comment count and creation date', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    expect(screen.getByText('5 comments')).toBeInTheDocument();
    expect(screen.getByText(/1 Januari 2024/)).toBeInTheDocument();
  });

  it('should render owner avatar when available', () => {
    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={mockOwner} />);

    // Assert
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should not render avatar when not available', () => {
    // Arrange
    const ownerWithoutAvatar = { ...mockOwner, avatar: null };

    // Act
    renderWithRouter(<ThreadItem thread={mockThread} owner={ownerWithoutAvatar} />);

    // Assert
    const avatar = screen.queryByAltText('Test User');
    expect(avatar).not.toBeInTheDocument();
  });
});