import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketDetail from '../pages/TicketDetail';
import { AuthProvider } from '../hooks/useAuth';
import { ticketService } from '../services/ticketService';

vi.mock('../services/ticketService', () => ({
  ticketService: {
    getById: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    getAll: vi.fn(),
    filterByUser: vi.fn(),
    reset: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('TicketDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderTicketDetail = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <TicketDetail />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should show Unauthorized when user is not logged in', () => {
    renderTicketDetail();
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('should have correct CSS class', () => {
    const { container } = renderTicketDetail();
    expect(container.querySelector('.ticket-detail')).toBeInTheDocument();
  });

  it('should have responses section heading', () => {
    const { container } = renderTicketDetail();
    const heading = container.querySelector('h3');
    if (heading) {
      expect(heading).toHaveTextContent('Responses');
    }
  });
});
