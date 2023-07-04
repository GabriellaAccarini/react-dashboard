import react, { ReactNode } from 'react'
import { Container } from './styles';

interface ContentProps {
    children: ReactNode,
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default Content;