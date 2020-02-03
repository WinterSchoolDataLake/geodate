#!/usr/bin/env bash

CQL="DROP keyspace geo;
CREATE KEYSPACE geo WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};
CREATE TABLE geo.record ( id varchar PRIMARY KEY, lon double , lan double);"

until echo $CQL | cqlsh; do
  echo "cqlsh: Cassandra is unavailable to initialize - will retry later"
  sleep 2
done &

exec /docker-entrypoint.sh "$@"