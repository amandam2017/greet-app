create table greetUsers(
  id serial not null primary key,
  greeted_names text not null,
   counter_names int
);

-- sudo -u postgres createdb my_greet_app;
-- sudo -u postgres createuser users -P;

-- //grant access
-- grant all privileges on database my_greet_app to users;

