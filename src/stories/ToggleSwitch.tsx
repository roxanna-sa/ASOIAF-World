// import React from 'react';
import { Switch } from '@headlessui/react';

const ToggleSwitch = ({ text, darkMode, setDarkMode }: { text: string, darkMode: boolean, setDarkMode: any}) => {

  return (
    <Switch
      checked={darkMode}
      onChange={setDarkMode}
      className={`${
        darkMode ? 'bg-gray-700' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">{text}</span>
      <span
        className={`${
          darkMode ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
};

export default ToggleSwitch;
