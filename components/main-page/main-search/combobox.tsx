import { Autocomplete, AutocompleteItem } from '@heroui/react';

interface Tag {
  key: string;
  label: string;
}

interface AutocompleteServerProps {
  tags: Tag[];
  tagLabel: string;
  selected: string | null;
  onSelectionChange: (value: string | null) => void;
}

export default function AutocompleteServer({ tags, tagLabel, selected, onSelectionChange }: AutocompleteServerProps) {
  return (
    <Autocomplete
      className="max-w"
      label={tagLabel}
      size="sm"
      selectedKey={selected}
      onSelectionChange={(key) => onSelectionChange(key as string)}
    >
      {tags.map((tag) => (
        <AutocompleteItem key={tag.key}>{tag.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
