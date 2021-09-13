import moment from 'moment';
export const DateHelper = {
    formatDateTR: (date) => {
        if (date) {
            const d= moment(date).format('DD.MM.YYYY HH:mm');
            // console.log(typeof date);
            // console.log(date)
            // const d = new Date(date)
            console.log(d.toString())
            return d;
            // console.log(JSON.stringify(d))

            // const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            // console.log(day);
            // const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
            // const year = d.getFullYear();
            // const hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            // const minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            // return `${day}/${month}/${year}`
        }
        return '';
    },
    formatDateEN: (date) => {
        if (date) {
            const d = new Date(date);
            const day = d.getDay() < 10 ? '0' + d.getDay() : d.getDay();
            const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
            const year = d.getFullYear();
            const hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            return `${month}/${day}/${year}`
        }
        return '';
    }
}