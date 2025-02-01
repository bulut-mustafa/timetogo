// Server Component (AutocompleteServer.js)
import { Autocomplete, AutocompleteItem } from '@heroui/react';

interface Tag {
  key: string;
  label: string;
}

interface AutocompleteServerProps {
  tags: Tag[];
  tagLabel: string
}

export default function AutocompleteServer(props: AutocompleteServerProps) {
  return (
    <Autocomplete
      className="max-w-xs"
      defaultItems={props.tags}
      label={props.tagLabel}
      size='sm'
    >
      {props.tags.map((tag) => (
        <AutocompleteItem key={tag.key}>{tag.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}