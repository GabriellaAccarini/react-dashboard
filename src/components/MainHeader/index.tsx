import React, { useMemo, useState } from 'react'
import { ToggleComponent } from "../Toggle";

import emojis from '../../utils/emojis'
import {
    Container,
    Profile,
    Welcome,
    UserName,
} from './styles';

import { useTheme } from '../../hooks/theme';


const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, [])
    return (
        <Container>
            <ToggleComponent
                labelLeft='Dark'
                labelRight='Light'
                checked={darkTheme}
                onChange={handleChangeTheme}
            />
            <Profile>
                <Welcome>
                    Olá, {emoji}
                </Welcome>
                <UserName> Gabriella Accarini</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;