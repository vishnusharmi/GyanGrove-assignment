const db = require("../databaseC");
const dbase = require("../model/model_event");
const axios = require("axios");

async function createEvent(req, res) {
  const requiredFields = [
    "event_name",
    "city_name",
    "date",
    "time",
    "latitude",
    "longitude",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are required: ${missingFields.join(", ")}`,
    });
  }
  const providedFields = Object.keys(req.body);
  if (
    providedFields.length === 1 &&
    requiredFields.includes(providedFields[0])
  ) {
    return res.status(400).json({
      message:
        "If one field is provided, all other required fields must also be present",
    });
  }
  if (isNaN(req.body.latitude) || isNaN(req.body.longitude)) {
    return res.status(400).json({ message: "Latitude and longitude numbers" });
  }

  const userData = {
    event_name: req.body.event_name,
    city_name: req.body.city_name,
    date: req.body.date,
    time: req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  try {
    const data = await dbase.events(userData);
    res.status(200).json({ message: "event create a successfully" });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function findEvent(req, res) {
  try {
    const { page } = req.query;
    const { latitude, longitude, date } = req.body;
    const currentDate = new Date(date);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 14);

    const weatherApiKey = process.env.WEATHER_API_KEY;
    const distanceApiKey = process.env.YOUR_DISTANCE_API_CODE;
    if (!latitude || !longitude || !date) {
      return res
        .status(400)
        .json({ message: "all feilds are required (latitude,longitude,date)" });
    }
    const events = await dbase.eventFinder(
      { currentDate, endDate },
      latitude,
      longitude
    );

    const promises = events.map(async (event) => {
      try {
        let parsedDate = new Date(event.date);
        if (
          Object.prototype.toString.call(parsedDate) === "[object Date]" &&
          !isNaN(parsedDate.getTime())
        ) {
          const weatherResponse = await axios.get(
            `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=${weatherApiKey}&city=${encodeURIComponent(
              event.cityName
            )}&date=${parsedDate.toISOString().split("T")[0]}`
          );
          event.weather = weatherResponse.data.weather;
        } else {
          console.error("Invalid date format:", event.date);
          return null;
        }

        const distanceResponse = await axios.get(
          `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=${distanceApiKey}&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`
        );
        event.distance_km =
          distanceResponse.data.distance ||
          calculateDistance(
            latitude,
            longitude,
            event.latitude,
            event.longitude
          );

        return event;
      } catch (error) {
        console.error("Error fetching weather/distance for event:", error);
        return null;
      }
    });

    const resolvedEvents = await Promise.all(promises);
    const validEvents = resolvedEvents.filter((event) => event !== null);
    validEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    const pageSize = 10;
    const pageNumber = parseInt(page) || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, validEvents.length);
    const paginatedEvents = validEvents.slice(startIndex, endIndex);

    const response = {
      events: paginatedEvents,
      page: pageNumber,
      pageSize: paginatedEvents.length,
      totalEvents: validEvents.length,
      totalPages: Math.ceil(validEvents.length / pageSize),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(422).json({ message: "Unprocessable Entity" });
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = { createEvent, findEvent };
