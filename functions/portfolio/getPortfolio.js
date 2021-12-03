const { portfolio } = require('../_airtable/airtable');
const formattedReturn = require('../_airtable/formattedReturn');
module.exports = async (event) => {
    try {
        const items = await portfolio.select().firstPage();
        const formattedItems = items.map((item) => ({
            id: item.id,
            ...item.fields,
        }));
        return formattedReturn(200, formattedItems);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};