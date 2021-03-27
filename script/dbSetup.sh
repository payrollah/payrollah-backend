#!/bin/bash

sudo -u postgres psql -c "DROP DATABASE IF EXISTS payrollah"
sudo -u postgres psql -c "DROP ROLE IF EXISTS payrollah"
sudo -u postgres psql -c "CREATE ROLE payrollah ENCRYPTED PASSWORD 'payrollah' LOGIN"
sudo -u postgres psql -c "CREATE DATABASE payrollah OWNER payrollah"
# PGPASSWORD=payrollah psql -U payrollah payrollah -f ../data/schema.sql