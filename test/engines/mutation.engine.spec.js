import { assert } from 'chai';
import { describe, it } from 'mocha';
import { hasMutation } from '../../src/engines/mutation.engine';

describe('MutationEngine', () => {

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

    it('#hasMutation() - case: horizontal mutation last 4', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATTT",
            "AGACGG",
            "GCGTCA",
            "TCAAAA",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: horizontal mutation first 4', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTTTTT",
            "AGACGG",
            "GCGTCA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: vertical mutation first 4', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTGTTT",
            "AGGCGG",
            "GCGTCA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: vertical mutation last 4', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTACTT",
            "AGACGG",
            "GCGCCA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: diagonal mutation last 4 rigth-bottom', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTGTTT",
            "AGAGGG",
            "GCGTGA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: diagonal mutation medium rigth-bottom', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATTT",
            "AGAAGG",
            "GCGTAA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

    it('#hasMutation() - case: diagonal mutation medium left-bottom', () => {
        const dna = [
            "ATGCGA",
            "CAGTCC",
            "TTACTT",
            "AGCAGG",
            "GCGTAA",
            "TCACTG",
        ];
        assert.isTrue(hasMutation(dna))
    });

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

    it('#hasMutation() - validation Matrix NxN', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TTATGT",
            "AGAAGGDDDDD",
            "CCCCTA",
            "TCACTG"];

        assert.Throw(() => hasMutation(dna))
    });

    it('#hasMutation() - validation Matrix NxN', () => {
        const dna = [
            "ATGCGA",
            "CAGTGC",
            "TSATTT",
            "AGACGG",
            "GCGTCA",
            "TCACTG"];

        assert.Throw(() => hasMutation(dna))
    });

    it('#hasMutation() - validation Matrix NxN. N<4', () => {
        const dna = [
            "ATG",
            "CAG",
            "TTA",
        ];
        assert.Throw(() => hasMutation(dna))
    });


    it('#hasMutation() - validation Matrix is empty', () => {
        const dna = [];
        assert.Throw(() => hasMutation(dna))
    });
});