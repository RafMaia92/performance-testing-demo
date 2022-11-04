to run 

docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/test01.js