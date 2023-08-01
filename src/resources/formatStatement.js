
const formatStatement = (payments, startDate, principal) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  const startingBalance = principal * 1.2;
  let currentBalance = startingBalance;
  
  let dataArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = formatDate(currentDate);
    const paymentItem = payments.find(item => item.paymentDate === formattedDate);

    let paymentAmount = 0;
    if (paymentItem) {
      paymentAmount = paymentItem.paymentAmount;
    }

    currentBalance -= paymentAmount;
    dataArray.push([formattedDate, paymentAmount, currentBalance]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate the totals
  const paymentTotal = payments.reduce((acc, item) => acc + item.paymentAmount, 0);
  return [dataArray, paymentTotal];
};

const convertDateFormat = (dateString) => {
  // Split the date string into month, day, and year parts
  const [month, day, year] = dateString.split(' ');

  // Create a mapping of month abbreviations to numeric months
  const monthMap = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  };

  // Format the date in the desired format (YYYY-MM-DD)
  const formattedDate = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;

  return formattedDate;
};

const getDateDifferenceInDays = (pastDate) => {
  const today = new Date();
  const oldDate =  convertDateFormat(pastDate)
  const past = new Date(oldDate.slice(0,-1));
  const timeDifferenceInMilliseconds = today.getTime() - past.getTime();
  const differenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

  return differenceInDays;
};

export {formatStatement, convertDateFormat, getDateDifferenceInDays}