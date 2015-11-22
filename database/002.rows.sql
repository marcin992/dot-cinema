	--- groups sample row
	
	INSERT INTO groups(
            id, name)
    VALUES (1, 'client');

	INSERT INTO groups(
            id, name)
    VALUES (2, 'standard');

	INSERT INTO groups(
            id, name)
    VALUES (3, 'cinema setter');

	INSERT INTO groups(
            id, name)
    VALUES (4, 'manager');

	INSERT INTO groups(
            id, name)
    VALUES (5, 'ultimate commander');
	
	--- halls sample row

	INSERT INTO halls(
            id, name, chairs)
    VALUES (1, 'A', '{ "A": "2", "B": "3" }');

	INSERT INTO halls(
		id, name, chairs)
    VALUES (2, 'B', '{ "A": "3", "B": "3" }');
	
	INSERT INTO halls(
		id, name, chairs)
    VALUES (3, 'C', '{ "A": "4", "B": "3" }');
	
	INSERT INTO halls(
            id, name, chairs)
    VALUES (4, 'D', '{ "A": "2", "B": "3" }');

	INSERT INTO halls(
		id, name, chairs)
    VALUES (5, 'F', '{ "A": "3", "B": "3" }');
	
	INSERT INTO halls(
		id, name, chairs)
    VALUES (6, 'G', '{ "A": "4", "B": "3" }');
	
	INSERT INTO halls(
            id, name, chairs)
    VALUES (7, 'H', '{ "A": "2", "B": "5", "C": "7", "D": "8", "E": "5", "F": "4", "G": "5", "H": "9" }');

	INSERT INTO halls(
		id, name, chairs)
    VALUES (8, 'I', '{ "A": "3", "B": "3" }');
	
	INSERT INTO halls(
		id, name, chairs)
    VALUES (9, 'J', '{ "A": "4", "B": "3" }');
	
	--- users samples row
	
	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'admin', 'qwe123', 'Admin', 'Rutkowski', 'admin@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 5, '', '', '');

	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'user4', 'qwe123', 'Admin', 'Rutkowski', 'admin2@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 4, '', '', '');
			
	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'user3', 'qwe123', 'Admin', 'Rutkowski', 'admin3@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 3, '', '', '');
			
	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'user2', 'qwe123', 'Admin', 'Rutkowski', 'admin2@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 2, '', '', '');
			
	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'user1', 'qwe123', 'Admin', 'Rutkowski', 'admin1@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 1, '', '', '');

	INSERT INTO users(
            id, nickname, password, name, surname, email, pesel, description, 
            date_joint, date_out, active, groupid, phone, avatar, description_sec)
    VALUES (1, 'client', 'qwe123', 'Admin', 'Rutkowski', 'client@dotcinema.github.com', '', '', 
            '2015-01-01', '2015-01-02', true, 1, '', '', '');

	--- ratings samples row
	
	INSERT INTO ratings(
            id, rating, comment, movies, userid)
    VALUES (1, 5, 'Ale fajne', 1, 6);
	
	INSERT INTO ratings(
            id, rating, comment, movies, userid)
    VALUES (2, 5, 'Ale fajne', 2, 6);
		
	INSERT INTO ratings(
            id, rating, comment, movies, userid)
    VALUES (3, 5, 'Ale fajne', 3, 6);
	
	INSERT INTO ratings(
            id, rating, comment, movies, userid)
    VALUES (4, 5, 'Ale fajne', 3, 2);	
	
	--- seanses samples row
	
	INSERT INTO seanses(
            id, movie, hall, date_start, date_end, cost, cost_for_student, 
            description)
    VALUES (1, 1, 1, '2015-01-01 11:12:33', '2015-01-01 11:13:33', 42.4, 53.5, 
            'PWR sponsoruje');
	
	INSERT INTO seanses(
            id, movie, hall, date_start, date_end, cost, cost_for_student, 
            description)
    VALUES (2, 2, 1, '2015-01-01 11:12:33', '2015-01-01 11:13:33', 42.4, 53.5, 
            'PWR sponsoruje');	
			
	INSERT INTO seanses(
            id, movie, hall, date_start, date_end, cost, cost_for_student, 
            description)
    VALUES (3, 3, 1, '2015-01-01 11:12:33', '2015-01-01 11:13:33', 42.4, 53.5, 
            'PWR sponsoruje');
					
	INSERT INTO seanses(
            id, movie, hall, date_start, date_end, cost, cost_for_student, 
            description)
    VALUES (4, 4, 1, '2015-01-01 11:12:33', '2015-01-01 11:13:33', 42.4, 53.5, 
            'PWR sponsoruje');
					
	INSERT INTO seanses(
            id, movie, hall, date_start, date_end, cost, cost_for_student, 
            description)
    VALUES (5, 5, 1, '2015-01-01 11:12:33', '2015-01-01 11:13:33', 42.4, 53.5, 
            'PWR sponsoruje');
			
	--- reservations samples row
	
	INSERT INTO reservations(
            id, userid, seanse, chair, dater)
    VALUES (1, 1, 1, "A:1", '2015-01-01 11:13:33');
	
	INSERT INTO reservations(
            id, userid, seanse, chair, dater)
    VALUES (2, 1, 1, "A:2", '2015-01-01 11:13:33');
		
	INSERT INTO reservations(
            id, userid, seanse, chair, dater)
    VALUES (3, 1, 1, "A:3", '2015-01-01 11:13:33');
		
	INSERT INTO reservations(
            id, userid, seanse, chair, dater)
    VALUES (4, 1, 1, "A:4", '2015-01-01 11:13:33');
		
	INSERT INTO reservations(
            id, userid, seanse, chair, dater)
    VALUES (5, 1, 1, "A:5", '2015-01-01 11:13:33');
	
	--- watchers sample row
	
	INSERT INTO watchers(
            id, watcher, userid)
    VALUES (1, 5, 6);
	
	--- timesheets samples row
	
	INSERT INTO timesheets(
            id, userid, data_create, date_end, session)
    VALUES (1, 1, '2015-01-01 11:13:33', '2015-02-01 11:13:33', '');

	INSERT INTO timesheets(
            id, userid, data_create, date_end, session)
    VALUES (2, 1, '2015-02-01 11:13:33', '2015-02-01 11:13:33', '');
	
	INSERT INTO timesheets(
            id, userid, data_create, date_end, session)
    VALUES (3, 1, '2015-03-01 11:13:33', '2015-03-01 11:13:33', '');
	
	--- scheludes_work samples row
	
	INSERT INTO scheludes_work(
            id, userid, data_create, date_end)
    VALUES (1, 1, '2015-03-01 11:13:33', '2015-03-01 11:13:33');
	
	INSERT INTO scheludes_work(
            id, userid, data_create, date_end)
    VALUES (2, 1, '2015-02-01 11:13:33', '2015-02-02 11:13:33');
		
	INSERT INTO scheludes_work(
            id, userid, data_create, date_end)
    VALUES (3, 1, '2015-03-03 11:13:33', '2015-03-03 11:13:33');