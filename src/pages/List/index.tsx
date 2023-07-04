import React, { useState, useEffect } from 'react';
import { Container, Content, Filters } from './styled';
import { useParams } from 'react-router-dom';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput/Index';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';


import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'


interface IListParams {
    title: string,
    lineColor: string,
    listValues: IData[] | null
}

interface IData {
    description: string;
    amount: string;
    type: string
    frequency: string;
    date: string;
}

const List: React.FC = () => {

    let listParams: IListParams = {
        title: '',
        lineColor: '',
        listValues: null
    };

    const [monthSelected, setMonthSelected] = useState<string>(String(1));
    const [yearSelected, setYearSelected] = useState<string>(String(2023));
    const [data, setData] = useState<IData[] | null>(listParams.listValues);
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    const { type } = useParams();

    type === 'entry-balance' ? listParams = {
        title: 'Entrada',
        lineColor: '#f7931b',
        listValues: gains
    } : listParams = {
        title: 'Saída',
        lineColor: '#E44C4E',
        listValues: expenses
    };

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
        selectedFrequency: string[]): IData[] | null => {
        if (list != null) {
            const newList = list.filter(item => {
                const month = item.date.substring(6, 7);
                const year = item.date.substring(0, 4);
                const frequency = item.frequency;
                return month === monthSelected && year === yearSelected && selectedFrequency.includes(frequency)
            })
            return newList
        } else {
            return null;
        }
    }

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filteredFrequency = selectedFrequency.filter(item => item != frequency);
            setSelectedFrequency(filteredFrequency);

        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);
        }
    }

    useEffect(() => {
        const newList = filteredList(listParams.listValues, monthSelected, yearSelected, selectedFrequency);
        setData(newList);
    }, [monthSelected, yearSelected, selectedFrequency])


    return (

        <Container>
            <ContentHeader title={listParams.title} lineColor={listParams.lineColor}>
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
            <Filters>
                <button
                    type='button'
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button
                    type='button'
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>
            <Content>
                {
                    data != null ? data.map((item) => (

                        <HistoryFinanceCard
                            key={Math.random() * item.date.length}
                            tagColor={item.frequency === 'recorrente' ? '#E44C4E' : '#4E41f0'}
                            title={item.description}
                            subtitle={formatDate(item.date)}
                            amound={formatCurrency(item.amount)}
                        />

                    ))
                        :
                        ""
                }
            </Content>
        </Container>
    );
}

export default List;