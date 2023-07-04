import React, { useMemo } from 'react'
import { Container } from './styles';

import CountUp from 'react-countup';

import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown' | null;
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    icon,
    color

}) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dollar':
                return dollarImg;
            case 'arrowUp':
                return arrowUpImg
            case 'arrowDown':
                return arrowDownImg
            default:
                return null
        }
    }, [icon])

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end={amount}
                    separator='.'
                    decimal=','
                />
            </h1>
            <small>{footerlabel}</small>
            {iconSelected && <img src={iconSelected} alt='title' />}
        </Container>
    );
}

export default WalletBox;