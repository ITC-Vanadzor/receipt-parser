Create database HDM;
Use HDM;
Create table user (
	id int not null auto_increment, 
	username varchar(20) not null, 
	email varchar(35) not null,
	password varchar(256) not null, 
	primary key(id));

Create table field (
	field_id int not null auto_increment,
	opt_field varchar(55) not null,
	primary key(field_id));

Create table account (
	opt_id int not null auto_increment,
	opt_value varchar(255) not null, 
	u_id int not null, 
	f_id int not null, 
	primary key(opt_id), 
	foreign key(u_id) references user(id), 
	foreign key(f_id) references field(field_id));

Create table receipt (
	time datetime not null, 
	market varchar(50) not null, 
	sum int not null, 
	date date not null, 
	comment text not null, 
	u_id int not null, 
	primary key(time), 
	foreign key(u_id) references user(id));