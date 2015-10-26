
CREATE TABLE groups
(
  id integer primary key,
  name character varying(150)
);
CREATE TABLE permissions
(
  id integer  primary key,
  name character varying(150)
);

CREATE TABLE group_permission
(
  id integer primary key,
  permission integer references permissions(id),
  groupid integer references groups(id)
);

CREATE TABLE users
(
  id integer primary key,
  nickname character varying(150),
  password character varying(150),
  name character varying(150),
  surname character varying(150),
  email character varying(150),
  pesel character varying(11),
  description text,
  date_joint date,
  date_out date,
  active boolean,
  groupid integer references group_permission(id),
  phone character varying(11),
  avatar bytea,
  description_sec text
);

CREATE TABLE watchers
(
  id integer primary key,
  watcher integer references users(id),
  userid integer references users(id)
);

CREATE TABLE sessions
(
  id integer primary key,
  sessionid character varying(150),
  userid integer references users(id),
  browser character varying(300),
  date_create date,
  ip character varying(100)
);

CREATE TABLE timesheets
(
  id integer primary key,
  userid integer references users(id),
  data_create date,
  date_end date,
  session integer references sessions(id)
);

CREATE TABLE scheludes_work
(
  id integer primary key,
  userid integer references users(id),
  data_create date,
  date_end date
);


CREATE TABLE halls
(
  id integer primary key,
  name character varying(150),
  chairs character varying(5)[]
);

CREATE TABLE movies
(
  id integer primary key,
  title character varying(150),
  data date,
  "time" integer,
  cover bytea
);

CREATE TABLE ratings
(
  id integer primary key,
  rating character varying(1),
  comment text,
  movies integer references movies(id),
  userid integer references users(id)
);

CREATE TABLE seanses
(
  id integer primary key,
  movie integer references movies(id),
  hall integer  references halls(id),
  date_start date,
  date_end date,
  cost numeric(10,2),
  cost_for_student numeric(10,2),
  description text
);

CREATE TABLE reservations
(
  id integer primary key,
  userid integer references users(id),
  seanse integer references seanses(id),
  chair character varying(5),
  dater date
)


