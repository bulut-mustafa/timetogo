import AutocompleteCombobox from './combobox';
import DatePicker from './datepicker';
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
                        <button className="w-full bg-blue-400 text-white rounded-lg p-2">Search</button>
                    </div>
                </div>
            </div>
        </>
    );
}