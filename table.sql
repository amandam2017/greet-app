create table greetUsers(
  id serial not null primary key,
  greeted_names text not null,
  counter_names int not null
);