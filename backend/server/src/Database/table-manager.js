const communities = require('./Tables/Communities');
const disasterEvents = require('./Tables/DisasterEvents');
const earthquakes = require('./Tables/Earthquakes');
const hurricanes = require('./Tables/Hurricanes');
const impacts = require('./Tables/Impacts');

const db = require('./database').getDB();

module.exports.InitTableEndpoints = function(app, root)
{
    //setup table links
    communities.register(app, root);
    disasterEvents.register(app, root);
    earthquakes.register(app, root);
    hurricanes.register(app, root);
    impacts.register(app, root);
    //reset table request
    app.post(root + 'reset', ResetTables);
}

function ResetTables(req, res)
{
    db.query('');
}