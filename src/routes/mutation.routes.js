import { Router } from 'express';
import { hasMutation } from '../engines/mutation.engine';
import VerifiedDna from '../models/verified-dna.model';
import StatsVerifiedDna from './../models/stats-verified-dna.model';

const router = Router();

router.post('/mutation', async (req, res) => {
    if (!req.body || !req.body.dna) res.status(400).send('Please, send a valid dna string')

    try {
        const hasAnyMutation = hasMutation(req.body.dna);
        
        const verifiedDna = new VerifiedDna({ dna: req.body.dna, hasMutation: hasAnyMutation });
        verifiedDna.save()

        updateStats(hasAnyMutation);

        if (hasAnyMutation) { res.status(403).send('403-Forbidden'); } 
        else { res.status(200).send('200-OK'); }

    } catch (err) {
        res.status(500).send(err.message);
    }

})

router.get('/stats', async (_req, res) => {
    const statsVerifiedDna = await StatsVerifiedDna.find({});

    if (!statsVerifiedDna[0]) {
        res.json({ count_mutations: 0, count_no_mutations: 0, ratio: 0 });
        return;
    }

    const ratio = statsVerifiedDna[0].withoutMutation != 0 ? 
        statsVerifiedDna[0].withMutation/statsVerifiedDna[0].withoutMutation : 0;

    res.json({
        count_mutations: statsVerifiedDna[0].withMutation,
        count_no_mutations: statsVerifiedDna[0].withoutMutation,
        ratio
    });
})

async function updateStats(hasAnyMutation) {
    const stats = await StatsVerifiedDna.find({});

    if (stats.length == 0) {
        const newStatsCount = hasAnyMutation ? 
            new StatsVerifiedDna({ withMutation: 1, withoutMutation: 0 }) : 
            new StatsVerifiedDna({ withMutation: 0, withoutMutation: 1 });
        newStatsCount.save();
    } else {

        if (hasAnyMutation) {
            await StatsVerifiedDna.findByIdAndUpdate(
                stats[0]._id,
                { $inc: { withMutation: 1 }}
            );
        } else {
            await StatsVerifiedDna.findByIdAndUpdate(
                stats[0]._id,
                { $inc: { withoutMutation: 1 }}
            );
        }

    }
}

export default router;