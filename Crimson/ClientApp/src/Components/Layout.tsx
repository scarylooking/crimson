import * as React from 'react';
import { Container } from 'react-bootstrap';
import NavMenu from './NavMenu/NavMenu';

type Props = {
  children: Array<JSX.Element>,
};

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => (
  <>
    <NavMenu />
    <Container>
      {children}
    </Container>
  </>
);

export default Layout;
