import react, { ReactNode } from 'react'
import { Container } from './styled';

interface ISelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}

const SelectInput: React.FC<ISelectInputProps> = ({ options, onChange, defaultValue }) => {
    return (
        <Container>
            <select
                onChange={onChange}
                defaultValue={defaultValue}
            >
                {
                    options.map(option => (
                        <option
                            value={option.value}
                            key={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </Container>
    );
}

export default SelectInput;