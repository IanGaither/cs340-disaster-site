DROP TABLE IF EXISTS communities;

CREATE TABLE communities (
    community_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    state ENUM ('AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS',
        'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
        'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY') NOT NULL,
    population INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS disaster_events;

CREATE TABLE disaster_events (
    disaster_event_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS impacts;

CREATE TABLE impacts (
    community_id INT(11) NOT NULL,
    disaster_event_id INT(11) NOT NULL,
    fatality_count INT(11) NOT NULL,
    injury_count INT(11) NOT NULL,
    property_damage BIGINT(20) NOT NULL,
    relief_cost BIGINT(20) NOT NULL,
    FOREIGN KEY impacts2communities (community_id)
    REFERENCES communities (community_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY impacts2disaster_events (disaster_event_id)
    REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS earthquakes;

CREATE TABLE earthquakes (
    earthquake_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disaster_event_id INT(11),
    date DATE NOT NULL,
    richter_magnitude DECIMAL(3,1) NOT NULL,
    epicenter POINT NOT NULL,
    fault_type ENUM('Normal', 'Thrust', 'Strike-Slip', 'Oblique') NOT NULL,
    FOREIGN KEY earthquakes2disaster_events (disaster_event_id)
    REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS hurricanes;

CREATE TABLE hurricanes (
    hurricane_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disaster_event_id INT(11) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    saffir_simpson_category TINYINT(2) NOT NULL,
    max_wind_speed INT NOT NULL,
    FOREIGN KEY hurricanes2disaster_events (disaster_event_id)
        REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;