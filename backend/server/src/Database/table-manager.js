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
    app.get(root + 'reset', ResetTables);
}

function ResetTables(req, res)
{
    db.query('\
    DROP TABLE IF EXISTS impacts;\
    DROP TABLE IF EXISTS earthquakes;\
    DROP TABLE IF EXISTS hurricanes;\
    DROP TABLE IF EXISTS communities;\
    DROP TABLE IF EXISTS disaster_events;\
    CREATE TABLE communities (\
        community_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        community_name VARCHAR(128) NOT NULL,\
        state ENUM (\'AK\', \'AL\', \'AR\', \'AZ\', \'CA\', \'CO\', \'CT\', \'DE\', \'DC\', \'FL\', \'GA\', \'HI\', \'IA\', \'ID\', \'IL\', \'IN\', \'KS\',\
            \'KY\', \'LA\', \'MA\', \'MD\', \'ME\', \'MI\', \'MN\', \'MO\', \'MS\', \'MT\', \'NC\', \'ND\', \'NE\', \'NH\', \'NJ\', \'NM\', \'NV\', \'NY\',\
            \'OH\', \'OK\', \'OR\', \'PA\', \'RI\', \'SC\', \'SD\', \'TN\', \'TX\', \'UT\', \'VA\', \'VT\', \'WA\', \'WI\', \'WV\', \'WY\') NOT NULL,\
        population INT NOT NULL\
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;\
    INSERT INTO communities (community_name, state, population)\
    VALUES (\'Anchorage\', \'AK\', 293531),\
        (\'Houston\', \'TX\', 2304580),\
        (\'New Orleans\', \'LA\', 383997),\
        (\'Los Angeles\', \'CA\', 3898747);\
    CREATE TABLE disaster_events (\
        disaster_event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        disaster_event_name VARCHAR(128) NOT NULL\
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;\
    INSERT INTO disaster_events (disaster_event_name)\
    VALUES (\'Hurricane Harvey\'),\
        (\'Great Alaska Earthquake\'),\
        (\'Hurricane Katrina\'),\
        (\'Northridge Earthquake\');\
    CREATE TABLE impacts (\
        community_id INT NOT NULL,\
        disaster_event_id INT NOT NULL,\
        fatality_count INT NOT NULL,\
        injury_count INT NOT NULL,\
        property_damage BIGINT NOT NULL,\
        relief_cost BIGINT NOT NULL,\
        FOREIGN KEY impacts2communities (community_id)\
        REFERENCES communities (community_id)\
            ON UPDATE CASCADE\
            ON DELETE CASCADE,\
        FOREIGN KEY impacts2disaster_events (disaster_event_id)\
        REFERENCES disaster_events (disaster_event_id)\
            ON UPDATE CASCADE\
            ON DELETE CASCADE,\
        UNIQUE KEY CommunityEvent(community_id, disaster_event_id)\
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;\
    INSERT INTO impacts (community_id, disaster_event_id, fatality_count, injury_count, property_damage, relief_cost)\
    VALUES ((SELECT community_id FROM communities WHERE community_name = \'Houston\' AND state = \'TX\'),\
            (SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = "Hurricane Harvey"),\
            68, 300, 131000000000, 30000000),\
        ((SELECT community_id FROM communities WHERE community_name = \'Anchorage\' AND state = \'AK\'),\
            (SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = "Great Alaska Earthquake"),\
            131, 600, 311000000, 150000000),\
        ((SELECT community_id FROM communities WHERE community_name = \'Los Angeles\' AND state = \'CA\'),\
            (SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = "Northridge Earthquake"),\
            57, 8700, 42000000000, 13000000000),\
        ((SELECT community_id FROM communities WHERE community_name = \'New Orleans\' AND state = \'LA\'),\
            (SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = "Hurricane Katrina"),\
            1836, 56000, 129000000000, 44000000000);\
    CREATE TABLE earthquakes (\
        earthquake_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        disaster_event_id INT NULL,\
        date DATE NOT NULL,\
        richter_magnitude DECIMAL(3,1) NOT NULL,\
        epicenter_latitude DECIMAL(8,6) NOT NULL,\
        epicenter_longitude DECIMAL(9,6) NOT NULL,\
        fault_type ENUM(\'Normal\', \'Thrust\', \'Strike-Slip\', \'Oblique\') NOT NULL,\
        FOREIGN KEY earthquakes2disaster_events (disaster_event_id)\
        REFERENCES disaster_events (disaster_event_id)\
            ON UPDATE CASCADE\
            ON DELETE SET NULL\
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;\
    INSERT INTO earthquakes (disaster_event_id, date, richter_magnitude, epicenter_latitude, epicenter_longitude,\
                            fault_type)\
    VALUES ((SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = \'Great Alaska Earthquake\'),\
            \'1964-03-27\', 9.2, 60.908, -147.339, \'Normal\'),\
        ((SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = \'Northridge Earthquake\'),\
            "1994-01-17", 6.7, 34.213,-118.537, \'Thrust\'),\
        (NULL, "2021-11-09", 2.8, 40.366, -124.237, \'Normal\'),\
        (NULL, "2021-10-25", 4.7, 35.776, -121.304, \'Strike-Slip\');\
    CREATE TABLE hurricanes (\
        hurricane_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        disaster_event_id INT NULL,\
        start_date DATE NOT NULL,\
        end_date DATE NOT NULL,\
        saffir_simpson_category TINYINT NOT NULL,\
        max_wind_speed INT NOT NULL,\
        FOREIGN KEY hurricanes2disaster_events (disaster_event_id)\
        REFERENCES disaster_events (disaster_event_id)\
            ON UPDATE CASCADE\
            ON DELETE SET NULL\
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;\
    INSERT INTO hurricanes (disaster_event_id, start_date, end_date, saffir_simpson_category, max_wind_speed)\
    VALUES ((SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = \'Hurricane Harvey\'),\
            \'2017-08-17\', \'2017-09-02\', 4, 134),\
        ((SELECT disaster_event_id FROM disaster_events WHERE disaster_event_name = \'Hurricane Katrina\'),\
            \'2005-08-23\', \'2005-08-31\', 5, 175),\
        (NULL, \'2016-08-28\', \'2016-09-08\', 1, 70),\
        (NULL, \'2000-09-14\', \'2000-09-21\', 1, 70);\
    ')
    .then(function(data)
    {
        res.send('done');
    });
}