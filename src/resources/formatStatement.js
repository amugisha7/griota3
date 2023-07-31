const formatStatement = (payments, startDate, principal) => {
  const startingBalance = principal * 1.2;
  const result = [];
  result.unshift([startDate, '-', startingBalance])

  let remainingBalance = startingBalance;

  for (let i = 0; i < payments.length; i++) {
    const item = payments[i];
    remainingBalance -= item.paymentAmount;
    result.push([item.paymentDate, item.paymentAmount, remainingBalance]);
  }

  // Calculate the totals
  const paymentTotal = payments.reduce((acc, item) => acc + item.paymentAmount, 0);

  return [result, paymentTotal]

}
export {formatStatement}