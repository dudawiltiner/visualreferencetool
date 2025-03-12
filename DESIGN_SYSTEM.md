# Visual Reference Tool - Documento de Design do Sistema

## Sumário

1. [Arquitetura Geral](#1-arquitetura-geral)
2. [Componentes Principais](#2-componentes-principais)
3. [Estratégia de Gerenciamento de Dados](#3-estratégia-de-gerenciamento-de-dados)
4. [Decisões Técnicas](#4-decisões-técnicas)
5. [Links de Apoio](#5-links-de-apoio)

## 1. Arquitetura Geral

### 1.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                       Next.js App                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────────────────────────┐    │
│  │   Layout    │    │         Data Provider            │    │
│  │             │    │                                  │    │
│  │  - Sidebar  │    │  Estado Global:                  │    │
│  │  - Header   │    │  - images: Image[]               │    │
│  │  - Content  │    │  - palettes: ColorPalette[]      │    │
│  │             │    │  - groups: Group[]               │    │
│  └─────────────┘    │  - tags: Tag[]                   │    │
│         │           │  - isDarkMode: boolean           │    │
│         │           └──────────────────────────────────┘    │
│         │                          │                        │
│         ▼                          ▼                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │                    Components                      │     │
│  │                                                    │     │
│  │  ┌─────────┐     ┌──────────┐    ┌────────────┐    │     │
│  │  │ Atoms   │     │ Molecules│    │Organisms   │    │     │
│  │  │         │     │          │    │            │    │     │
│  │  │ Button  │     │ Dialog   │    │ImageGrid   │    │     │
│  │  │ Input   │     │ Sidebar  │    │TagList     │    │     │
│  │  │ Label   │     │ Card     │    │PaletteGrid │    │     │
│  │  └─────────┘     └──────────┘    └────────────┘    │     │
│  │                                                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Fluxo de Dados

#### 1.2.1 DataProvider

O DataProvider é o coração do gerenciamento de estado da aplicação. Exemplo de uso:

```typescript
// src/providers/DataProvider/DataProvider.tsx
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Exemplo de persistência de dados
  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  return (
    <DataContext.Provider value={{
      images, setImages,
      palettes, setPalettes,
      groups, setGroups,
      tags, setTags,
      isDarkMode, setIsDarkMode
    }}>
      {children}
    </DataContext.Provider>
  );
};
```

#### 1.2.2 Custom Hooks

Hooks personalizados para gerenciar lógica reutilizável:

```typescript
// src/hooks/useToast.ts
export const useToast = () => {
  const toast = (options: ToastOptions) => {
    // Lógica de exibição de toast
  };
  return { toast };
};

// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lógica de persistência no localStorage
}
```

## 2. Componentes Principais

### 2.1 Estrutura Atômica

#### 2.1.1 Atoms

Componentes básicos e reutilizáveis:

```typescript
// src/components/ui/button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

#### 2.1.2 Molecules

Composições de componentes atômicos:

```typescript
// src/components/molecules/Tags/TagDialog/TagDialog.tsx
export function TagDialog({ open, onOpenChange, tag }: TagDialogProps) {
  const { handleSubmit, handleChange } = useTagDialog(open, onOpenChange, tag);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Input name="name" onChange={handleChange} />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

#### 2.1.3 Organisms

Componentes complexos que combinam múltiplas molecules:

```typescript
// src/components/organisms/Images/ImageGrid/ImageGrid.tsx
export function ImageGrid() {
  const { images, filteredImages, handleDelete } = useImageGrid();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredImages.map(image => (
        <ImageCard
          key={image.id}
          image={image}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## 3. Estratégia de Gerenciamento de Dados

### 3.1 Estrutura de Dados

#### 3.1.1 Interfaces Principais

```typescript
// src/lib/types.ts
export interface Image {
  id: string;
  url: string;
  name: string;
  groupId?: string;
  tagIds: string[];
  colors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  groupId?: string;
  tagIds: string[];
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3.2 Persistência de Dados

#### 3.2.1 LocalStorage

Exemplo de implementação:

```typescript
// src/hooks/use-local-storage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
```

### 3.3 Busca e Filtragem

#### 3.3.1 Implementação de Filtros

```typescript
// Exemplo de filtragem em PaletteGrid
const filteredPalettes = palettes.filter((palette) => {
  const matchesGroup = !groupId || palette.groupId === groupId;
  const matchesTag = !tagId || palette.tagIds?.includes(tagId);
  const matchesSearch =
    !searchQuery ||
    palette.name.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesGroup && matchesTag && matchesSearch;
});
```

## 4. Decisões Técnicas

### 4.1 Stack Tecnológico

#### 4.1.1 Frontend

- **Next.js 14**: Framework React com suporte a Server Components e App Router
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Tailwind CSS**: Utilitários CSS para estilização rápida e consistente
- **Shadcn/ui**: Componentes base reutilizáveis e acessíveis

#### 4.1.2 Qualidade de Código

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next': nextPlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      'max-lines': ['error', { max: 100 }],
      '@typescript-eslint/naming-convention': ['error'],
      'sonarjs/cognitive-complexity': ['error', 15],
    },
  },
];
```

### 4.2 Padrões de Design

#### 4.2.1 Atomic Design

Estrutura de diretórios que reflete o Atomic Design:

```
src/
  components/
    atoms/
      Button/
      Input/
    molecules/
      Dialog/
      Card/
    organisms/
      ImageGrid/
      PaletteGrid/
```

#### 4.2.2 Custom Hooks

Separação de lógica de negócios:

```typescript
// src/components/organisms/Images/ImageGrid/ImageGrid.hook.ts
export function useImageGrid() {
  const { images, setImages } = useData();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleDelete = useCallback(
    (ids: string[]) => {
      setImages((prev) => prev.filter((img) => !ids.includes(img.id)));
    },
    [setImages]
  );

  return { images, selectedImages, handleDelete };
}
```

## 5. Links de Apoio

### 5.1 Documentação Oficial

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)

### 5.2 Padrões e Boas Práticas

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [React Patterns](https://reactpatterns.com/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### 5.3 Ferramentas de Desenvolvimento

- [ESLint](https://eslint.org/)
- [SonarJS Rules](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
