// Server Component (AutocompleteServer.js)
import { Autocomplete, AutocompleteItem } from '@heroui/react';

interface Animal {
  key: string;
  label: string;
}

interface AutocompleteServerProps {
  animals: Animal[];
}

export default function AutocompleteServer(props: AutocompleteServerProps) {
  return (
    <Autocomplete
      className="max-w-xs"
      defaultItems={props.animals}
      label="Pick a country"
    >
      {props.animals.map((animal) => (
        <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}