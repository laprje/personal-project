DROP TABLE IF EXISTS cars

CREATE TABLE cars (
    car_id SERIAL PRIMARY KEY,
    make VARCHAR(20),
    model VARCHAR(50),
    year NUMERIC,
    img TEXT
)

INSERT INTO cars (make, model, year)
VALUES ('Toyota', 'Camry', 2005, 'https://crdms.images.consumerreports.org/c_lfill,w_720,q_auto,f_auto/prod/cars/chrome-historical/white/USB50TOC021E0101'),
('Subaru', 'WRX', 2018, 'https://www.cstatic-images.com/car-pictures/xl/usc80suc181b021001.png'),
('Peugeot', '207', 2008, 'https://images-na.ssl-images-amazon.com/images/I/41hTOzdcN0L._SX425_.jpg');
