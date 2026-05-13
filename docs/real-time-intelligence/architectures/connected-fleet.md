---
title: Connected fleet data analytics reference architecture 
description: Reference architecture for building comprehensive connected fleet analytics using Microsoft Fabric Real-Time Intelligence's real-time intelligence capabilities for vehicle monitoring, predictive maintenance, and operational optimization
ms.reviewer: bisiadele
ms.author: v-hzargari
author: hzargari-ms
ms.topic: example-scenario
ms.subservice: rti-core
ms.date: 02/12/2026
ms.search.form: Architecture
---

# Connected fleet data analytics reference architecture

This reference architecture shows how to use Microsoft Fabric Real-Time Intelligence to build connected fleet analytics solutions. You can handle real-time data from vehicle electronic control units (ECUs), onboard sensors, and telemetry systems to ensure safe, efficient fleet operations while delivering exceptional insights for predictive maintenance and operational optimization. 

You can source real-time and historical vehicle data from multiple sources including ECUs, CAN bus networks, LIN systems, Ethernet connections, and video feeds. Connected vehicles with onboard data capture devices provide updates on engine health, vehicle performance, location tracking, and operational metrics. Device management systems feed live telemetry and recorded data files into the pipeline through MQTT protocols.

## Architecture overview

The connected fleet reference architecture uses Microsoft Fabric Real-Time Intelligence to create a unified analytics platform that processes real-time vehicle telemetry and enables intelligent fleet management. You can implement the architecture with four main operational phases: Ingest and process, Analyze, transform, and enrich, Train, and Visualize and activate.

:::image type="content" source="media/connected-fleet.png" alt-text="Screenshot of the connected fleet data analytics architecture diagram." lightbox="media/connected-fleet.png":::

1. Capture vehicle data from the vehicle's electronic control units (ECUs) and onboard sensors.

1. Connected vehicles perform device management and send MQTT data to Eventstreams within Real-Time Intelligence.

1. The data capture device transmits recorded data files and telemetry from CAN, LIN, Ethernet, and video sources directly to Fabric Data Factory. Then, the data is ingested into Eventhouse where all telemetry data is combined and stored. This step ensures seamless ingestion and processing of diverse data streams for further analysis.

1. The data ingested into Eventstreams is enriched in-motion with the asset metadata and asset hierarchy, providing clean and curated data for consumption.

1. Aggregate enriched data with hourly and daily views per station.

1. Build, train, and score machine learning models in real time, to better predict and understand utilization patterns.

1. Fleet operators use Real-Time Dashboard to visualize fleet information, including track-and-trace queries and near-real-time calculations. 

1. Rich Power BI provides full analytics for monitoring fleet position, predictive maintenance thresholds, geofence tracking, and utilization patterns.

1. Use activator to set up automated alerts and actions based on real-time vehicle data, such as engine health or vehicle performance.

## Operational phases 

### Ingest and process

Use [Eventstreams](../event-streams/overview.md) to ingest real-time telemetry data from connected vehicles, including engine diagnostics, GPS location updates, and driver behavior metrics. Process IoT events with subsecond latency to provide comprehensive visibility into fleet operations and vehicle performance. Integrate vehicle specifications, route details, and driver information in real time to deliver actionable insights for fleet optimization.

Use [Data Factory](../../data-factory/data-factory-overview.md) to collect and synchronize vehicle and asset information from fleet management systems into [OneLake](../../onelake/onelake-overview.md). Update metadata daily, including:

- Vehicle specifications and operational metrics
- Driver profiles and route assignments
- Maintenance schedules and service history
- Fleet utilization patterns and performance benchmarks

A major fleet operator managing 10,000 vehicles processes over 5 million vehicle events per day. These events include engine diagnostics every 10 seconds, GPS location updates, fuel consumption metrics, and maintenance alerts. The Eventstreams integration processes this data while maintaining subsecond latency for critical operational decisions and fleet optimization.

### Analyze, transform, and enrich

Continuous transformations take place within [Eventhouse](../eventhouse.md), where real-time vehicle telemetry data is enriched with asset metadata stored in [OneLake](../../onelake/onelake-overview.md). This enrichment process creates fully curated, ready-for-consumption fleet data by combining real-time telemetry with the following information:

- **Vehicle specifications** - Operational benchmarks and maintenance thresholds help you compare real-time performance metrics against expected values, enabling the identification of inefficiencies or anomalies.

- **Route context** - Route details and driver assignments provide insights into how operational factors influence vehicle performance and fleet efficiency.

- **Historical performance patterns** - Long-term trends and maintenance history help you detect anomalies, forecast future issues, and optimize fleet operations.

- **Environmental data correlation** - Integration of weather and traffic data enables accurate forecasting for route planning and operational adjustments.

You can correlate aggregated fleet data with enriched vehicle metadata to provide a unified view of operational performance. This real-time processing delivers the following capabilities:

- **Operational optimization** - Immediate correlation of vehicle performance and route data ensures efficient fleet utilization and resource allocation.

- **Driver behavior analysis** - Detailed insights into driving patterns enable tailored training programs and safety improvements.

- **Predictive maintenance** - Early detection of potential vehicle issues minimizes downtime and reduces maintenance costs.

### Train

Build, train, and score machine learning models in real time by using [Data Science](../../data-science/data-science-overview.md) capabilities to predict potential vehicle failures and optimize fleet operations. These models continuously learn from incoming telemetry data and historical performance patterns to provide actionable insights for fleet management. Key predictive capabilities include:

- **Failure prediction models** - Use machine learning to forecast engine or component failures based on real-time telemetry and historical data. These models enable proactive maintenance scheduling, ensuring fleet reliability.

- **Driver behavior analytics** - Analyze driving patterns to identify trends and anomalies. Use these insights to improve driver training programs and enhance safety.

- **Route optimization** - Predict traffic patterns and optimize routes to reduce fuel consumption and improve delivery times.

### Visualize and activate

[Activator](../data-activator/activator-introduction.md) in Fabric Real-Time Intelligence generates real-time notifications on vehicle performance issues and predictive maintenance needs. By using this real-time alerting awareness, the system reduces manual intervention and enables swift operational responses. Key alerting features include:

- **Immediate maintenance response** - Receive automatic alerts for vehicle diagnostics that indicate potential failures, enabling swift action to prevent breakdowns.

- **Driver safety alerts** - Trigger notifications for harsh braking, rapid acceleration, or speeding events, improving overall fleet safety.

- **Operational optimization** - Implement real-time adjustments to optimize routes and reduce fuel consumption, ensuring cost efficiency.

Fleet operators use [Power BI](../create-powerbi-report.md) dashboards connected directly to [Eventhouse](../eventhouse.md) and [OneLake](../../onelake/onelake-overview.md) to monitor real-time fleet data and generate comprehensive reports. These reports provide:

- **Fleet performance analytics** - Gain insights into vehicle utilization patterns and evaluate operational efficiency through detailed reports.

- **Maintenance tracking** - Monitor service schedules and analyze maintenance history to ensure fleet reliability.

- **Driver behavior insights** - Analyze driving patterns to uncover trends and anomalies, enabling targeted training and safety improvements.

Real-Time Dashboards provide live operational visibility with customizable views for different roles, enabling teams to monitor and respond to real-time events effectively. These dashboards provide the following capabilities:

- **Fleet overview** - Gain a comprehensive view of the entire fleet, including real-time vehicle status and operational metrics, to make informed decisions.

- **Vehicle-level monitoring** - Access detailed monitoring of individual vehicles, including diagnostics, location, and performance metrics.

- **Operational KPIs** - Track real-time key performance indicators (KPIs) such as fuel efficiency, route adherence, and maintenance compliance.

[Copilot](../../fundamentals/copilot-fabric-overview.md) allows you to use natural language queries to monitor fleet operations, analyze real-time vehicle data, and identify potential problems or optimization opportunities. This tool simplifies complex data exploration, helping you make informed decisions to enhance fleet performance and operational efficiency.

## Technical benefits and outcomes

### Real-time fleet intelligence

- **Unified data platform** - Create a single source of truth for all vehicle telemetry data.

- **Real-time anomaly detection** - Get immediate identification of vehicle performance problems.

- **Scalable architecture** - Handle high-velocity data streams from thousands of connected vehicles.

- **Integrated analytics** - Combine real-time and historical data for comprehensive fleet insights.

### Automated fleet management

- **Intelligent alerting** - Receive context-aware notifications based on vehicle performance rules.

- **Automated workflows** - Set up triggers for maintenance scheduling, geofence monitoring, and driver alerts.

- **Proactive issue management** - Use early warning systems for vehicle health and performance optimization.

- **Resource optimization** - Enable dynamic allocation of vehicles, routes, and maintenance resources.

### Advanced analytics capabilities

- **Natural language processing** - Query complex fleet data by using conversational AI.

- **Predictive analytics** - Use machine learning models for maintenance prediction and optimization.

- **Historical trend analysis** - Identify patterns in vehicle performance and efficiency.

- **Cross-system correlation** - Link real-time events with historical operational data.

## Implementation considerations

### Data architecture requirements

- **High-throughput ingestion** - Design your system to process billions of vehicle events per second for large fleets (10,000+ vehicles), with burst capacity during peak operations.

- **Low-latency processing** - Ensure subsecond response times for critical safety alerts, under three-second response for performance notifications, and under 15-second processing for maintenance recommendations.

- **Data quality and validation** - Implement real-time validation for vehicle identification numbers (VINs), ECU data integrity, sensor calibration values, and GPS coordinates with automatic error flagging.

- **Scalability planning** - Design your architecture to handle seasonal variations in vehicle usage, support fleet expansion, and accommodate new vehicle types and sensor technologies.

- **Storage requirements** - Plan for terabytes of vehicle data per month for large fleets, with two-year retention for performance analysis, and hot storage for operational data.

### Security and compliance

- **Access controls** - Implement role-based access control aligned with operational responsibilities (fleet managers, dispatchers, maintenance teams, drivers). Use multifactor authentication for all system access, and manage privileged access for administrative functions.

- **Audit trails** - Create comprehensive logging for regulatory compliance. Include all data access, modifications, and system actions with immutable audit logs and automated compliance reporting. 

- **Data privacy** - Ensure compliance with regional privacy regulations (GDPR, CCPA) and fleet-specific requirements for driver and vehicle data protection.

### Integration points

- **Fleet management systems**: Integrate with existing fleet management platforms, vehicle tracking systems, and maintenance scheduling tools by using industry-standard APIs and data formats. 

- **Telematics providers**: Use APIs for third-party telematics devices, cellular connectivity services, and vehicle gateway systems. 

- **Maintenance systems**: Secure data sharing with maintenance management platforms, parts inventory systems, and service scheduling applications.

- **Driver applications**: Provide real-time data feeds for driver mobile apps, vehicle status dashboards, and route optimization tools with offline capability. 

### Monitoring and observability 

**Operational monitoring**: 

- **System health dashboards**: Real-time monitoring of Eventstreams throughput, Eventhouse query performance, and Activator rule execution with automated alerting for system anomalies.

- **Data quality monitoring**: Continuous validation of incoming vehicle data streams with alerting for missing sensors or corrupted data transmissions.

- **Performance metrics**: Tracking of data ingestion latency, query response times, and alert delivery times with SLA monitoring and automated escalation.

**Cost optimization**:

- **Capacity management**: Right-sizing of Fabric capacity based on fleet size and usage patterns, implementing autoscaling for peak periods, and cost optimization during low-activity periods.

- **Data lifecycle management**: Automated archival of older vehicle data to lower-cost storage tiers, retention policies aligned with business requirements, and deletion of non-essential telemetry data.

## Next steps 

### Getting started 

**Phase 1: Foundation setup** 

1. Review [Microsoft Fabric Real-Time Intelligence](../overview.md) capabilities and understand capacity requirements for your fleet size.

1. Plan your [Eventstreams](../event-streams/overview.md) data ingestion strategy. Start with critical vehicle data (engine diagnostics, GPS tracking, fuel consumption).

1. Design your [Eventhouse](../eventhouse.md) real-time analytics implementation. Focus on vehicle health monitoring and maintenance alerts.

1. Configure [OneLake](../../onelake/onelake-overview.md) for historical data storage and analysis with appropriate retention policies.

**Phase 2: Pilot implementation** 

1. Use a subset of your fleet (50-100 vehicles) to validate the architecture.

1. Implement core data flows for vehicle monitoring, driver behavior analysis, and basic alerting.

1. Establish integration with your existing fleet management systems for seamless data flow.

1. Deploy Real-Time Dashboard for fleet operations monitoring with customized views for different roles.

**Phase 3: Operational validation** 

1. Test system performance during peak operational periods and various driving conditions.

1. Validate Activator rules for maintenance alerts, geofence monitoring, and performance optimization.

1. Ensure compliance with data privacy regulations and fleet management requirements.

1. Train your operational teams on dashboard usage and alert management procedures.

### Advanced implementation 

**Intelligent automation and AI** 

- Set up [Activator](../data-activator/activator-introduction.md) for sophisticated fleet automation, including predictive maintenance workflows, route optimization, and driver coaching programs.

- Implement [Copilot](../../fundamentals/copilot-fabric-overview.md) for natural language analytics. Enable your teams to query complex scenarios like "Show me all vehicles with fuel efficiency below average in the last week.".

- Deploy predictive maintenance models that use historical vehicle sensor data to predict component failures and optimize service schedules.

- Create intelligent driver assistance systems that provide real-time feedback and coaching based on vehicle performance data.

**Enterprise-scale deployment** 

- Scale to full fleet operations with centralized monitoring and distributed data processing across multiple regions.

- Implement advanced analytics for route optimization, fuel efficiency improvement, and total cost of ownership analysis.

- Create comprehensive dashboards with [Power BI](../create-powerbi-report.md) and [Real-Time Dashboard](../dashboard-real-time-create.md) for executive reporting, operational monitoring, and regulatory compliance.

- Develop machine learning models for demand forecasting, vehicle allocation optimization, and driver performance improvement.

## Related resources 

- [Real-Time Intelligence documentation](../overview.md) 
- [Activator for automated alerting](../data-activator/activator-introduction.md) 
- [Eventstreams for real-time data ingestion](../event-streams/overview.md) 
- [Advanced analytics and machine learning](../../data-science/data-science-overview.md) 
- [Microsoft Fabric Real-Time Intelligence capacity planning](../../enterprise/plan-capacity.md) 
- [OneLake data storage overview](../../onelake/onelake-overview.md) 
