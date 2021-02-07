import request from 'supertest';
import app from '../src/app';

describe('GET /login', () => {
    it('should return 200 OK', () => {
        return request(app).get('/login')
            .expect(200);
    });
});

describe('Should health check', () => {
    it('should return 200 OK', () => {
        return request(app).get('/healthcheck')
            .expect(200);
    });
});

describe('The main page', () => {
    it('should return 200 OK', () =>{
        return request(app).get('/')
            .expect(200);
    });
    it('should mention compiler explorer', () =>{
        return request(app).get('/')
            .expect(/Compiler Explorer/);
    });
});
