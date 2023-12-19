import React from 'react';

import { Header } from './Header';
import './page.css';

type User = {
  name: string;
};

interface ContainerProps {
  children?: React.ReactNode;
};

export const Page: React.FC = ({ children }: ContainerProps) => {
  const [user, setUser] = React.useState<User>();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Roxana Soto' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Roxana Soto' })}
      />

      <section className="storybook-page bg-stone-100 rounded-xl">
        {children}
      </section>
    </article>
  );
};
