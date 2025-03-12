import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { BasicInfoForm } from '../BasicInfoForm';
import type { BasicInfoFormProps } from '../BasicInfoForm.types';

// Mock Select do Radix UI
jest.mock('@ui/select', () => ({
  Select: ({ value, onValueChange, children }: any) => (
    <select
      data-testid="group-select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: ({ children }: any) => children,
  SelectItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
}));

// Mock MultiSelect
jest.mock('@molecules/General/MultiSelect/MultiSelect', () => ({
  MultiSelect: ({ options }: any) => (
    <select data-testid="tags-select" multiple>
      {options.map((option: { value: string; label: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

describe('BasicInfoForm', () => {
  const mockGroups = [
    { id: '1', name: 'Group 1', createdAt: '', updatedAt: '' },
    { id: '2', name: 'Group 2', createdAt: '', updatedAt: '' },
  ];

  const mockTags = [
    { id: '1', name: 'Tag 1', createdAt: '', updatedAt: '' },
    { id: '2', name: 'Tag 2', createdAt: '', updatedAt: '' },
    { id: '3', name: 'Tag 3', createdAt: '', updatedAt: '' },
  ];

  const mockFormData = {
    title: '',
    url: '',
    groupId: '',
    tagIds: [],
    comment: '',
  };

  const defaultProps: BasicInfoFormProps = {
    formData: mockFormData,
    groups: mockGroups,
    tags: mockTags,
    handleChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
  };

  it('renderiza todos os campos do formulário', () => {
    render(<BasicInfoForm {...defaultProps} />);

    // Verifica os campos do formulário
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /image url/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('group-select')).toBeInTheDocument();
    expect(screen.getByTestId('tags-select')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /comment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add image/i })
    ).toBeInTheDocument();
  });

  it('mostra o botão "Save Changes" ao editar uma imagem existente', () => {
    render(
      <BasicInfoForm
        {...defaultProps}
        image={{ id: '1', title: 'Test Image', url: 'test.jpg' } as any}
      />
    );

    expect(
      screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument();
  });

  it('manipula a submissão do formulário', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<BasicInfoForm {...defaultProps} handleSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /add image/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
