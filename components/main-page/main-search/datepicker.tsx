export default function DatePicker() {
    return (
      <div className="relative">
        <div className="relative">
          <input
            id="date"
            type="date"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-700 shadow-sm"
          />
        </div>
      </div>
    );
  }
  