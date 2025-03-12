import { useGenerateCompanyContent } from '@hooks/AI/useGenerateCompanyContent';
import { useToast } from '@hooks/General/use-toast';

import { useData } from '@providers/DataProvider/DataProvider';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompanyContentGenerator } from '../CompanyContentGenerator';

jest.mock('@hooks/AI/useGenerateCompanyContent');
jest.mock('@hooks/General/use-toast');
jest.mock('@providers/DataProvider/DataProvider');

const mockGenerateContent = jest.fn();
const mockToast = jest.fn();
const mockSetGroups = jest.fn();
const mockSetTags = jest.fn();
const mockSetPalettes = jest.fn();
const mockSetImages = jest.fn();

describe('CompanyContentGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGenerateCompanyContent as jest.Mock).mockReturnValue({
      mutate: mockGenerateContent,
      isPending: false,
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });

    (useData as jest.Mock).mockReturnValue({
      setGroups: mockSetGroups,
      setTags: mockSetTags,
      setPalettes: mockSetPalettes,
      setImages: mockSetImages,
    });
  });

  it('renders correctly', () => {
    render(<CompanyContentGenerator />);
    expect(
      screen.getByRole('button', { name: /generate company content/i })
    ).toBeInTheDocument();
  });

  it('shows error when trying to generate without company name', async () => {
    const user = userEvent.setup();
    render(<CompanyContentGenerator />);

    const button = screen.getByRole('button', {
      name: /generate company content/i,
    });
    await user.click(button);

    const generateButton = screen.getByRole('button', {
      name: /generate content/i,
    });
    await user.click(generateButton);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Company name required',
      description: 'Please enter a company name',
      variant: 'destructive',
    });
  });
});
