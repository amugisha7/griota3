const dateFormat = (dateString)=> {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-UK', options);
}
export {dateFormat}