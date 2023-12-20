import 'tailwindcss/tailwind.css';
import { Button } from './Button';
import PopOver from './PopOver';
import './header.css';
import ToggleSwitch from './ToggleSwitch';
import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { PopOverOptions } from '../utils/PopOverConfig';


type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}


export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {

  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <header>
      <div className="storybook-header dark:border-orange-500 transition ease-in-out delay-150">
        <div>
  
          <PopOver options={PopOverOptions}></PopOver>
  
          🌞 <ToggleSwitch text='Toggle dark mode' darkMode={darkMode} setDarkMode={setDarkMode} /> 🌒
  
          <h1  className="font-righteous dark:text-stone-300">A Song of Ice and Fire | Reading book club</h1>
  
        </div>

        <div>
          {user ? (
            <>
              <span className="welcome dark:text-white">
                Welcome, <b>{user.name}</b>!
              </span>
              <Button customClassName="bg-orange-700 text-white" size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button customClassName="bg-orange-700 text-white" size="small" onClick={onLogin} label="Log in" />
              <Button customClassName="bg-orange-700 text-white" primary size="small" onClick={onCreateAccount} label="Sign up" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
