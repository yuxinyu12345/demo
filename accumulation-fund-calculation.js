

/**
 * @description: 
 * @param {*} current 当前公积金金额
 * @param {*} amountMonth 每月缴纳金额
 * @param {*} month 需要未来截止几月
 * @return {*}
 */
function calculation(current, amountMonth, month) {
  let total = current + (amountMonth * month)
  const totalArr = [total]
  for(let i = 0; i < 11; i++) {
    total = total - amountMonth
    totalArr.push(total)
  }
  return (totalArr.reduce((total, currentValue) => total + currentValue) / 12) * 12
}

console.log(calculation(16984.39, 2518, 10));  //今年12月 339784.6800000001

console.log(calculation(16374.93, 548, 10));  //今年12月 226091.15999999997