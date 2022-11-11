import http from 'k6/http';
import { sleep, check } from 'k6';


// export const options = {
//   stages: [
//     { duration: '2m', target: 400 }, // ramp up to 400 users
//     { duration: '10m', target: 4000 }, // stay at 400 for ~4 hours
//     { duration: '2m', target: 0 }, // scale down. (optional)
//   ],
// };


export const options = {

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },

  vus: 10000,
  duration: '3000s',
};
  

export default function () {
  const res = http.get('http://appdemo:8080/hello');

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

