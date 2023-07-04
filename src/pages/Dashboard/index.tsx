import react, { useState, useEffect, useMemo } from 'react'
import { Container, Content } from './styled';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput/Index';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'



interface IData {
    description: string;
    amount: string;
    type: string
    frequency: string;
    date: string;
}


const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<string>(String(1));
    const [yearSelected, setYearSelected] = useState<string>(String(2023));
    const [data, setData] = useState<IData[] | null>([...gains, ...expenses]);

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' }
    ]

    const years = [
        { value: 2023, label: 2023 },
    ]

    const filteredList = (
        list: IData[] | null,
        monthSelected: string,
        yearSelected: string,
    ): IData[] | null => {
        if (list != null) {
            const newList = list.filter(item => {
                const month = item.date.substring(6, 7);
                const year = item.date.substring(0, 4);
                return month === monthSelected && year === yearSelected
            })
            return newList
        } else {
            return null;
        }
    }

    useEffect(() => {
        const newList = filteredList([...gains, ...expenses], monthSelected, yearSelected);
        setData(newList);
    }, [monthSelected, yearSelected])

    const totalExpenses = useMemo(() => {
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === Number(monthSelected) && year === Number(yearSelected)) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount')
                }
            }
        })
        return total;
    }, [monthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === Number(monthSelected) && year === Number(yearSelected)) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount')
                }
            }
        })
        return total;
    }, [monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        const total = totalGains - totalExpenses;
        return total;
    }, [monthSelected, yearSelected])

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: 'Que triste!',
                description: 'Neste mês você gastou mais do que deveria',
                footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias',
                icon: sadImg
            }
        } else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: 'Ops!',
                description: 'Neste mês não há registros de entradas ou saídas',
                footerText: 'Parece que você não realizou nenhum registro no mês e ano selecionado',
                icon: sadImg
            }
        } else if (totalBalance === 0) {
            return {
                title: 'Uffa!',
                description: 'Neste mês você gastou exatamente o que ganhou.',
                footerText: 'Tenha cuidado. No próximo mês tente poupar o seu dinheiro',
                icon: grinningImg
            }
        } else {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim. Considere investir o seu valor.',
                icon: happyImg
            }
        }

    }, [totalBalance, totalGains, totalExpenses])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'

            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'

            },
        ]

        return data;

    }, [totalGains, totalExpenses])

    const historyData = useMemo(() => {
        return months.map((month, index) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === index && gainYear === Number(yearSelected)) {
                    try {
                        amountEntry += Number(gain.amount);
                    } catch {
                        throw new Error('amountEntry is invalid! amountEntry must be valid number');
                    }
                }
            })


            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === index && expenseYear === Number(yearSelected)) {
                    try {
                        amountOutput += Number(expense.amount);
                    } catch {
                        throw new Error('amountOutput is invalid! amountOutput must be valid number');
                    }
                }
            })
            return {
                monthNumber: month,
                month: month.label.substring(0, 3),
                amountEntry,
                amountOutput
            }
        })
    }, [yearSelected])

    const relationExpensivesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter(expense => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month.toString() === monthSelected && year.toString() === yearSelected;
        })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += Number(expense.amount);
                }

                if (expense.frequency === 'eventual') {
                    return amountEventual += Number(expense.amount);
                }
            })

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B",
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E",
            }
        ];
    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter(gain => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month.toString() === monthSelected && year.toString() === yearSelected;
        })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += Number(gain.amount);
                }

                if (gain.frequency === 'eventual') {
                    return amountEventual += Number(gain.amount);
                }
            })

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B",
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E",
            }
        ];
    }, [monthSelected, yearSelected]);


    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor='#E44C4E'>
                <SelectInput
                    options={months}
                    onChange={(e) => setMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => setYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Content>
                <WalletBox
                    title='Saldo'
                    amount={totalBalance}
                    footerlabel="atualizado com base nas entradas e saídas"
                    color="#4e41f0"
                    icon="dollar" />

                <WalletBox
                    title='Entradas'
                    amount={totalGains}
                    footerlabel="atualizado com base nas entradas e saídas"
                    color="#f7931b"
                    icon="arrowUp" />

                <WalletBox
                    title='Saídas'
                    amount={totalExpenses}
                    footerlabel="atualizado com base nas entradas e saídas"
                    color="#E44C4E"
                    icon="arrowDown" />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
                <PieChartBox data={relationExpensesVersusGains} />
                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry='#F7931B'
                    lineColorAmountOutput="#E44C4E"
                />
                <BarChartBox
                    title='Saídas'
                    data={relationExpensivesRecurrentVersusEventual}
                />

                <BarChartBox
                    title='Entradas'
                    data={relationGainsRecurrentVersusEventual}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;