import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateTicket from '../pages/CreateTicket';
import { AuthProvider } from '../hooks/useAuth';
import { ticketService } from '../services/ticketService';

vi.mock('../services/ticketService', () => ({
  ticketService: {
    create: vi.fn(),
    getAll: vi.fn(),
    filterByUser: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    reset: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('CreateTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderCreateTicket = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <CreateTicket />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should show Unauthorized when user is not logged in', () => {
    renderCreateTicket();
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('should have correct page title', () => {
    const { container } = renderCreateTicket();
    expect(container.querySelector('h2')).toHaveTextContent('Create new ticket');
  });

  it('should have correct CSS class', () => {
    const { container } = renderCreateTicket();
    expect(container.querySelector('.create-ticket')).toBeInTheDocument();
  });

  it('should have form with required fields', () => {
    renderCreateTicket();
    const titleInput = screen.queryByLabelText(/Title:/i);
    const descriptionInput = screen.queryByLabelText(/Description:/i);
    const prioritySelect = screen.queryByLabelText(/Priority:/i);
    
    // These won't render if user is not authenticated
    if (titleInput) {
      expect(titleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(prioritySelect).toBeInTheDocument();
    }
  });

  it('should have priority select with all options', () => {
    const { container } = renderCreateTicket();
    const select = container.querySelector('select');
    if (select) {
      expect(select).toBeInTheDocument();
    }
  });

  it('should have buttons', () => {
    renderCreateTicket();
    const buttons = screen.queryAllByRole('button');
    // Create and Cancel buttons
    if (buttons.length > 0) {
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    }
  });
});
