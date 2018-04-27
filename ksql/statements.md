### Always load topics from the beginning

Only for development purposes!

```sql
set 'auto.offset.reset'='earliest';
```

### Create a stream from our main topic

```sql
create stream iot_data (uuid varchar, category varchar, payload varchar) with (kafka_topic='iotDataTest', value_format='JSON');
```

### Create a table of aggregate data

```sql
create table averages as select sensorId, sum(cast(value as DOUBLE))/count(cast(value as INTEGER)) as averageValue from iot_data group by sensorId;
```
