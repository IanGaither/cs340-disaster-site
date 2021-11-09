INSERT INTO communities (name, state, population)
VALUES ('Anchorage', 'AK', 293531),
       ('Houston', 'TX', 2304580),
       ('New Orleans', 'LA', 383997),
       ('Los Angeles', 'CA', 3898747);

INSERT INTO disaster_events (name)
VALUES ('Hurricane Harvey'),
       ('Great Alaska Earthquake'),
       ('Hurricane Katrina'),
       ('Northridge Earthquake');

INSERT INTO impacts (community_id, disaster_event_id, fatality_count, injury_count, property_damage, relief_cost)
VALUES ((SELECT community_id FROM communities WHERE name = 'Houston' AND state = 'TX'),
        (SELECT disaster_event_id FROM disaster_events WHERE name = "Hurricane Harvey"),
        68, 300, 131000000000, 30000000),
       ((SELECT community_id FROM communities WHERE name = 'Anchorage' AND state = 'AK'),
       (SELECT disaster_event_id FROM disaster_events WHERE name = "Great Alaska Earthquake"),
        131, 600, 311000000, 150000000),
       ((SELECT community_id FROM communities WHERE name = 'Los Angeles' AND state = 'CA'),
        (SELECT disaster_event_id FROM disaster_events WHERE name = "Northridge Earthquake"),
        57, 8700, 42000000000, 13000000000),
       ((SELECT community_id FROM communities WHERE name = 'New Orleans' AND state = 'LA'),
        (SELECT disaster_event_id FROM disaster_events WHERE name = "Hurricane Katrina"),
        1836, 56000, 129000000000, 44000000000);

INSERT INTO earthquakes (disaster_event_id, date, richter_magnitude, epicenter, fault_type)
VALUES ((SELECT disaster_event_id FROM disaster_events WHERE name = "Great Alaska Earthquake"),
        "1964-03-27", 9.2, (60.908, -147.339), 'Normal'),
       ((SELECT disaster_event_id FROM disaster_events WHERE name = "Northridge Earthquake"),
        "1994-01-17", 6.7, (34.213, -118.537), 'Thrust');

INSERT INTO hurricanes (disaster_event_id, start_date, end_date, saffir_simpson_category, max_wind_speed)
VALUES ((SELECT disaster_event_id FROM disaster_events WHERE name = "Hurricane Harvey"),
        "2017-08-17", "2017-09-02", 4, 134),
       ((SELECT disaster_event_id FROM disaster_events WHERE name = "Hurricane Katrina"),
        "2005-08-23", "2005-08-31", 5, 175);
