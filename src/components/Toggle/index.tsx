import React from "react";
import { Container, ToggleLabel } from "./styles";
import { ToggleSelector } from './styles';

interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

export const ToggleComponent: React.FC<IToggleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChange
}) => (
    <Container>
        <ToggleLabel>{labelRight}</ToggleLabel>
        <ToggleSelector
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={onChange} />
        <ToggleLabel>{labelLeft}</ToggleLabel>
    </Container>
);