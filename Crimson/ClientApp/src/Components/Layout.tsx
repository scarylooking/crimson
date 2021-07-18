import * as React from 'react';
import NavMenu from './NavMenu/NavMenu';

type Props = {
  children: Array<JSX.Element>,
};

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => (
  <>
    <NavMenu />
    <div className="container">
      {children}
    </div>
  </>
);

export default Layout;
