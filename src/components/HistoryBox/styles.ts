import styled, { keyframes } from "styled-components";

interface ILegendProps {
    color: string
}

const animate = keyframes`
    0%{
        transform: translateX(-100px);
        opacity: 0;
    }

    50%{
        opacity: .3;
    }

    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`

export const Container = styled.div`
    width: 100%;
    

    background-color: ${props => props.theme.colors.tertiary};

    margin: 10px, 0;
    

    border-radius: 7px;

    animation: ${animate} .5ss;
   
`;

export const ChartContainer = styled.div`
    flex: 1;
    height:260px;
    `

export const Header = styled.header`
padding: 10px;
width: 100%;

display: flex;
justify-content: space-between;

@media(max-width: 1280px){
    flex-direction: column;
}
`
export const LegendContainer = styled.ul`
    list-style: none;

    display: flex;
   
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    margin-top: 5px;
    margin-left: 5px;

    font-size: 16px;
    >div{
        background-color: ${props => props.color};

        width: 40px;
        height: 40px;

        border-radius: 5px;

        font-size: 14px;

        line-height: 40px;
        text-align: center;
    }

    >span {
        margin-left: 5px;
    }
    
    
    @media(max-width: 1200px){
       >div {
        width: 30px;
        height: 30px;
       }
}
    `;