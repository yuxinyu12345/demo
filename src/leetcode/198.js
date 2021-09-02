var rob = function (nums) {
  let high = nums.length - 1
  return steal(0)

  function steal(low) {
    if (low > high) { // 无房可偷
      return 0;
    }
    let robLow = nums[low] + steal(low + 2); // 偷
    let notRobLow = steal(low + 1); // 不偷
    let result = Math.max(robLow, notRobLow); // 取最大
    console.log('robLow', robLow);
    console.log('notRobLow', notRobLow);
    console.log('result', result);
    return result;
  }
};

var rob1 = function (nums) {
  let n = nums.length - 1
  let result = Array(nums.length).fill(0)
  for (let i = n; i >= 0; i--) {
    let robLow = result[i + 1] ? 0 + nums[i] : result[i + 1] + nums[i]
    let notRobLow = result[i + 1] ? result[i + 1] : 0
    result[i] = Math.max(robLow, notRobLow)
    console.log(result);
  }
  return result[0]
}

var rob2 = function (nums) {
  if (nums.length == 0) {
    return 0
  } else if (nums.length < 2) {
    return nums[0]
  } else if (nums.length == 2) {
    return Math.max(nums[0], nums[1])
  }
  let result = Array(nums.length).fill(0)
  result[0] = nums[0]
  result[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < nums.length; i++) {
    result[i] = Math.max(result[i - 2] + nums[i], result[i - 1])
  }
  return result[nums.length - 1]
}


var rob3 = function (nums) {
  if (nums.length == 0) {
    return 0
  } else if (nums.length < 2) {
    return nums[0]
  } else if (nums.length == 2) {
    return Math.max(nums[0], nums[1])
  }
  let length = nums.length
  let result = Array(nums.length + 1).fill([])
  for (let i = 0; i <= length; i++) {
    result[i] = Array(nums.length + 1).fill(0)
  }
  for (let i = 0; i < length; i++) {
    result[i][i] = nums[i];
  }
  console.log(result);
  // 填表
  for (let i = length - 2; i >= 0; i--) {
    for (let j = i + 1; j < length; j++) {
      result[i][j] = Math.max(result[i + 1][j], nums[i] + result[i + 2][j]);
      console.log(result);
    }
  }
  return result[0][length - 1];
}

let map = new Map()
var test = function (nums) {
  let length = nums.length
  let res = 0
  for(let j=0; j<length; j++) {
    res = Math.max(res, digui(j))
  }
  function digui(n) {
    if(map.has(n)) {
      return map.get(n)
    }
    if(n >= length) {
      return 0
    }
    let count = 1
    for(let i=n+1; i<length; i++) {
      if(nums[i] > nums[n]) {
        // console.log(count);
        count = Math.max(count,1 + digui(i))
      }
    }
    map.set(n, count)
    return count
  }
  return res
}

var test1 = function (nums) {
  let length = nums.length
  let res = Array(length).fill(1)
  for(let i=length-1; i>=0; i--) {
    for(let j=i+1; j<length; j++) {
      if(nums[j] > nums[i]) {
        console.log(nums[i])
        res[i] = Math.max(res[i], 1+res[j])
        console.log(res);
      }
    }
  }
  // console.log(res);
  return res
}


console.log(test1(
  [1,4,2,5,1]
));


// console.log(rob3(
//   [1, 2, 3, 4]
// ));

