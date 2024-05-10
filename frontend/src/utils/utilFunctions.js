export const formatDate = (date) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDate = new Date(date);

    const day = formattedDate.getDate();
    const monthIndex = formattedDate.getMonth();
    const year = formattedDate.getFullYear();

    const formattedDateString = `${day}-${months[monthIndex]}-${year}`;

    return formattedDateString;
};
