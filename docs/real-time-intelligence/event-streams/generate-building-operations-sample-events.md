---
title: Generate Building Operations Sample Events
description: Create a Node.js application that sends heterogeneous building operations events to a Microsoft Fabric Eventstream.
ms.reviewer: arindamc
ms.topic: tutorial
ms.date: 09/09/2026
ms.custom: schema-aware-eventstream, sample-data
ms.search.form: Eventstreams Tutorials
---

# Generate building operations sample events

The schema-aware Eventstream tutorials use a building operations scenario with
thermostat, occupancy, air-quality, and badge-reader events. Each event contains
a `deviceType` field and a payload shape specific to that device type. Some
events also contain nested objects.

This article shows you how to create a small Node.js application that sends the
sample events to a custom endpoint source in an Eventstream.

> [!IMPORTANT]
> Schema-aware Eventstreams are in **Preview**.

> [!NOTE]
> This generator is a documentation sample. Don't use it for production
> workloads or performance testing.

## Prerequisites

- A schema-aware Eventstream with a custom endpoint source.
- The **Connection string-primary key** and **Event hub name** from the custom
  endpoint source details.
- The latest [long-term support version of Node.js](https://nodejs.org).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com).

## Create the generator

1. Create a folder named `building-operations-generator`.
1. Open a terminal in the folder and run these commands:

   ```powershell
   npm init -y
   npm install @azure/event-hubs
   ```

1. Create a file named `send-building-operations-events.js`.
1. Copy the following code into the file:

   ```javascript
   const { EventHubProducerClient } = require("@azure/event-hubs");
   const { randomUUID } = require("crypto");

   const connectionString =
     process.env.EVENTSTREAM_CONNECTION_STRING;
   const eventHubName =
     process.env.EVENTSTREAM_EVENT_HUB_NAME;
   const eventsPerType = Number(
     process.env.EVENTS_PER_TYPE || 24
   );

   if (!connectionString || !eventHubName) {
     throw new Error(
       "Set EVENTSTREAM_CONNECTION_STRING and " +
       "EVENTSTREAM_EVENT_HUB_NAME before running the generator."
     );
   }

   if (!Number.isInteger(eventsPerType) || eventsPerType < 1) {
     throw new Error("EVENTS_PER_TYPE must be a positive integer.");
   }

   const deviceTypes = [
     "thermostat",
     "occupancy_sensor",
     "air_quality_monitor",
     "access_badge_reader",
   ];

   function commonFields(deviceType, index) {
     return {
       eventId: randomUUID(),
       deviceId: `${deviceType.slice(0, 4).toUpperCase()}-${String(index).padStart(3, "0")}`,
       deviceType,
       timestamp: new Date().toISOString(),
       buildingId: "BLDG-SEA-01",
     };
   }

   function thermostatEvent(index) {
     return {
       ...commonFields("thermostat", index),
       temperatureCelsius: 19 + Math.random() * 7,
       targetTemperatureCelsius: 22,
       hvacMode: index % 2 === 0 ? "heating" : "idle",
       location: {
         floor: (index % 4) + 1,
         room: `Room ${100 + index}`,
       },
     };
   }

   function occupancyEvent(index) {
     const peopleCount = index % 13;
     return {
       ...commonFields("occupancy_sensor", index),
       occupied: peopleCount > 0,
       peopleCount,
       confidencePercent: 90 + (index % 10),
       zone: {
         floor: (index % 4) + 1,
         room: `Conference Room ${String.fromCharCode(65 + (index % 4))}`,
         capacity: 12,
       },
     };
   }

   function airQualityEvent(index) {
     return {
       ...commonFields("air_quality_monitor", index),
       co2Ppm: 450 + (index % 12) * 35,
       pm25UgM3: 4 + (index % 8) * 0.75,
       airQualityIndex: 25 + (index % 20),
       pollutants: {
         vocPpb: 80 + (index % 10) * 5,
         carbonMonoxidePpm: 0.2 + (index % 4) * 0.1,
       },
     };
   }

   function badgeReaderEvent(index) {
     return {
       ...commonFields("access_badge_reader", index),
       badgeId: `BADGE-${String(1000 + index)}`,
       accessResult: index % 8 === 0 ? "denied" : "granted",
       doorName: `Floor ${(index % 4) + 1} East Entrance`,
       person: {
         employeeId: `EMP-${String(5000 + index)}`,
         department: ["Engineering", "Facilities", "Finance", "Sales"][index % 4],
       },
     };
   }

   const factories = {
     thermostat: thermostatEvent,
     occupancy_sensor: occupancyEvent,
     air_quality_monitor: airQualityEvent,
     access_badge_reader: badgeReaderEvent,
   };

   function createEvents() {
     const events = [];
     for (let index = 1; index <= eventsPerType; index += 1) {
       for (const deviceType of deviceTypes) {
         events.push(factories[deviceType](index));
       }
     }
     return events.sort(() => Math.random() - 0.5);
   }

   async function main() {
     const producer = new EventHubProducerClient(
       connectionString,
       eventHubName
     );

     try {
       const events = createEvents();
       let batch = await producer.createBatch();

       for (const event of events) {
         if (!batch.tryAdd({ body: event })) {
           await producer.sendBatch(batch);
           batch = await producer.createBatch();

           if (!batch.tryAdd({ body: event })) {
             throw new Error("An event is too large for an empty batch.");
           }
         }
       }

       if (batch.count > 0) {
         await producer.sendBatch(batch);
       }

       console.log(
         `Sent ${events.length} events: ` +
         `${eventsPerType} events for each device type.`
       );
     } finally {
       await producer.close();
     }
   }

   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```

## Configure and run the generator

1. In PowerShell, set the custom endpoint connection details as environment
   variables. Replace the placeholder values with the values from your
   Eventstream.

   ```powershell
   $env:EVENTSTREAM_CONNECTION_STRING = "<connection-string-primary-key>"
   $env:EVENTSTREAM_EVENT_HUB_NAME = "<event-hub-name>"
   ```

1. Optional: Change the number of events generated for each device type. The
   default is 24 events per type, or 96 events total.

   ```powershell
   $env:EVENTS_PER_TYPE = "24"
   ```

1. Run the generator:

   ```powershell
   node .\send-building-operations-events.js
   ```

   The terminal displays a message similar to this output:

   ```output
   Sent 96 events: 24 events for each device type.
   ```

1. Return to the Eventstream and refresh **Data preview**. Verify that the
   preview contains the following `deviceType` values:

   - `thermostat`
   - `occupancy_sensor`
   - `air_quality_monitor`
   - `access_badge_reader`

## Protect the connection credentials

The custom endpoint connection string contains a credential. Don't add the
connection string to the JavaScript file, source control, screenshots, or
terminal output that you share. Close the terminal or remove the environment
variables when you finish the tutorial.

```powershell
Remove-Item Env:\EVENTSTREAM_CONNECTION_STRING
Remove-Item Env:\EVENTSTREAM_EVENT_HUB_NAME
```

## Related content

- [Add a custom endpoint source to an Eventstream](./add-source-custom-app.md)
- [Preview data in a schema-aware Eventstream](./preview-data-schema-aware.md)
- [Classify unschematized events](./process-events-with-classifier.md)
