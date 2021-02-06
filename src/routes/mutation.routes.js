import { Router } from 'express';
import { hasMutation } from '../engines/mutation.engine';

const router = Router();

router.post('/mutation', (req, res) => {
    if (!req.body || !req.body.dna) res.status(400).send('Please, send a valid dna string')

    try {
        if (hasMutation(req.body.dna)) { 
            res.status(403).send('403-Forbidden'); 
        } else { 
            res.status(200).send('200-OK'); 
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

})

export default router;