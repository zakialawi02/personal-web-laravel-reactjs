const ToggleSwitch = ({ name, checked, onChange, label, description }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-700">{label}</h3>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;
