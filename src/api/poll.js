const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
    if (req.method === 'POST') {

        return await base.table('votes').create(req.body)
    }
    if (req.method === "GET"){
        return await base('votes').select().all();
    }
}