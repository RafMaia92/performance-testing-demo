
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {

    stages: [
        { duration: '2m', target: 400 }, // ramp up to 400 users
        { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
        { duration: '2m', target: 0 }, // scale down. (optional)
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
