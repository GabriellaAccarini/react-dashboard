import react, { ReactNode } from 'react'
import { Container, Tag } from './styles';

interface IHistoryFinanceCardInterface {
    tagColor: string;
    title: string;
    subtitle: string;
    amound: string
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardInterface> = ({
    tagColor,
    title,
    subtitle,
    amound
}) => {
    return (
        <Container>
            <Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>
            </div>
            <h3>{amound}</h3>
        </Container>
    );
}

export default HistoryFinanceCard;