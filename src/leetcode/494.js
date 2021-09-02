var findTargetSumWays = function (nums, target) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) {
    return 0;
  }
  const n = nums.length,
    neg = diff / 2;
  const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));
  // console.log(dp);
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  // console.log(dp);
  return dp[n][neg];

};


var findTargetSumWays1 = function (nums, target) {
  let sum = 0;
  for (let num of nums) {
    sum += num
  }

  // const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));
  let dp = new Array(nums.length).fill(0).map(() => new Array((sum * 2) + 1).fill(0))

  
  if (nums[0] == 0) {
    dp[0][sum] = 2;
  } else {
    dp[0][sum + nums[0]] = 1;
    dp[0][sum - nums[0]] = 1;
  }
  console.log(dp);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < dp[0].length; j++) {
      let l = (j-nums[i]) >= 0 ? j-nums[i] : 0
      let r = (j+nums[i]) < dp[0].length ? j+nums[i] : 0
      dp[i][j] = dp[i - 1][l] + dp[i-1][r]
    }
    // console.log(i);
  }
  return dp[nums.length-1][target+sum]
};


var findTargetSumWays2 = function(nums, S) {
  var total = 0;
  for (let i=0; i<nums.length; i++) {
      total += nums[i];
  }

  if (total < S) {
      return 0;
  }
  
  var range = total * 2 + 1;
  var dp = new Array(nums.length).fill(0).map((item) => {return new Array(range).fill(0)});
 
  dp[0][nums[0] + total] = 1;
  dp[0][total - nums[0]] += 1;    // 如果nums[0] === 0, 那么targetSum = 0的情况有两种选择，即sum[0]是+还是-都可行。故这里用+1不是=1
  
  for (let i=1; i<nums.length; i++) {
      for (let j=-total; j<=total; j++) {
          if ((j+nums[i]+total) >= range) {   // 防止越界：如果条件成立，意味着选+号没有可行方案，故+0即可
              dp[i][j + total] = dp[i - 1][j - nums[i] + total] + 0;
          }
          else if ((j-nums[i]+total) < 0){    // 防止越界：如果条件成立，意味着选-号没有可行方案，故+0即可
              dp[i][j + total] = dp[i - 1][j + nums[i] + total] + 0;
          }
          else {
              dp[i][j + total] = dp[i - 1][j - nums[i] + total] + dp[i - 1][j + nums[i] + total];
          }
      }
  }
  console.log(dp);

  return dp[nums.length-1][S + total];
};

console.log(findTargetSumWays1([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  , 0));