import react, { ReactNode } from 'react'
import { Grid } from './styles';
import MainHeader from '../MainHeader';
import Aside from '../Aside';
import Content from '../Content';

interface LayoutChildren {
    children: ReactNode;
}

const Layout: React.FC<LayoutChildren> = ({children}) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </Grid>
    );
}

export default Layout;