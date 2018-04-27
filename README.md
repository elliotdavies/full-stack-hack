# Full Stack Hack

Six-hour hackday challenge to build a system that makes use of Apache Kafka, MongoDB and NodeJS.

Our idea was to build a system that can:

* Simulate IOT device data, for example temperature and soil moisture
* Feed the data into Kafka for processing, for example computing rolling averages
* Store everything in MongoDB
* Render data visualisations in a React UI

Interesting future work could include:

* Changing the simulation parameters, for example with a "heatwave mode" to increase the temperature, and modelling the effect of this on related data (i.e. if the temperature is very high, the soil moisture should decrease faster)
* Alerts and monitoring based on the data levels
* Hooking up real IOT devices

Built with [Chris Hutchinson](https://github.com/chrishutchinson) and [Adele Kufour](https://github.com/SunshineEleda)
