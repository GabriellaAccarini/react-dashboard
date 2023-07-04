import React, { useState } from 'react'
import { ToggleComponent } from '../Toggle';
import {
    Container,
    Header,
    LogoImage,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from './styles';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md';
import logoImage from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

const Aside: React.FC = () => {

    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);


    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu
                    onClick={handleToggleMenu}
                >
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>
                <LogoImage src={logoImage} alt='Logo minha carteira' />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='/'>
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href='/list/entry-balance'>
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href='/list/out-balance'>
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton 
                onClick={signOut}
                href='/'>
                    <MdExitToApp />
                    Saír
                </MenuItemButton>

            </MenuContainer>

            <ThemeToggleFooter
                menuIsOpen={toggleMenuIsOpened}
            >
                <ToggleComponent
                    labelLeft='Dark'
                    labelRight='Light'
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container >
    );
}

export default Aside;