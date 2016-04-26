Create database HDM;
Use HDM;
CREATE TABLE user 
  ( 
     id       INT NOT NULL auto_increment, 
     username VARCHAR(20) NOT NULL, 
     email    VARCHAR(35) NOT NULL, 
     password VARCHAR(256) NOT NULL, 
     PRIMARY KEY(id), 
     KEY indexemail (email), 
     UNIQUE KEY (email) 
  );

CREATE TABLE field 
  ( 
     field_id  INT NOT NULL auto_increment, 
     opt_field VARCHAR(55) NOT NULL, 
     PRIMARY KEY(field_id) 
  );

CREATE TABLE account 
  ( 
     opt_id  INT NOT NULL auto_increment, 
     u_id    INT NOT NULL, 
     f_id    INT NOT NULL, 
     f_value VARCHAR(255) NOT NULL, 
     PRIMARY KEY(opt_id), 
     FOREIGN KEY(u_id) REFERENCES user(id), 
     FOREIGN KEY(f_id) REFERENCES field(field_id), 
     UNIQUE KEY (u_id, f_id) 
  );

CREATE TABLE receipt 
  ( 
     id     INT NOT NULL auto_increment, 
     time   DATETIME NOT NULL, 
     market VARCHAR(50) NOT NULL, 
     sum    INT NOT NULL, 
     date   DATE NOT NULL, 
     img    VARCHAR(255), 
     u_id   INT NOT NULL, 
     PRIMARY KEY(id), 
     FOREIGN KEY(u_id) REFERENCES user(id), 
     KEY indextime (time, market), 
     UNIQUE KEY (img) 
  ); 

INSERT INTO field 
            (field_id, 
             opt_field) 
VALUES      (1, 
             'surname'), 
            (2, 
             'birthday'), 
            (3, 
             'image'); 

CREATE VIEW account_extend AS 
            ( 
                     SELECT   USER.id                             AS id, 
                              USER.username                       AS NAME, 
                              USER.email                          AS email, 
                              USER.password                       AS pass, 
                              max(IF(`f_id` = 1, f_value, "..."))    surname, 
                              max(IF(`f_id` = 2, f_value, "..."))    birthday, 
                              max(IF(`f_id` = 3, f_value, "..."))    image 
                     FROM     (account 
                     JOIN     USER) 
                     WHERE    ( 
                                       account.u_id=USER.id) 
                     GROUP BY id 
            );
