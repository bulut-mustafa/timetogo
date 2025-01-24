import AutocompleteCombobox from './combobox';
import CustomDatePicker from './datepicker';
export default function SearchBar() {
    return (
        <>
            <div className="w-3/4 flex justify-center mx-auto">
                <div className="flex items-center gap-8 justify-center">
                    <div  className="w-1/4">
                        <AutocompleteCombobox />
                    </div>
                    <div  className="w-1/4">
                        <AutocompleteCombobox />
                    </div>
                    <div className="w-1/4">
                        
                    </div>
                    <div className="w-1/4">
                        <input type="text" className="w-full border-2 border-gray-200 rounded-lg p-2" placeholder="Search for a product" />
                    </div>
                </div>
            </div>
        </>
    );
}