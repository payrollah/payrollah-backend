#!/bin/bash

sudo psql -U postgres -c "DROP DATABASE IF EXISTS savy"
sudo psql -U postgres -c "DROP ROLE IF EXISTS savy"
sudo psql -U postgres -c "CREATE ROLE savy ENCRYPTED PASSWORD 'savy' LOGIN"
sudo psql -U postgres -c "CREATE DATABASE savy OWNER savy"
# PGPASSWORD=savy psql -U savy savy -f ../data/schema.sql