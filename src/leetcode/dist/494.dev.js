"use strict";

var findTargetSumWays = function findTargetSumWays(nums, target) {
  var sum = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nums[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _num = _step.value;
      sum += _num;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var diff = sum - target;

  if (diff < 0 || diff % 2 !== 0) {
    return 0;
  }

  var n = nums.length,
      neg = diff / 2;
  var dp = new Array(n + 1).fill(0).map(function () {
    return new Array(neg + 1).fill(0);
  });
  console.log(dp);
  dp[0][0] = 1;

  for (var i = 1; i <= n; i++) {
    var num = nums[i - 1];

    for (var j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];

      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }

  console.log(dp);
  return dp[n][neg];
};

var findTargetSumWays1 = function findTargetSumWays1(nums, target) {
  var sum = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nums[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var num = _step2.value;
      sum += num;
    } // const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var dp = new Array(nums.length + 1).fill(0).map(function () {
    return new Array(sum * 2 + 1).fill(0);
  });
  dp[0][sum + 1] = 1; // console.log(dp);

  for (var i = 1; i < nums.length; i++) {
    for (var j = 0; j < dp[0].length; j++) {
      dp[i][j] = dp[i - 1][j - nums[i]] + dp[i - 1][j + nums[i]];
    }
  }

  console.log(dp);
};

findTargetSumWays1([1, 1, 1, 1, 1], 3);