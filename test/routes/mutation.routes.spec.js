import { assert } from 'chai';
import { describe, it } from 'mocha';
import createServer from './../../src/server';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('POST - /mutation', async () => {
    const server = await createServer(12345);
    
    it('Response normal DNA', async () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATTT",
            "AGACGG",
            "GCGTCA",
            "TCACTG",
        ];

        const res = await chai.request(server)
            .post('/mutation')
            .send({ dna });
        assert.equal(res.status, 200);
    });
    
    it('Response for mutation', async () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"];

        const res = await chai.request(server)
            .post('/mutation')
            .send({ dna });
        assert.equal(res.status, 403);
    });
        
    it('Response for empty body', async () => {
        const res = await chai.request(server)
            .post('/mutation')
            .send({});
        assert.equal(res.status, 400);
    });

});