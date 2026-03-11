import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { useAuth, AuthProvider } from '../hooks/useAuth';

describe('useAuth', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth(), { wrapper: ({ children }: { children: ReactNode }) => <>{children}</> });
    }).toThrow('useAuth must be used within AuthProvider');
  });

  it('should initially have null user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });

  it('should login with username and role', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('testuser', 'user');
    });

    expect(result.current.user).toEqual({
      username: 'testuser',
      role: 'user',
    });
  });

  it('should login with admin role', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('admin1', 'admin');
    });

    expect(result.current.user?.role).toBe('admin');
    expect(result.current.user?.username).toBe('admin1');
  });

  it('should login with supervisor role', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('supervisor1', 'supervisor');
    });

    expect(result.current.user?.role).toBe('supervisor');
  });

  it('should logout and clear user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('testuser', 'user');
    });

    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });

  it('should handle multiple login/logout cycles', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('user1', 'user');
    });
    expect(result.current.user?.username).toBe('user1');

    act(() => {
      result.current.logout();
    });
    expect(result.current.user).toBeNull();

    act(() => {
      result.current.login('user2', 'admin');
    });
    expect(result.current.user?.username).toBe('user2');
    expect(result.current.user?.role).toBe('admin');
  });

  it('should override previous login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('user1', 'user');
    });
    expect(result.current.user?.username).toBe('user1');

    act(() => {
      result.current.login('user2', 'admin');
    });
    expect(result.current.user?.username).toBe('user2');
    expect(result.current.user?.role).toBe('admin');
  });
});
