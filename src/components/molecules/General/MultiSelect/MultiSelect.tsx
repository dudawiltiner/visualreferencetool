'use client';

import * as React from 'react';

import { Badge } from '@ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/command';
import { X } from 'lucide-react';

import { MultiSelectProps } from './MultiSelect.types';

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
    setInputValue('');
  };

  const selectedLabels = selected.map(
    (value) => options?.find((option) => option.value === value)?.label || value
  );

  // Filter options based on input value
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="flex flex-wrap gap-1 border rounded-md px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        {selectedLabels.map((label, index) => (
          <Badge key={index} variant="secondary" className="rounded-sm">
            {label}
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation();
                handleUnselect(selected[index]);
              }}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={selected.length === 0 ? placeholder : ''}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px]"
          role="combobox"
        />
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <Command className="w-full">
            <CommandList className="max-h-[200px] overflow-y-auto">
              <CommandInput
                value={inputValue}
                onValueChange={setInputValue}
                placeholder="Search..."
                className="h-9"
              />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'opacity-50'
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-sm bg-current" />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
