const formatStatement = (payments, startDate, principal, duration, interestRate) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + duration);
  
  const formatDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const statementDate = (date) => date.toLocaleDateString('en-GB', { month: 'short', 
    day: 'numeric', year: '2-digit' });
  
  const startingBalance = principal * (100 + interestRate) / 100;
  let currentBalance = startingBalance;
  
  let dataArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = formatDate(currentDate);
    const finalDate = statementDate(currentDate);
    const paymentItem = payments.find(item => item.paymentDate === formattedDate);

    let paymentAmount = 0;
    if (paymentItem) {
      paymentAmount = paymentItem.paymentAmount;
    }

    currentBalance -= paymentAmount;
    dataArray.push([finalDate, paymentAmount.toLocaleString('en-US'), currentBalance.toLocaleString('en-US'), 
      paymentAmount/100 >0 ? `+${paymentAmount/100}`: '-']);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // Add more dates if loan is past due date. 
  const latePayments = []
  const today = new Date();
  while (currentDate <= today){
    const formattedDate = formatDate(currentDate);
    const finalDate = statementDate(currentDate);
    const paymentItem = payments.find(item => item.paymentDate === formattedDate)

    if(paymentItem){
      let paymentAmount = paymentItem.paymentAmount; 
      currentBalance -= paymentAmount
      latePayments.push([finalDate, paymentAmount.toLocaleString('en-US'), 
        currentBalance.toLocaleString('en-US'), `+${paymentAmount/1000}`])
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate the totals
  const paymentTotal = payments.reduce((acc, item) => acc + item.paymentAmount, 0);
  return [dataArray, paymentTotal, latePayments];
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
    "Sept": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  };

  // Format the date in the desired format (YYYY-MM-DD)
  const formattedDate = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;

  return formattedDate;
};


const getDaysSinceStart = (startDate) => {
  const today = new Date();
  const oldDate =  convertDateFormat(startDate)
  const past = new Date(oldDate.slice(0,-1));
  const timeDifferenceInMilliseconds = today.getTime() - past.getTime();
  const differenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
  
  return differenceInDays;

}
const getDateDifferenceInDays = (startDate, duration) =>{
  const count = getDaysSinceStart(startDate)
  return count<=duration ? count : duration
}

export {formatStatement, convertDateFormat, getDateDifferenceInDays, getDaysSinceStart}