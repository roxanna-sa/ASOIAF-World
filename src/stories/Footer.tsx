import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-700 p-4  text-white text-center">
      <p>
        Check the code on{' '}
        <a
          href="https://github.com/roxanna-sa/ASOIAF-World"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
        !
      </p>
    </footer>
  );
};

export default Footer;