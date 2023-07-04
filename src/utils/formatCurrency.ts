export const formatCurrency = (current: string): string => {
    const current_number = parseFloat(current)
    return current_number.toLocaleString(
        'pt-br',
        {
            style: 'currency',
            currency: 'BRL'
        }
    )
};


