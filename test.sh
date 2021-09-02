START_TIMER=$((`date '+%s'`*1000));

npm run build

END_TIMER=$((`date '+%s'`*1000))
TIMER=$((($END_TIMER - $START_TIMER)/1000/60));
SECOND=$((($END_TIMER - $START_TIMER)/1000%60));

echo '构建时间：'$TIMER'分钟'$SECOND'秒';

