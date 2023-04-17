import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
import json
import flask

import logging

ridden_track = []

logging.basicConfig(level=logging.DEBUG)

org = "Czuprin Rennsport und Technik"
bucket = "RennRad_Neu_2"
token = "n3FPM6EKqq0TiS81WG7P9FqEqb121GpC9IVa6E2nTJGj0eQHPxh9ugkd_ICjPU0DY-cHx4uXI8Aw50YFGhrVQg=="
# Store the URL of your InfluxDB instance
url = "http://czuprin.com:8086"

influx_client = influxdb_client.InfluxDBClient(
    url=url,
    token=token,
    org=org
)

# Write script
write_api = influx_client.write_api(write_options=SYNCHRONOUS)
query_api = influx_client.query_api()


p = """
from(bucket: "RennRad_Neu_2")
  |> range(start: -10d)
  |> filter(fn: (r) => r["_measurement"] == "GPS")
  |> filter(fn: (r) => r["_field"] == "lat" or r["_field"] == "lon")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> group() 
 
"""

tables = query_api.query(p)



for table in tables:
    print(table)
    for row in table.records:
        v = row.values
        print(f"lat: {v['lat']}// lon: {v['lon']}")
        arr = [v['lon'],v['lat']]
        ridden_track.append(arr)

print(ridden_track)

## using Table structure
csv_result = query_api.query_csv(p)
val_count = 0
for row in csv_result:
    for cell in row:
        val_count += 1
        
        
print(csv_result)


app = flask.Flask(__name__)


@app.route('/data')
def hello():
    
    val = {'data' : ridden_track}
    return val

@app.route('/')
def index():
    return flask.render_template('index.html')



if __name__ == '__main__':
    app.run()

if __name__ == '__main__':
    app.run(host="0.0.0.0")
       


