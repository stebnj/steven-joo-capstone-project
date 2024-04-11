const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors")
const knex = require('knex')(require('./knexfile'));

const PORT = process.env.PORT || 5050;
const HARVARD_COORDINATES = { lat: 42.374443, lng: -71.116943 };
const SEARCH_RADIUS = 5000

const apiRoutes = require('./routes/api-routes')

app.use(cors());

app.use(express.json());

app.get('/listings/near-harvard', async (_req, res) => {
    try {
        const listings = await knex('nest_tables')
            .whereRaw(`
                6371 * acos(
                    cos(radians(?)) * 
                    cos(radians(JSON_EXTRACT(address, '$.latitude'))) * 
                    cos(radians(JSON_EXTRACT(address, '$.longitude')) - radians(?)) +
                    sin(radians(?)) * 
                    sin(radians(JSON_EXTRACT(address, '$.latitude')))
                ) <= ?
            `, [
                HARVARD_COORDINATES.lat,
                HARVARD_COORDINATES.lng,
                HARVARD_COORDINATES.lat,
                SEARCH_RADIUS
            ]);

        res.status(200).json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).send('Failed to fetch listings');
    }
});

app.get('/listings/near-:schoolName', async (req, res) => {
    const { minRent, maxRent, bedRange } = req.query;
    console.log('Received filters:', { minRent, maxRent, bedRange });

    try {
        let query = knex('nest_tables');

        if (minRent) {
            query.where('rent_range', '>=', Number(minRent));
        }

        if (maxRent) {
            query.where('rent_range', '<=', Number(maxRent));
        }

        if (bedRange) {
            query.where('bed_range', bedRange);
        }

        const listings = await query;
        res.json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).send('Failed to fetch listings');
    }
});

app.use('/listings', apiRoutes);


app.listen(PORT, () => {
console.log(`running at http://localhost:${PORT}`);
});