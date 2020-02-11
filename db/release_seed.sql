DROP TABLE IF EXISTS releases;

CREATE TABLE releases (
    id SERIAL PRIMARY KEY,
    image TEXT,
    make VARCHAR(20),
    model VARCHAR(20),
    release_date VARCHAR(40),
    base_msrp NUMERIC,
    drive_type VARCHAR(10),
    top_engine VARCHAR(60),
    bottom_engine VARCHAR(60),
    power NUMERIC,
    torque NUMERIC,
    power_rpm NUMERIC,
    torque_rpm NUMERIC,
    zero_to_sixty NUMERIC,
    top_speed NUMERIC,
    mpg_highway NUMERIC,
    mpg_city NUMERIC,
    range NUMERIC,
    weight VARCHAR(20),
    cargo_volume VARCHAR(20),
    charge_time VARCHAR(20),
    body_type VARCHAR(20),
    door_count VARCHAR(20),
    seating NUMERIC,
    sources TEXT
);

INSERT INTO releases (image, make, model, release_date, base_msrp, drive_type, bottom_engine, power, torque, power_rpm, torque_rpm, body_type, door_count, seating, sources)
VALUES
('https://www.motortrend.com/uploads/sites/5/2018/05/2020-Ford-Bronco-illustration-Avarvarii-1.jpg?fit=around%7C875:492', 'Ford', 'Bronco', '2020', 30000, 'AWD/4WD', '2.3L Turbocharged 4-Cylinder', 310, 350, 5500, 3000, 'Truck/SUV', '2-4', 5, 'https://www.jimtidwellford.com/2020-ford-bronco-kennesaw-ga.html')
;

INSERT INTO releases (image, make, model, release_date, base_msrp, drive_type, bottom_engine, power, torque, zero_to_sixty, top_speed, range,
weight, cargo_volume, charge_time, body_type, door_count, seating, sources ) VALUES
('https://cdn.motor1.com/images/mgl/kJWEN/s1/2020-porsche-taycan.jpg', 'Porsche', 'Taycan', '2020', 185000, 
'AWD', 'Two Permanent Magnet Synchronous Electric Motors', 750, 774, 2.6, 162, 241, 5100, '12.9 Cubic Feet', '11 Hours', 'Sedan', '4', '4', 'https://www.motor1.com/reviews/372662/2020-porsche-taycan-first-drive/')
;

INSERT INTO releases (image, make, model, release_date, base_msrp, drive_type, bottom_engine, top_engine, power, zero_to_sixty, top_speed, body_type, door_count, seating, sources) VALUES
('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/alfa-romeo-gtv-illo-christianschulte-1530629520.jpg', 'Alfa Romeo', 'GTV', 2020, 40000, 'AWD', '2.0L 4-Cylinder', 'Twin-Turbocharged V6 W/ E-Boost (Mild Hybrid)', 600, 3.5, 190, 'Coupe', '2', '4', 'https://www.topspeed.com/cars/alfa-romeo/2020-alfa-romeo-gtv-ar181434.html')



