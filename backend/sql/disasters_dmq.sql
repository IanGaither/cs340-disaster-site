--Data Manipulation Queries--

--Input values are indicated by a colon ex. :input_value

--DisasterEvents ##########
--SELECT
SELECT disaster_event_name AS Name FROM disaster_events;
--INSERT
INSERT INTO disaster_events (disaster_event_name)
VALUES (:name_input);
--UPDATE
UPDATE disaster_events SET disaster_event_name = :name_input
WHERE disaster_event_id = :disaster_event_id_from_row_input;
--DELETE
DELETE FROM disaster_events WHERE disaster_event_id = :disaster_event_id_from_row_input;


--Communities ##########
--SELECT
SELECT community_name AS Name, state AS State, population AS Population FROM communities;
--INSERT
INSERT INTO communities (community_name, state, population)
VALUES (:name_input, :state_enum_dropdown_input, :population_input);
--UPDATE
UPDATE communities SET community_name = :name_input, state = :state_enum_dropdown_input, population = :population_input
WHERE community_id = :community_id_from_row_input;
--DELETE
DELETE FROM communities WHERE community_id = :community_id_from_row_input;


--Impacts ##########
--SELECT
SELECT community_name AS Community,
disaster_event_name AS 'Disaster Event',
fatality_count AS Fatalities, 
injury_count AS Injuries, 
property_damage AS 'Property Damage', 
relief_cost AS 'Relief Cost'
FROM impacts
INNER JOIN communities ON impacts.community_id = communities.community_id
INNER JOIN disaster_events ON impacts.disaster_event_id = disaster_events.disaster_event_id;
--INSERT
INSERT INTO impacts (community_id, disaster_event_id, fatality_count, injury_count, property_damage, relief_cost)
VALUES (:fk_community_id_from_dropdown_input, 
:fk_disaster_event_id_from_dropdown_input, 
:fatality_count_input, 
:injury_count_input, 
:property_damage_input, 
:relief_cost_input);
--UPDATE
UPDATE impacts SET community_id = :fk_community_id_from_dropdown_input, 
disaster_event_id = :fk_disaster_event_id_from_dropdown_input,
fatality_count = :fatality_count_input,
injury_count = :injury_count_input,
property_damage = :property_damage_input,
relief_cost = :relief_cost_input
WHERE community_id = :community_id_from_row_input AND disaster_event_id = :disaster_event_id_from_row_input;
--DELETE
DELETE FROM impacts WHERE community_id = :community_id_from_row_input AND disaster_event_id = :disaster_event_id_from_row_input;


--Earthquakes ##########
--SELECT
SELECT disaster_event_name AS 'Disaster Event',
date AS Date, 
richter_magnitude AS Magnitude, 
epicenter_latitude AS 'Epicenter Latitude',
epicenter_longitude AS 'Epicenter Longitude',
fault_type AS 'Fault Type'
FROM earthquakes
LEFT JOIN disaster_events ON earthquakes.disaster_event_id = disaster_events.disaster_event_id;
--INSERT
INSERT INTO earthquakes (disaster_event_id, date, richter_magnitude, epicenter_latitude, epicenter_longitude, fault_type)
VALUES (:fk_disaster_event_id_from_dropdown_input, 
:date_input, 
:richter_magnitude_input, 
:epicenter_latitude_input, 
:epicenter_longitude_input,
:fault_type_input);
--UPDATE
UPDATE earthquakes SET disaster_event_id = :fk_disaster_event_id_from_dropdown_input, 
date = :date_input, 
richter_magnitude = :richter_magnitude_input, 
epicenter_latitude = :epicenter_latitude_input, 
epicenter_longitude = :epicenter_longitude_input,
fault_type = :fault_type_input
WHERE earthquake_id = :earthquake_id_from_row_input;
--DELETE
DELETE FROM earthquakes WHERE earthquake_id = :earthquake_id_from_row_input;


--Hurricanes ##########
--SELECT
SELECT disaster_event_name AS 'Disaster Event',
start_date AS 'Start Date',
end_date AS 'End Date',
saffir_simpson_category AS Category,
max_wind_speed AS 'Max Wind Speed' 
FROM hurricanes
LEFT JOIN disaster_events ON hurricanes.disaster_event_id = disaster_events.disaster_event_id;
--INSERT
INSERT INTO hurricanes (disaster_event_id, start_date, end_date, saffir_simpson_category, max_wind_speed)
VALUES (:fk_disaster_event_id_from_dropdown_input, 
:start_date_input, 
:end_date_input, 
:saffir_simpson_category_input, 
:max_wind_speed_input);
--UPDATE
UPDATE hurricanes SET disaster_event_id = :fk_disaster_event_id_from_dropdown_input, 
start_date = :start_date_input, 
end_date = :end_date_input, 
saffir_simpson_category = :saffir_simpson_category_input, 
max_wind_speed = :max_wind_speed_input
WHERE hurricane_id = :hurricane_id_from_row_input;
--DELETE
DELETE FROM hurricanes WHERE hurricane_id = :hurricane_id_from_row_input;


