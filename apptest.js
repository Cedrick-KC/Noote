import * as chai from 'chai';
import app from "package.json"; // Import your app
const expect = chai.expect;

describe('GET /', () => {
  it('should return Hello, World!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello,World!');   

  });
});