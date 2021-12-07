--Data Manipulation Queries--

--Input values are indicated by a colon ex. :input_value


--disaster_events ##########
--Create
INSERT INTO disaster_events (disaster_event_name)
VALUES (:name_input);
--Read
SELECT SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events;
--Update
UPDATE disaster_events SET disaster_event_name = :name_input
WHERE disaster_event_id = :disaster_event_id_from_row_input;
--Delete
DELETE FROM disaster_events WHERE disaster_event_id = :disaster_event_id_from_row_input;
--Search
SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events
WHERE :search_field LIKE '%' + :search_query + '%';


--communities ##########
--Create
INSERT INTO communities (community_name, state, population)
VALUES (:name_input, :state_enum_dropdown_input, :population_input);
--Read
SELECT community_id as id, community_name AS Name, state+0 AS State, population AS Population FROM communities;
--Update
UPDATE communities SET community_name = :name_input, state = :state_enum_dropdown_input, population = :population_input
WHERE community_id = :community_id_from_row_input;
--Delete
DELETE FROM communities WHERE community_id = :community_id_from_row_input;
--Search
SELECT community_id as id, community_name AS Name, state+0 AS State, population AS Population FROM
WHERE :search_field LIKE '%' + :search_query + '%';


--impacts ##########
--Create
INSERT INTO impacts (community_id, disaster_event_id, fatality_count, injury_count, property_damage, relief_cost)
VALUES (:fk_community_id_from_dropdown_input, 
:fk_disaster_event_id_from_dropdown_input, 
:fatality_count_input, 
:injury_count_input, 
:property_damage_input, 
:relief_cost_input);
--Read # Uses fk ids to convert to names on frontend
SELECT community_id AS Community, 
disaster_event_id AS 'Disaster Event',
fatality_count AS Fatalities, 
injury_count AS Injuries, 
property_damage AS 'Property Damage', 
relief_cost AS 'Relief Cost' 
FROM impacts;
--Update
UPDATE impacts SET community_id = :fk_community_id_from_dropdown_input, 
disaster_event_id = :fk_disaster_event_id_from_dropdown_input,
fatality_count = :fatality_count_input,
injury_count = :injury_count_input,
property_damage = :property_damage_input,
relief_cost = :relief_cost_input
WHERE community_id = :community_id_from_row_input AND disaster_event_id = :disaster_event_id_from_row_input;
--Delete
DELETE FROM impacts WHERE community_id = :community_id_from_row_input AND disaster_event_id = :disaster_event_id_from_row_input;
--Search # Uses fk ids to convert to names on frontend
SELECT community_id AS Community, 
disaster_event_id AS 'Disaster Event', 
fatality_count AS Fatalities, 
injury_count AS Injuries, 
property_damage AS 'Property Damage', 
relief_cost AS 'Relief Cost'
FROM (communities INNER JOIN impacts USING(community_id) INNER JOIN disaster_events USING(disaster_event_id))
WHERE :search_field LIKE '%' + :search_query + '%';


--earthquakes ##########
--Create
INSERT INTO earthquakes (disaster_event_id, date, richter_magnitude, epicenter_latitude, epicenter_longitude, fault_type)
VALUES (:fk_disaster_event_id_from_dropdown_input, 
:date_input, 
:richter_magnitude_input, 
:epicenter_latitude_input, 
:epicenter_longitude_input,
:fault_type_input);
--Read # Uses fk ids to convert to names on frontend
SELECT earthquake_id as id, 
IFNULL(disaster_event_id, 0) AS 'Disaster Event', 
date AS Date, 
richter_magnitude AS Magnitude, 
epicenter_latitude AS 'Epicenter Latitude',
epicenter_longitude AS 'Epicenter Longitude',
fault_type+0 AS 'Fault Type'
FROM earthquakes;
--Update
UPDATE earthquakes SET disaster_event_id = :fk_disaster_event_id_from_dropdown_input, 
date = :date_input, 
richter_magnitude = :richter_magnitude_input, 
epicenter_latitude = :epicenter_latitude_input, 
epicenter_longitude = :epicenter_longitude_input,
fault_type = :fault_type_input
WHERE earthquake_id = :earthquake_id_from_row_input;
--Delete
DELETE FROM earthquakes WHERE earthquake_id = :earthquake_id_from_row_input;
--Search # Uses fk ids to convert to names on frontend
SELECT earthquake_id as id,
IFNULL(disaster_event_id, 0) AS 'Disaster Event', 
date AS Date, 
richter_magnitude AS Magnitude, 
epicenter_latitude AS 'Epicenter Latitude',
epicenter_longitude AS 'Epicenter Longitude',
fault_type+0 AS 'Fault Type'
FROM (earthquakes LEFT JOIN disaster_events USING(disaster_event_id))
WHERE :search_field LIKE '%' + :search_query + '%';


--hurricanes ##########
--Create # Uses fk ids to convert to names on frontend
INSERT INTO hurricanes (disaster_event_id, start_date, end_date, saffir_simpson_category, max_wind_speed)
VALUES (:fk_disaster_event_id_from_dropdown_input, 
:start_date_input, 
:end_date_input, 
:saffir_simpson_category_input, 
:max_wind_speed_input);
--Read
SELECT hurricane_id as id, 
IFNULL(disaster_event_id, 0) AS 'Disaster Event', 
start_date AS 'Start Date',
end_date AS 'End Date',
saffir_simpson_category AS Category,
max_wind_speed AS 'Max Wind Speed' 
FROM hurricanes;
--Update
UPDATE hurricanes SET disaster_event_id = :fk_disaster_event_id_from_dropdown_input, 
start_date = :start_date_input, 
end_date = :end_date_input, 
saffir_simpson_category = :saffir_simpson_category_input, 
max_wind_speed = :max_wind_speed_input
WHERE hurricane_id = :hurricane_id_from_row_input;
--Delete
DELETE FROM hurricanes WHERE hurricane_id = :hurricane_id_from_row_input;
--Search # Uses fk ids to convert to names on frontend
SELECT hurricane_id as id, 
IFNULL(disaster_event_id, 0) AS 'Disaster Event', 
start_date AS 'Start Date',
end_date AS 'End Date',
saffir_simpson_category AS Category,
max_wind_speed AS 'Max Wind Speed' 
FROM (hurricanes LEFT JOIN disaster_events USING(disaster_event_id))
WHERE :search_field LIKE '%' + :search_query + '%';
