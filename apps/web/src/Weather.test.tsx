import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Weather from './Weather';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      city: 'London',
      country: 'UK',
      temperature: 20,
      condition: 'Cloudy',
      updatedAt: new Date().toISOString(),
    }),
  })
) as jest.Mock;

describe('Weather', () => {
  it('renders weather data', async () => {
    render(<Weather />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/London/)).toBeInTheDocument());
    expect(screen.getByText(/UK/)).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
    expect(screen.getByText(/Cloudy/)).toBeInTheDocument();
  });

  it('updates weather data', async () => {
    render(<Weather />);
    await waitFor(() => expect(screen.getByText(/London/)).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByPlaceholderText('Country'), { target: { value: 'France' } });
    fireEvent.change(screen.getByPlaceholderText('Temperature'), { target: { value: '25' } });
    fireEvent.change(screen.getByPlaceholderText('Condition'), { target: { value: 'Sunny' } });
    fireEvent.click(screen.getByText('Update Weather'));
    await waitFor(() => expect(screen.getByDisplayValue('Paris')).toBeInTheDocument());
    expect(screen.getByDisplayValue('France')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sunny')).toBeInTheDocument();
  });
});
