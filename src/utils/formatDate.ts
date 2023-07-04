export const formatDate = (date: string): string => {
    const date_formated = new Date(date);
    const day = date_formated.getDate() > 9 ? date_formated.getDate() : `0${date_formated.getDate()}`;
    const month = date_formated.getMonth() + 1 > 9 ? date_formated.getMonth() + 1 : `0${date_formated.getMonth() + 1}`;
    const year = date_formated.getFullYear();


    return ` ${day}/${month}/${year}`
}