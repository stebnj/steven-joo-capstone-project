const listings = require('../listings-data/listings');

const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try{
        const data = await knex('nest_tables');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving listings: ${err}`)
    }
}

const getProperty = async (req, res) => {
    try {
        const listingsFound = await knex ('nest_tables')
            .where({id: req.params.id});

        if(listingsFound.length === 0) {
            return res.status(404).json({
                message: `Listings with ID ${req.params.id} not found`
            })
        }

        const listingData = listingsFound[0];
        res.json(listingData)
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve user data for user with ID ${req.params.id}`
        })
    }
}

module.exports = {
    index,
    getProperty
}