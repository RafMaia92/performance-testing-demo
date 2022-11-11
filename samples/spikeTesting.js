
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {

    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, // scale down. Recovery stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },

};

export default function () {
    const res = http.get('http://appdemo:8080/hello')

    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res.json().length, { 'should return 3 elements': (r) => r == 3 })
    check(res.json()[0].title, { '1st element should be Testing with K6': (r) => r == "Testing with K6" })

    sleep(1);
}
