import axios from "axios";
import { expect } from "chai";
import {username, password} from "./env.spec.js"
import bookingData from "./bookingData.json" assert { type: "json" };


const BASE_URL = 'https://restful-booker.herokuapp.com';

let token = '';
let bookingId = '';

describe('Booking API E2E Tests', function () {
    it('Authenticate and get token', async function () {
        const response = await axios.post(`${BASE_URL}/auth`, {
          username: username,
          password: password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        expect(response.status).to.equal(200);
        expect(response.data.token).to.be.a('string');
        token = response.data.token;
        console.log('Received token:', token);
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

      });
      
      

  it('Create a new booking', async function () {
    const response = await axios.post(`${BASE_URL}/booking`, bookingData, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    }
    });

    expect(response.status).to.equal(200);
    // expect(response.data.booking).to.include(bookingData);
    expect(response.data.booking).to.deep.include(bookingData);
    bookingId = response.data.bookingid;

  });

  it('Get the created booking', async function () {
    console.log("Booking ID to fetch:", bookingId);
    const response = await axios.get(`${BASE_URL}/booking/${bookingId}`);


    expect(response.status).to.equal(200);
    expect(response.data.booking).to.deep.include(bookingData);
  });

  it('Delete the booking', async function () {
    const response = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        Authorization: `Basic YWRtaW46cGFzc3dvcmQxMjM=`
      }

      
    });

    expect(response.status).to.equal(201);
    console.log("Delete with token:", token);
    console.log("Booking ID to delete:", bookingId);

  });
});
