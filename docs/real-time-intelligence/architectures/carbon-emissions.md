---
title: Carbon emissions management reference architecture
description: Reference architecture for building comprehensive carbon emissions management solutions using Microsoft Fabric Real-Time Intelligence for real-time emissions monitoring, carbon market intelligence, and environmental compliance analytics.
ms.reviewer: bisiadele
ms.author: v-hzargari 
author: hzargari-ms
ms.topic: example-scenario
ms.subservice: rti-core
ms.date: 02/12/2026
ms.search.form: Architecture
---

# Carbon emissions management reference architecture 

This reference architecture demonstrates how you can use Microsoft Fabric Real-Time Intelligence to build comprehensive carbon emissions management solutions that handle real-time data from emission measurement devices across power plants and industrial facilities. You can process real-time emissions telemetry, carbon market data, and asset performance metrics to enable intelligent environmental compliance operations with predictive analytics and real-time decision making. 

You can manage large-scale carbon emissions monitoring where hundreds or thousands of measurement devices stream real-time data on emission levels, gas compositions, and environmental impact metrics. The architecture integrates carbon market data via real-time streaming and maintains comprehensive metadata and asset information on various types of industrial equipment to create a unified carbon emissions platform. 

## Architecture overview 

The carbon emissions management reference architecture uses Microsoft Fabric Real-Time Intelligence to create a unified platform that processes real-time data from emission measurement devices and integrates carbon market intelligence for comprehensive environmental management. You can implement the architecture with four main operational phases: Ingest and process, Analyze, transform, and enrich, Train, and Visualize and activate.

:::image type="content" source="media/carbon-emissions.png" alt-text="Screenshot of the carbon emissions management architecture diagram." lightbox="media/carbon-emissions.png":::

1. Emission measurement devices in the power plants stream emission data. The architecture aggregates and pushes the data to MQTT, and then Eventstream collects it.

1. The architecture collects carbon market data in real time.

1. Data Factory syncs asset metadata, gas prices, and oil prices from the ERP system to OneLake.

1. The architecture enriches and contextualizes emissions data with the asset metadata, providing curated tables that are ready for easy consumption.

1. The architecture materializes and aggregates data in real time for a long-term aggregative view.

1. Build, train, and score machine learning models in real time to better predict and understand emissions spikes.

1. Real-Time Dashboards provide a high granularity view of the carbon emissions across all factories with easy correlation to the carbon market trends.

1. Power BI provides high-level business reports with yearly and monthly views on carbon emission affect on the business.

1. Use activator to set up automated alerts and actions based on real-time emissions anomalies and on in-flight data.

## Operational phases

### Ingest and process

Use [Eventstreams](../event-streams/overview.md) to ingest real-time telemetry data from emission measurement devices in power plants and industrial facilities. This data includes carbon output levels, gas compositions, and environmental impact metrics. Process IoT events with subsecond latency to provide comprehensive visibility into emissions data and environmental performance. Integrate asset metadata, regulatory compliance requirements, and carbon market data in real time to deliver actionable insights for environmental optimization and compliance tracking.

Use [Data Factory](../../data-factory/data-factory-overview.md) to collect and synchronize asset metadata, gas, and oil prices from ERP systems into [OneLake](../../onelake/onelake-overview.md). This metadata includes: 

- Power plant specifications and emission capacity ratings 
- Industrial equipment configurations and environmental baselines 
- Regulatory compliance requirements and reporting schedules 
- Energy source costs and carbon footprint calculations 

**Real-world scenario example**: A major industrial conglomerate with 75 power plants and 200 manufacturing facilities processes over 8 million emission measurement events per day. These events include CO2 levels, NOx readings, particulate matter concentrations, methane emissions, and energy consumption metrics. The MQTT-Eventstream integration processes this data while maintaining subsecond latency for critical environmental compliance decisions and regulatory reporting requirements.

### Analyze, transform, and enrich

Enrich and contextualize emissions data with the asset metadata to create curated tables that are easy to use. This enrichment process combines real-time emissions telemetry with:

- **Environmental specifications and baselines:** Detailed emission capacity ratings, equipment configurations, and operational thresholds for compliance tracking. This combination enables accurate emissions assessment against regulatory standards.
  
- **Regulatory jurisdiction information:** Geographic coordinates, local environmental regulations, and jurisdiction-specific compliance requirements. This information enables real-time adherence to diverse regulatory frameworks.

- **Historical performance patterns:** Multi-year trends, seasonal variations, and past regulatory audit outcomes help you detect anomalies, forecast compliance risks, and optimize environmental strategies.

- **Operational records and maintenance schedules:** Detailing equipment performance metrics, maintenance history, and operational anomalies impacting emissions. This detail enables predictive maintenance and emissions optimization.

- **Energy source correlation analytics:** Analyzing the relationship between energy sources (for example, coal, natural gas, renewables) and their respective carbon emissions impact. This analysis helps optimize energy sourcing strategies for sustainability and cost efficiency.

You can materialize and aggregate data in real time for a long-term aggregative view, enabling comprehensive environmental impact assessment and regulatory compliance tracking. This view enables: 

- **Real-time compliance monitoring** - Immediate emissions threshold tracking and regulatory adherence.

- **Environmental impact analysis** - Detailed carbon footprint assessment and sustainability metrics.

- **Market correlation** - Carbon credit optimization and environmental trading strategies.

- **Predictive compliance** - Proactive emissions management and regulatory risk mitigation.

### Train

By using [Data Science](../../data-science/data-science-overview.md) capabilities, you can build, train, and score machine learning models in real time. These models provide detection and prediction on emissions spikes, including:

- **Emissions spike detection models** - Identify anomalous emission levels and environmental violations.

- **Compliance forecasting** - Predict regulatory compliance status and optimize reporting strategies.

- **Carbon market optimization** - Anticipate carbon credit needs and trading opportunities.

- **Environmental impact prediction** - Forecast long-term sustainability metrics and carbon footprint trends.

- **Equipment performance analytics** - Understand emissions patterns for operational optimization.

### Visualize and activate 

[Real-Time Dashboards](../dashboard-real-time-create.md) provide high granularity views of the carbon emissions across all factories with easy correlation to the carbon market trends, enabling teams to monitor and respond to real time events effectively. These dashboards provide the following capabilities:

- **Emissions overview** - Comprehensive view of all emission sources with real-time compliance status.

- **Facility-level monitoring** - Detailed view of individual power plants and facilities with environmental metrics.

- **Device-level details** - Granular monitoring of each emission measurement device and sensor readings.

- **Compliance metrics** - Real-time KPIs for environmental compliance, carbon footprint, and sustainability performance.

Rich [Power BI](../create-powerbi-report.md) reports provide live, high granularity operational visibility into carbon emissions data, enabling teams to make informed decisions in real time. These reports offer:

- **Emissions analytics** - Comprehensive reporting on carbon emission patterns and environmental trends.

- **Compliance performance** - Environmental regulatory tracking and sustainability metrics analysis.

- **Market intelligence** - Carbon credit analysis and environmental trading optimization insights.

- **Business impact insights** - High-level business reports providing yearly and monthly view on carbon emission impact on the business.

By using [Activator](../data-activator/activator-introduction.md), you can generate real-time notifications on emissions anomalies and on in-flight data, enabling: 

- **Immediate compliance response** - Automatic alerts for emissions threshold violations and regulatory issues.

- **Proactive anomaly management** - Preventive notifications for predicted environmental violations.

- **Market optimization** - Real-time adjustments for carbon credit trading and environmental compliance.

- **Emergency response** - Immediate notifications for critical emissions incidents requiring urgent environmental action.

By using [KQL copilot](../copilot-writing-queries.md), you can use natural language queries to interact with real-time carbon emissions data without needing to write complex KQL queries. Additionally, you can train KQL Copilot to aggregate and evaluate utilization patterns, providing deeper operational insights.

## Technical benefits and outcomes 

The carbon emissions management reference architecture delivers measurable technical and operational benefits by combining real-time data processing, predictive analytics, and automated workflows across emissions monitoring, compliance management, and sustainability optimization systems.

### Carbon emissions intelligence 

- **Real-time emissions monitoring** - Monitor carbon emissions across all facilities with subsecond response times for critical environmental compliance operations.

- **Predictive analytics** - Use machine learning models to forecast emissions spikes, compliance violations, and environmental optimization opportunities.

- **Unified data platform** - Integrate emissions data with market intelligence and asset information for comprehensive environmental management.

- **Granular visibility** - Drill-down capabilities from enterprise overview to individual emission measurement devices.

### Automated environmental operations

- **Intelligent alerting** - Real-time notifications for emissions anomalies, compliance violations, and environmental incidents.

- **Automated workflows** - Set up triggers for environmental compliance, carbon credit optimization, and regulatory reporting.

- **Proactive emissions management** - Use predictive models for environmental compliance and sustainability optimization.

- **Dynamic resource allocation** - Enable real-time adjustments to operational strategies, carbon trading, and environmental initiatives.

### Advanced analytics and business intelligence

- **Real-time environmental optimization** - Correlate emissions data with carbon market trends for immediate compliance and cost optimization.

- **Rich BI capabilities** - High granularity business analysis with direct query on real-time emissions data.

- **Natural language processing** - Query complex environmental scenarios using conversational AI.

- **Cross-system correlation** - Link real-time events with historical patterns, market data, and asset information.

### Operational efficiency and environmental optimization  

- **Predictive compliance management** - Reduce regulatory risks and improve sustainability through ML-driven emissions prediction.

- **Environmental optimization** - Maximize operational efficiency and minimize carbon footprint through intelligent forecasting and automation.

- **Sustainability performance** - Enhance environmental stewardship through real-time monitoring and predictive analytics.

- **Cost management** - Optimize environmental costs through predictive carbon credit management and efficient compliance strategies.

## Implementation considerations 

### Data architecture requirements 

- **High-throughput ingestion** - Design your system to process millions of emissions measurement events daily from hundreds of facilities and power plants, with burst capacity during high-activity operational periods.

- **Real-time processing** - Ensure subsecond response times for environmental alerts, under two-second response for compliance updates, and under five-second processing for regulatory calculations.

- **Data quality and validation** - Implement real-time validation for device identification, emissions measurements, market data, and compliance calculations with automatic error correction.

- **Scalability planning** - Design your architecture to handle growing industrial networks with more than 1,000 facilities, seasonal operational variations, and regulatory expansion.

- **Storage requirements** - Plan for 100 TB to 1,000 TB of emissions data per month for large enterprises, with 20-year retention for regulatory compliance, and hot storage for the last 10 years of environmental data.

- **Market integration** - Seamless integration with carbon market systems for real-time pricing and environmental trading optimization.

### Security and compliance

- **Access controls** - Implement role-based access control aligned with environmental responsibilities (facility operators, compliance officers, environmental scientists, regulatory teams), multifactor authentication for all system access, and privileged access management for administrative functions.

- **Audit trails** - Create comprehensive logging for regulatory compliance including all emissions measurements, environmental activities, and regulatory submissions with immutable audit logs and automated compliance reporting.

- **Data privacy** - Ensure compliance with environmental regulations and corporate sustainability requirements for emissions data and environmental information protection.

### Integration points

- **Emissions monitoring systems**: Integrate measurement devices, environmental sensors, and monitoring platforms by using industry-standard APIs and protocols.

- **MQTT carbon market providers**: Integrate carbon trading platforms, regulatory systems, and environmental market data feeds in real time.

- **ERP systems**: Integrate enterprise resource planning, asset management, and financial systems for comprehensive environmental cost tracking.

- **External data sources**: Use APIs for regulatory compliance systems, environmental monitoring services, carbon market feeds, and sustainability reporting platforms.

### Monitoring and observability

**Operational monitoring**:

- **System health dashboards**: Use real-time monitoring of MQTT-Eventstream integration for market data, emissions measurement throughput, and Activator notification delivery with automated alerting for system anomalies.

- **Data quality monitoring**: Continuously validate incoming emissions data with alerting for measurement device failures, sensor communication problems, or corrupted environmental data.

- **Performance metrics**: Track data ingestion latency from emission sources, query response times for real-time dashboards, and ML model prediction accuracy with SLA monitoring.

**Cost optimization**: 

- **Capacity management**: Right-size Fabric capacity based on emissions monitoring network size and data volume. Implement autoscaling for peak operational periods, and cost optimization during low-activity periods.

- **Data lifecycle management**: Automatically archive older emissions data to lower-cost storage tiers. Align retention policies with regulatory requirements, and delete nonessential environmental data.

- **Environmental cost optimization**: Correlate emissions patterns with carbon market trends in real time to minimize compliance costs and maximize environmental efficiency.

## Next steps 

### Getting started

**Phase 1: Foundation setup**

1. Review [Microsoft Fabric Real-Time Intelligence](../overview.md) capabilities and understand capacity requirements for your carbon emissions monitoring scale (hundreds of facilities and measurement devices).

1. Plan your MQTT-[Eventstream](../event-streams/overview.md) integration strategy for emissions measurement data, carbon market feeds, and ERP synchronization. Start with critical data (emissions thresholds, compliance metrics, market prices).

1. Design your real-time analytics implementation in [Eventhouse](../eventhouse.md) for processing emissions events with subsecond latency requirements.

1. Configure [OneLake](../../onelake/onelake-overview.md) for asset metadata and historical emissions data storage with appropriate retention policies.

**Phase 2: Pilot implementation** 

1. Use a regional facility subset (10-25 power plants and facilities) to validate the architecture and MQTT integration performance.

1. Implement core data flows for emissions monitoring, compliance tracking, and basic alerting capabilities.

1. Establish integration with carbon market data providers and ERP systems for real-time environmental contextualization.

1. Deploy Real-Time Dashboard for carbon emissions monitoring with drill-down capabilities from enterprise overview to individual measurement devices.

**Phase 3: Operational validation** 

1. Test system performance during peak operational periods and environmental compliance scenarios.

1. Validate [Activator](../data-activator/activator-introduction.md) rules for environmental team notifications based on emissions anomalies and compliance violations.

1. Ensure compliance with environmental regulations and sustainability reporting standards.

1. Train your environmental teams on dashboard usage, alert management, and drill-down analysis procedures from enterprise to device level.

### Advanced implementation

**Intelligent automation and AI**

- Set up advanced [Data Science](../../data-science/data-science-overview.md) capabilities for building, training, and scoring predictive ML models for emissions spike detection and compliance forecasting.

- Implement [Activator](../data-activator/activator-introduction.md) for sophisticated carbon emissions automation including predictive compliance, dynamic environmental optimization, and automated regulatory reporting.

- Deploy [Copilot](../../fundamentals/copilot-fabric-overview.md) for natural language analytics. Enable your teams to query complex scenarios like "Show me all facilities with predicted emissions violations during next month's operational peak".

- Create intelligent environmental systems that provide real-time decision support based on emissions patterns, market trends, and regulatory requirements.

**Enterprise-scale deployment** 

- Scale to full carbon emissions operations with thousands of measurement devices and centralized monitoring across multiple regions.

- Implement advanced analytics for environmental forecasting, sustainability optimization, and regulatory compliance planning.

- Create comprehensive dashboards with [Power BI](../create-powerbi-report.md) direct query capabilities and [Real-Time Dashboard](../dashboard-real-time-create.md) for executive reporting, environmental monitoring, and regulatory compliance.

- Develop enterprise-grade machine learning models for emissions prediction, sustainability optimization, and environmental expansion planning.

## Related resources

- [Real-Time Intelligence documentation](../overview.md) 
- [Activator for automated alerting](../data-activator/activator-introduction.md) 
- [Eventstreams for real-time data ingestion](../event-streams/overview.md) 
- [Advanced analytics and machine learning](../../data-science/data-science-overview.md) 
- [Microsoft Fabric Real-Time Intelligence capacity planning](../../enterprise/plan-capacity.md) 
- [OneLake data storage overview](../../onelake/onelake-overview.md) 
