import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <React.Fragment>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </React.Fragment>
        );
    }
}