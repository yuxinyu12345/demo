/* 

给你一个下标从 0 开始的正整数数组 candiesCount ，其中 candiesCount[i] 表示你拥有的第 i 类糖果的数目。同时给你一个二维数组 queries ，其中 queries[i] = [favoriteTypei, favoriteDayi, dailyCapi] 。

你按照如下规则进行一场游戏：

你从第 0 天开始吃糖果。
你在吃完 所有 第 i - 1 类糖果之前，不能 吃任何一颗第 i 类糖果。
在吃完所有糖果之前，你必须每天 至少 吃 一颗 糖果。
请你构建一个布尔型数组 answer ，满足 answer.length == queries.length 。answer[i] 为 true 的条件是：在每天吃 不超过 dailyCapi 颗糖果的前提下，你可以在第 favoriteDayi 天吃到第 favoriteTypei 类糖果；否则 answer[i] 为 false 。注意，只要满足上面 3 条规则中的第二条规则，你就可以在同一天吃不同类型的糖果。

请你返回得到的数组 answer 。



*/





var canEat = function (candiesCount, queries) {
  let answer = []
  let sumArr = []
  sumArr[0] = candiesCount[0]
  for(let i=1; i<candiesCount.length; i++) {
    sumArr[i] = sumArr[i-1] + candiesCount[i]
  }
  for (let i = 0; i < queries.length; i++) {
    let sum = sumArr[queries[i][0]],
      res;
   /*  for (let j = 0; j <= queries[i][0]; j++) {
      sum = candiesCount[j] + sum
      res = sum / (queries[i][1] + 1)
    } */
    res = sum / (queries[i][1] + 1)
    let a = sum - candiesCount[queries[i][0]] <= queries[i][2] * queries[i][1] && queries[i][2] * queries[i][1] <= sum
    if (res <= queries[i][2] && res >= 1) {
      answer.push(true)
    } else if (
      a
    ) {
      answer.push(true)
    } else {
      answer.push(false)
    }
  }
  return answer
};

let candiesCount = [46, 5, 47, 48, 43, 34, 15, 26, 11, 25, 41, 47, 15, 25, 16, 50, 32, 42, 32, 21, 36, 34, 50, 45, 46, 15, 46, 38, 50, 12, 3, 26, 26, 16, 23, 1, 4, 48, 47, 32, 47, 16, 33, 23, 38, 2, 19, 50, 6, 19, 29, 3, 27, 12, 6, 22, 33, 28, 7, 10, 12, 8, 13, 24, 21, 38, 43, 26, 35, 18, 34, 3, 14, 48, 50, 34, 38, 4, 50, 26, 5, 35, 11, 2, 35, 9, 11, 31, 36, 20, 21, 37, 18, 34, 34, 10, 21, 8, 5],
  queries = [
    [11, 387, 25]
  ]



console.log(canEat(candiesCount, queries));


/* 总结：
      如果有使用到一个数组的叠加性质就是把前面的几项给叠加起来的话；就先创建一个数组把全部每一个相加的结果存在一个数组中去；
      这个有点像动态规划的问题。



*/