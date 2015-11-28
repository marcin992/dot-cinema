CREATE TABLE public.employee_data
(
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(150) NOT NULL,
    surname varchar(255) NOT NULL,
    pesel varchar(11),
    phone varchar(20),
    date_joined date NOT NULL,
    date_out date
);

alter table public."Users"
add column employee_data_id int null;

ALTER TABLE public."Users"
ADD CONSTRAINT users_employee_data_fk
FOREIGN KEY (employee_data_id) REFERENCES employee_data (id) ON DELETE CASCADE ON UPDATE CASCADE;
