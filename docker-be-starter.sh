#!/bin/bash

docker pull walterallane/leasing-api:latest
docker run -p 8080:8080 --name leasing-api -d walterallane/leasing-api:latest
