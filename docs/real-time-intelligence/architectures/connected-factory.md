---
title: Connected Factory Reference Architecture 
description: Reference architecture for building comprehensive connected factory solutions using Microsoft Fabric Real-Time Intelligence for real-time industrial monitoring, predictive analytics, and intelligent manufacturing operations.
ms.reviewer: bisiadele
ms.author: v-hzargari
author: hzargari-ms
ms.topic: example-scenario
ms.subservice: rti-core
ms.date: 02/12/2026
ms.search.form: Architecture
---

# Connected factory reference architecture 

This reference architecture shows how you can use Microsoft Fabric Real-Time Intelligence to build connected factory solutions that handle real-time data from industrial IoT devices across multiple manufacturing facilities. You can process more than one million IIoT events per hour from 30,000 tags across 40 factories to enable intelligent manufacturing operations with predictive analytics and real-time decision making.

You can manage large-scale manufacturing operations where thousands of industrial devices stream real-time data on production metrics, equipment performance, and operational state. The architecture integrates contextualization data from OPCUA libraries via MQTT streaming and maintains comprehensive factory inventory, shift details, and cost information to create a unified connected factory platform.

## Architecture overview

The connected factory reference architecture uses Microsoft Fabric Real-Time Intelligence to create a unified platform that processes real-time data from industrial IoT devices and integrates factory contextualization data for intelligent manufacturing management. You can implement the architecture with four main operational phases: Ingest and process, Analyze, transform, and enrich, Train, and Visualize and activate.

:::image type="content" source="media/connected-factory.png" alt-text="Screenshot of the connected factory reference architecture diagram." lightbox="media/connected-factory.png":::

1. Stream more than one million IIoT events per hour with subsecond latency from 30,000 tags across 40 factories.

1. Collect contextualization data on the IIoT devices from OPCUA library daily via MQTT.

1. Sync factory inventory, shift details, component cost, and other data to OneLake via Data Factory for data enrichment and contextualization.

1. Enrich IIoT events in-motion with the asset metadata and asset hierarchy, providing clean and curated data for consumption.

1. Aggregate enriched data with hourly and daily views per station and factory.

1. Build, train, and score machine learning models in real time, persisting the scored data in OneLake.

1. Real-Time Dashboard of all factories with ability to easily drill down from all factories view to a single asset details.

1. Rich Power BI reports with detailed views on factories production, efficiency, and maintenance.

1. Notify on-site technicians in response to live indications from the factory floor.


## Operational phases

### Ingest and process

You can stream over one million IIoT events per hour from 30,000 tags across 40 factories in real time with subsecond latency. This streaming provides comprehensive visibility into manufacturing processes, equipment performance, and production metrics. Ingest this data through [Eventstreams](../event-streams/overview.md) and store it in [Eventhouse](../eventhouse.md) for immediate analysis.

Collect contextualization data on the IIoT devices from the OPCUA library daily via MQTT. This data enables real-time asset identification, equipment specifications, and operational parameters for enhanced manufacturing insights. 

Synchronize factory inventory, shift details, and component cost information to [OneLake](../../onelake/onelake-overview.md) via [Data Factory](../../data-factory/data-factory-overview.md) for data enrichment and contextualization. This synchronization includes: 

- **Manufacturing equipment specifications and performance baselines**: Include detailed information about each piece of equipment, such as operational parameters, performance thresholds, and maintenance history. This data helps in identifying deviations from normal operating conditions and optimizing equipment utilization.

- **Production line configurations and asset hierarchies**: Document the layout and structure of production lines, including the relationships between assets, stations, and processes. This hierarchical data enables better contextualization of real-time events and facilitates root cause analysis.

- **Shift schedules and workforce allocation details**: Provide insights into workforce planning, including shift timings, roles, and responsibilities. This information is crucial for correlating production metrics with workforce efficiency and identifying potential bottlenecks.

- **Component costs and inventory management information**: Track the costs of raw materials, components, and finished goods alongside inventory levels. This data supports real-time cost analysis, supply chain optimization, and efficient resource allocation.

**Real-world scenario example**: A major manufacturing conglomerate with 40 factories processes over one million IIoT events per hour from 30,000 industrial tags. These events include temperature readings from furnaces, pressure measurements from hydraulic systems, vibration data from rotating machinery, production counts from assembly lines, and quality metrics from inspection stations. The MQTT-Eventstream integration processes this data while maintaining subsecond latency for critical manufacturing decisions and real-time production optimization. 

### Analyze, transform, and enrich 

Enrich IIoT events in motion with the asset metadata and asset hierarchy to provide clean and curated data for consumption. This enrichment process combines real-time manufacturing telemetry with: 

- Equipment specifications and performance baselines.

- Asset hierarchy and production line topology.

- Historical performance patterns and maintenance records.

- Shift information and workforce allocation.

- Component costs and inventory correlation analytics.

Aggregate enriched data with hourly and daily views per station and factory, enabling comprehensive manufacturing analysis and operational insights. This aggregation enables: 

- **Real-time production monitoring** - Immediate tracking of manufacturing KPIs and production efficiency.

- **Equipment performance analysis** - Detailed asset utilization and maintenance optimization.

- **Quality control** - Production quality tracking and defect pattern identification.

- **Cost optimization** - Real-time correlation of production costs with operational efficiency.

### Train 

Train and score predictive machine learning models in real time by using [Data Science](../../data-science/data-science-overview.md) capabilities. Persist the scored data in [OneLake](../../onelake/onelake-overview.md). Models include: 

- **Equipment failure prediction models** - Build and train machine learning models to forecast machinery breakdowns based on historical performance data, sensor readings, and maintenance records. These models enable proactive maintenance scheduling, reducing downtime and operational disruptions.

- **Production optimization** - Develop predictive models to identify optimal production parameters, such as equipment settings, shift allocations, and resource utilization, to maximize manufacturing efficiency and throughput.

- **Quality prediction** - Use machine learning to anticipate product quality problems by analyzing production telemetry, environmental conditions, and historical defect patterns. These insights help adjust manufacturing processes in real time to maintain high-quality standards.

- **Energy consumption forecasting** - Implement predictive analytics to estimate factory energy usage based on production schedules, equipment performance, and environmental factors. This estimation enables cost optimization and supports sustainability initiatives.

- **Inventory optimization analytics** - Analyze consumption patterns, production trends, and supply chain data to forecast inventory needs accurately. This analysis ensures efficient resource allocation, minimizes stockouts, and reduces excess inventory costs.

### Visualize and activate 

By using [Real-Time Dashboards](../dashboard-real-time-create.md), stakeholders can easily drill down from an all factories view to a single asset details, including:

- **Factory overview** - Gain a unified, real-time view of production status across all 40 factories, enabling quick identification of operational trends and anomalies.

- **Production line monitoring** - Access detailed insights into the performance of individual manufacturing lines and stations, facilitating targeted process improvements.

- **Asset-level details** - Monitor granular operational metrics for each piece of equipment, including performance, utilization, and maintenance status.

- **Manufacturing KPIs** - Track key performance indicators such as production efficiency, product quality, and equipment utilization in real time to drive data-informed decisions.

Rich [Power BI](../create-powerbi-report.md) reports provide high granularity business view directly on the real-time data including:

- **Production analytics** - Access enriched data with high granularity in BI reports for detailed manufacturing analysis, including production trends, efficiency metrics, and cost insights.

- **Operational efficiency** - Monitor manufacturing performance, identify bottlenecks, and optimize resource allocation to enhance overall efficiency.

- **Quality metrics** - Analyze production quality, detect defect patterns, and implement corrective measures to maintain high standards.

- **Asset utilization** - Evaluate equipment performance, optimize maintenance schedules, and improve asset utilization for sustained operational excellence.

Use [Activator](../data-activator/activator-introduction.md) to notify on-site technicians in response to live indications from the factory floor, enabling:

- **Immediate equipment response** - Automatic alerts for machinery malfunctions and production anomalies to on-site technicians.

- **Proactive maintenance** - Preventive notifications for predicted equipment issues and production bottlenecks.

- **Quality alerts** - Real-time notifications for quality deviations and production defects.

- **Production optimization** - Immediate notifications for efficiency improvements and process adjustments.

By using [Copilot](../../fundamentals/copilot-fabric-overview.md), you can use natural language queries to monitor connected factory operations, analyze real-time manufacturing data, and identify potential problems or optimization opportunities. This tool simplifies complex data exploration, helping you make informed decisions to enhance production efficiency, equipment performance, and overall operational effectiveness.

## Technical benefits and outcomes 

### Connected factory intelligence 

- **Real-time manufacturing monitoring** - Monitor 40 factories with more than one million IIoT events per hour and subsecond response times for critical production operations.

- **Predictive analytics** - Use machine learning models to forecast equipment failures, production optimization, and quality improvements.

- **Unified data platform** - Integrate IIoT data with asset metadata and factory information for comprehensive manufacturing management.

- **Granular visibility** - Drill-down capabilities from factory overview to individual asset performance.

### Automated manufacturing operations 

- **Intelligent alerting** - Real-time notifications for equipment malfunctions, production anomalies, and quality problems.

- **Automated workflows** - Set up triggers for maintenance dispatch, production optimization, and quality control.

- **Proactive factory management** - Use predictive models for equipment maintenance and production optimization.

- **Dynamic resource allocation** - Enable real-time adjustments to production schedules, maintenance activities, and quality processes.

### Advanced analytics and business intelligence

- **Real-time production optimization** - Correlate IIoT data with asset hierarchy for immediate efficiency improvements and cost optimization.

- **Rich BI capabilities** - High granularity business analysis with direct query on real-time manufacturing data.

- **Natural language processing** - Query complex manufacturing scenarios using conversational AI.

- **Cross-system correlation** - Link real-time events with historical patterns, asset data, and cost information.

### Operational efficiency and manufacturing optimization

- **Predictive maintenance** - Reduce equipment downtime and maintenance costs through machine learning-driven failure prediction.

- **Production optimization** - Maximize manufacturing efficiency and quality through real-time analytics and predictive modeling.

- **Quality management** - Enhance product quality through real-time monitoring and predictive quality analytics.

- **Cost optimization** - Optimize manufacturing costs through predictive analytics and efficient resource allocation.

## Implementation considerations

### Data architecture requirements

- **High-throughput ingestion** - Design your system to process more than one million IIoT events per hour from 30,000 tags across 40 factories, with burst capacity during peak production periods.

- **Real-time processing** - Ensure subsecond response times for critical manufacturing alerts, under two-second response for production updates, and under five-second processing for quality calculations.

- **Data quality and validation** - Implement real-time validation for device identification, sensor measurements, production data, and cost calculations with automatic error correction.

- **Scalability planning** - Design your architecture to handle growing manufacturing networks with more than 100 factories, seasonal production variations, and equipment expansion.

### Security and compliance 

- **Data encryption** - Implement end-to-end encryption for sensitive manufacturing data, production information, and cost records by using industry-standard algorithms. Encrypt data at rest and in transit, and maintain separate encryption keys for operational and business data.

- **Access controls** - Implement role-based access control aligned with manufacturing responsibilities (plant operators, maintenance technicians, quality engineers, production managers), multifactor authentication for all system access, and privileged access management for administrative functions.

- **Audit trails** - Create comprehensive logging for compliance including all production activities, equipment operations, and quality measurements with immutable audit logs and automated compliance reporting.

- **Data privacy** - Ensure compliance with manufacturing regulations and intellectual property requirements for production data and operational information protection.

### Integration points

- **Industrial control systems**: Integration with PLCs, SCADA systems, and manufacturing execution systems by using industry-standard protocols.

- **MQTT OPCUA providers**: Real-time integration with industrial automation platforms, asset management systems, and production planning applications.

- **ERP systems**: Integration with enterprise resource planning, inventory management, and financial systems for comprehensive cost tracking.

- **External data sources**: APIs for supply chain systems, quality management platforms, maintenance scheduling, and regulatory compliance systems.

### Monitoring and observability 

**Operational monitoring**: 

- **System health dashboards**: Real-time monitoring of MQTT-Eventstream integration for OPCUA data, IIoT device throughput, and Activator notification delivery with automated alerting for system anomalies.

- **Data quality monitoring**: Continuous validation of incoming manufacturing data with alerting for device communication failures, invalid sensor readings, or corrupted production data.

- **Performance metrics**: Tracking of data ingestion latency from industrial devices, query response times for Real-Time Dashboards, and machine learning model prediction accuracy with SLA monitoring.

**Cost optimization**: 

- **Capacity management**: Right-sizing of Fabric capacity based on manufacturing network size and data volume, implementing autoscaling for peak production periods, and cost optimization during maintenance windows.

- **Data lifecycle management**: Automated archival of older manufacturing data to lower-cost storage tiers, retention policies aligned with regulatory requirements, and deletion of nonessential production data.

- **Manufacturing cost optimization**: Real-time correlation of production patterns with equipment performance to minimize operational costs and maximize manufacturing efficiency.

## Next steps 

### Getting started

**Phase 1: Foundation setup**

1. Review [Microsoft Fabric Real-Time Intelligence](../overview.md) capabilities and understand capacity requirements for your connected factory scale (multiple factories and thousands of industrial devices).

1. Plan your MQTT-[Eventstream](../event-streams/overview.md) integration strategy for IIoT data, OPCUA contextualization, and factory information. Start with critical data (production metrics, equipment status, quality measurements).

1. Design your real-time analytics implementation in [Eventhouse](../eventhouse.md) for processing manufacturing events with subsecond latency requirements.

1. Configure [OneLake](../../onelake/onelake-overview.md) for factory inventory and historical production data storage with appropriate retention policies.

**Phase 2: Pilot implementation** 

1. Start with a single factory subset (5,000-10,000 tags) to validate the architecture and MQTT integration performance.

1. Implement core data flows for production monitoring, equipment tracking, and basic alerting capabilities.

1. Establish integration with OPCUA systems and ERP platforms for real-time asset contextualization and cost management.

1. Deploy Real-Time Dashboard for connected factory monitoring with drill-down capabilities from factory overview to individual asset details.

**Phase 3: Operational validation** 

1. Test system performance during peak production periods and maintenance scenarios.

1. Validate [Activator](../data-activator/activator-introduction.md) rules for on-site technician notifications based on equipment issues and production anomalies.

1. Ensure compliance with manufacturing regulations and quality standards.

1. Train your operational teams on dashboard usage, alert management, and drill-down analysis procedures from factory to asset level.

### Advanced implementation 

**Intelligent automation and AI** 

- Set up advanced [Data Science](../../data-science/data-science-overview.md) capabilities for building, training, and scoring predictive machine learning models for equipment failure prediction and production optimization.

- Implement [Activator](../data-activator/activator-introduction.md) for sophisticated connected factory automation including predictive maintenance, dynamic production optimization, and automated quality control.

- Deploy [Copilot](../../fundamentals/copilot-fabric-overview.md) for natural language analytics. Enable your teams to query complex scenarios like "Show me all equipment with performance issues during last week's high production period".

- Create intelligent manufacturing systems that provide real-time decision support based on production patterns, equipment performance, and quality requirements.

**Enterprise-scale deployment**

- Scale to full connected factory operations with dozens of factories and centralized monitoring across multiple regions.

- Implement advanced analytics for production forecasting, maintenance optimization, and supply chain integration.

- Create comprehensive dashboards with [Power BI](../create-powerbi-report.md) direct query capabilities and [Real-Time Dashboard](../dashboard-real-time-create.md) for executive reporting, operational monitoring, and regulatory compliance.

- Develop enterprise-grade machine learning models for production prediction, equipment optimization, and manufacturing expansion planning.

## Related resources 

- [Real-Time Intelligence documentation](../overview.md)
- [Activator for automated alerting](../data-activator/activator-introduction.md) 
- [Eventstreams for real-time data ingestion](../event-streams/overview.md) 
- [Advanced analytics and machine learning](../../data-science/data-science-overview.md) 
- [Microsoft Fabric Real-Time Intelligence capacity planning](../../enterprise/plan-capacity.md) 
- [OneLake data storage overview](../../onelake/onelake-overview.md)
