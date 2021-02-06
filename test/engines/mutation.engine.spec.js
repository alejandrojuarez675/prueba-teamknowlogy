import { assert } from 'chai';
import { describe, it } from 'mocha';
import { hasMutation } from '../../src/engines/mutation.engine';

describe('MutationEngine', () => {

    it('#hasMutation() - case: true - double mutation', () => {

        const dna = [
            "ATGCGA", 
            "CAGTGC", 
            "TTATGT", 
            "AGAAGG", 
            "CCCCTA", 
            "TCACTG"];

        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: without mutation', () => {

        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATTT",
            "AGACGG",
            "GCGTCA",
            "TCACTG",
        ];

        assert.isFalse(hasMutation(dna))
    });

});