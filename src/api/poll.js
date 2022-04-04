const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = await base.table('votes').create(req.body)
        res.status(200).json(data)
        return;
    }
    if (req.method === "GET"){
        const data = await base('votes').select().all();
        res.status(200).json(data)
        return;
    }
    res.status(404).json({error: "Not found"})
}