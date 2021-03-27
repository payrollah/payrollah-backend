#!/bin/bash

sudo psql -U postgres -c "DROP DATABASE IF EXISTS payrollah"
sudo psql -U postgres -c "DROP ROLE IF EXISTS payrollah"
sudo psql -U postgres -c "CREATE ROLE payrollah ENCRYPTED PASSWORD 'payrollah' LOGIN"
sudo psql -U postgres -c "CREATE DATABASE payrollah OWNER payrollah"
# PGPASSWORD=payrollah psql -U payrollah payrollah -f ../data/schema.sql