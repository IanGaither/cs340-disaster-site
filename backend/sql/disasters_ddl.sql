DROP TABLE IF EXISTS impacts;
DROP TABLE IF EXISTS earthquakes;
DROP TABLE IF EXISTS hurricanes;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS disaster_events;

CREATE TABLE communities (
    community_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    state ENUM ('AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS',
        'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
        'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY') NOT NULL,
    population INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE disaster_events (
    disaster_event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE impacts (
    community_id INT NOT NULL,
    disaster_event_id INT NOT NULL,
    fatality_count INT NOT NULL,
    injury_count INT NOT NULL,
    property_damage BIGINT NOT NULL,
    relief_cost BIGINT NOT NULL,
    FOREIGN KEY impacts2communities (community_id)
    REFERENCES communities (community_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY impacts2disaster_events (disaster_event_id)
    REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE earthquakes (
    earthquake_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disaster_event_id INT,
    date DATE NOT NULL,
    richter_magnitude DECIMAL(3,1) NOT NULL,
    epicenter POINT NOT NULL,
    fault_type ENUM('Normal', 'Thrust', 'Strike-Slip', 'Oblique') NOT NULL,
    FOREIGN KEY earthquakes2disaster_events (disaster_event_id)
    REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE hurricanes (
    hurricane_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disaster_event_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    saffir_simpson_category TINYINT NOT NULL,
    max_wind_speed INT NOT NULL,
    FOREIGN KEY hurricanes2disaster_events (disaster_event_id)
    REFERENCES disaster_events (disaster_event_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;