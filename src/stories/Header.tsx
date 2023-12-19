import { Button } from './Button';
import PopOver from './PopOver';
import './header.css';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}


// #region Íconos

const IconOne = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

const IconTwo = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

const IconThree = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}

//#endregion

// Header menu options
const options = [
  {
    name: 'Booklist',
    description: 'See a list of all the available books',
    href: '/',
    icon: IconOne,
  },
  {
    name: 'Favourites',
    description: 'See a list of your favourites!',
    href: '/favourites',
    icon: IconTwo,
  },
  {
    name: 'Add new book',
    description: 'Add a new book to the collection',
    href: '/newBook',
    icon: IconThree,
  },
]

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>

        <PopOver options={options}></PopOver>

        <svg className="svg-icon" viewBox="0 0 20 20">
					<circle fill="none" cx="7.884" cy="11.397" r="0.699"></circle>
					<circle fill="none" cx="12.076" cy="11.397" r="0.699"></circle>
					<path fill="none" d="M17.685,5.808c-0.257,0-0.502,0.053-0.73,0.139C16.64,2.737,13.649,0.219,10,0.219c-3.649,0-6.64,2.518-6.955,5.728c-0.228-0.086-0.473-0.139-0.73-0.139c-1.153,0-2.096,0.943-2.096,2.096v3.493c0,1.153,0.943,2.096,2.096,2.096c0.28,0,0.547-0.058,0.792-0.158c0.113,1.088,0.304,1.795,0.585,2.254c0.539,0.834,4.139,4.192,6.288,4.192c2.149,0,5.751-3.361,6.272-4.167c0.292-0.476,0.488-1.196,0.602-2.296c0.255,0.112,0.536,0.175,0.831,0.175c1.153,0,2.096-0.943,2.096-2.096V7.904C19.781,6.751,18.838,5.808,17.685,5.808zM15.078,14.855c-0.482,0.746-3.715,3.529-5.099,3.529s-4.616-2.783-5.097-3.525c-0.319-0.521-0.444-1.919-0.489-3.297c0.004-0.055,0.017-0.108,0.017-0.164V8.603c0-0.04,0.005-0.078,0.006-0.118C4.779,8.56,5.156,8.603,5.545,8.603c1.994,0,3.706-1.037,4.455-2.519c0.749,1.482,2.461,2.519,4.455,2.519c0.389,0,0.766-0.043,1.128-0.118c0.001,0.039,0.006,0.078,0.006,0.118c0,0.077-0.008,0.152-0.012,0.229C15.598,10.276,15.641,13.938,15.078,14.855z"></path>
				</svg>

        <h1>A Song of Ice and Fire | Reading book club</h1>

        
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button customClassName="bg-teal-600" size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button customClassName="bg-gray-600" size="small" onClick={onLogin} label="Log in" />
            <Button customClassName="bg-gray-600" primary size="small" onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
