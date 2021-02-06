import { Schema } from 'mongoose';
import db from '../database';

const verifiedDnaSchema = new Schema({
    dna: [String],
    hasMutation: Boolean
});

export default db.model('verifieddna', verifiedDnaSchema);