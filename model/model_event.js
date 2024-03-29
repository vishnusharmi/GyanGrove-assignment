const db = require("../databaseC");

function events(event) {
  const { event_name, city_name, date, time, latitude, longitude } = event;
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO events (event_name,city_name,date,time,latitude,longitude) VALUES(?,?,?,?,?,?)`;
    const data = db.query(
      query,
      [event_name, city_name, date, time, latitude, longitude],
      (err, result) => {
        // console.log(data, "data");
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function eventFinder(values, latitude, longitude) {
  return new Promise((resolve, reject) => {
    const { currentDate, endDate } = values;
    const sql =
      "SELECT event_Name, city_Name, date, latitude, longitude FROM events WHERE date BETWEEN ? AND ?";
    db.query(sql, [currentDate, endDate], (err, result) => {
      if (err) {
        reject(err);
      } else {
        result.forEach((event) => {
          event.latitude = event.latitude || latitude;
          event.longitude = event.longitude || longitude;
        });
        resolve(result);
      }
    });
  });
}

module.exports = { events, eventFinder };
