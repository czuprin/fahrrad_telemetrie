// Import the InfluxDB client library
const Influx = require('influx');

// Create a new InfluxDB client instance with the connection details
const influx = new Influx.InfluxDB({
  host: 'influxdb.czuprin.com',
  database: 'Czuprin Rennsport und Technik',
  username: 'clemensczuprin',
  password: 'Ng7zrJLJTAMKg64fnzyLU6fRAjmWfy'
});

// Define the InfluxDB query to execute
const query = `from(bucket: "RennRad_Neu_2")
|> range(start: 2023-01-01T00:00:00Z)
|> filter(fn: (r) => r["_measurement"] == "GPS")
|> filter(fn: (r) => r["_field"] == "lat" or r["_field"] == "lon")
|> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
|> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
|> group()  
|> drop(columns: ["_start", "_stop", "_time","_measurement"])`;

// Execute the InfluxDB query and handle the results
influx.query(query)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });