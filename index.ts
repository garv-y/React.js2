export interface NameListProps {
  names: string[];
  onDelete: (name: string) => void;
}

export interface NameFormProps {
  onAdd: (name: string) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}