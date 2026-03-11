import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketList from '../pages/TicketList';
import { AuthProvider } from '../hooks/useAuth';
import { ticketService } from '../services/ticketService';

vi.mock('../services/ticketService', () => ({
  ticketService: {
    getAll: vi.fn(),
    filterByUser: vi.fn(),
    reset: vi.fn(),
    create: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
  },
}));

describe('TicketList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockTicket = {
    id: 1,
    title: 'Test Ticket',
    description: 'Description',
    author: 'user1',
    priority: 'high' as const,
    status: 'open' as const,
    responses: [],
  };

  const renderTicketList = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <TicketList />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should show Unauthorized when user is not logged in', () => {
    vi.mocked(ticketService.getAll).mockResolvedValue([]);
    renderTicketList();
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('should have correct CSS class', () => {
    const { container } = renderTicketList();
    expect(container.querySelector('.ticket-list')).toBeInTheDocument();
  });

  it('should render page title', () => {
    const { container } = renderTicketList();
    expect(container.querySelector('h2')).toHaveTextContent('Tickets');
  });
});
