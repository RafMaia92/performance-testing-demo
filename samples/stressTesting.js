
import http from 'k6/http';
import { sleep, check } from 'k6';
import DEFAULT_THRESHOLD from config

export const options = {

    thresholds: DEFAULT_THRESHOLD,
  
    vus: 1,
    duration: '5s',
  };
    
  export default function () {
    const res = http.get('http://appdemo:8080/hello')
  
    check(res, { 'status was 200': (r) => r.status == 200 });
    check(res.json().length, { 'should return 3 elements': (r) => r == 3 })
    check(res.json()[0].title, { '1st element should be Testing with K6': (r) => r == "Testing with K6" })

    sleep(1);
  }
  