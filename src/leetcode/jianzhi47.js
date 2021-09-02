var maxValue = function(grid) {
  let rows = grid.length
    if (!rows) return 0
    let cols = grid[0].length
    let dp = Array(cols).fill(0)
    for(let i = 0; i<rows; i++) {
        for(let j = 0; j<cols; j++) {
            let a = i+1 < rows ? 0 : dp[j]
            let b = j+1 < cols ? 0 : dp[j+1]
            dp[j] = grid[i][j] + Math.max(a, b)
            console.log(dp);
        }
    }
    return dp[0]
};

var maxValue1 = function(grid) {
  let row = grid.length;
  let col = grid[0].length
  let res = digui(0,0)
  function digui(m,n) {
    if(m>=row || n>=col) {
      return 0
    }
    let right = grid[m][n] + digui(m, n+1)
    let down = grid[m][n] + digui(m+1, n)
    let result = Math.max(right, down)
    return result
  }
  return res
}

console.log(maxValue1(
  [
    [1,3,1],
    [1,5,10],
    [4,20,1]
  ]
));