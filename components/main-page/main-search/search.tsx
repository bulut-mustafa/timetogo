import AutocompleteCombobox from './combobox';
import {Button} from '@heroui/button'; 
import {DatePicker} from "@heroui/react";

export default function SearchBar() {
    return (
        <>
            <div className="w-4/5 flex justify-center mx-auto">
                <div className="flex items-center gap-4 justify-center">
                    <div  className="w-1/5">
                        <AutocompleteCombobox />
                    </div>
                    <div  className="w-1/5">
                        <AutocompleteCombobox />
                    </div>
                    <div className="w-1/5">
                        <DatePicker />
                    </div>
                    <div className="w-1/5">
                        <input type="text" className="w-full border-2 border-gray-200 rounded-lg p-2" placeholder="Search for a product" />
                    </div>

                    <div className="w-1/5">
                        <Button>Click me</Button>
                    </div>
                </div>
            </div>
        </>
    );
}