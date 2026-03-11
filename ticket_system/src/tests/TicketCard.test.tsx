import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import type { Ticket } from '../models/Ticket';

const mockTicket: Ticket = {
  id: 1,
  title: 'Test Ticket',
  description: 'This is a test ticket',
  author: 'user1',
  assigned_to: 'admin1',
  priority: 'high',
  status: 'open',
  responses: [],
};

describe('TicketCard', () => {
  const renderTicketCard = (ticket: Ticket) => {
    return render(
      <BrowserRouter>
        <TicketCard ticket={ticket} />
      </BrowserRouter>
    );
  };

  it('should render ticket title', () => {
    renderTicketCard(mockTicket);
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
  });

  it('should display status', () => {
    renderTicketCard(mockTicket);
    expect(screen.getByText('Status: open')).toBeInTheDocument();
  });

  it('should display priority', () => {
    renderTicketCard(mockTicket);
    expect(screen.getByText('Priority: high')).toBeInTheDocument();
  });

  it('should display different statuses', () => {
    const closedTicket = { ...mockTicket, status: 'closed' as const };
    renderTicketCard(closedTicket);
    expect(screen.getByText('Status: closed')).toBeInTheDocument();
  });

  it('should display different priorities', () => {
    const lowPriorityTicket = { ...mockTicket, priority: 'low' as const };
    renderTicketCard(lowPriorityTicket);
    expect(screen.getByText('Priority: low')).toBeInTheDocument();
  });

  it('should have a Details link', () => {
    renderTicketCard(mockTicket);
    const link = screen.getByRole('link', { name: /Details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/tickets/1');
  });

  it('should link to correct ticket detail page', () => {
    const ticketWithDifferentId = { ...mockTicket, id: 42 };
    renderTicketCard(ticketWithDifferentId);
    const link = screen.getByRole('link', { name: /Details/i });
    expect(link).toHaveAttribute('href', '/tickets/42');
  });

  it('should have correct CSS class', () => {
    const { container } = renderTicketCard(mockTicket);
    expect(container.querySelector('.ticket-card')).toBeInTheDocument();
  });

  it('should render with different ticket data', () => {
    const newTicket: Ticket = {
      id: 99,
      title: 'Another Ticket',
      description: 'Different description',
      author: 'user2',
      priority: 'medium',
      status: 'in_progress',
      responses: ['Response 1'],
    };
    renderTicketCard(newTicket);
    expect(screen.getByText('Another Ticket')).toBeInTheDocument();
    expect(screen.getByText('Status: in_progress')).toBeInTheDocument();
    expect(screen.getByText('Priority: medium')).toBeInTheDocument();
  });
});
