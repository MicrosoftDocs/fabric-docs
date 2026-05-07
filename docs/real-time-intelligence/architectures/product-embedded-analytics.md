---
title: Product Analytics Architecture with Real-Time Intelligence
description: Build robust product embedded analytics solutions with Microsoft Fabric Real-Time Intelligence for real-time IoT monitoring, insights, and device analytics.
#customer intent: As an IoT solutions architect, I want to design a scalable product embedded analytics system using Microsoft Fabric Real-Time Intelligence so that I can process millions of IoT events daily with low latency.
ms.topic: example-scenario
ms.date: 02/12/2026
---

# Product embedded analytics reference architecture

Product embedded analytics enables manufacturers and service providers to deliver real-time insights directly within their products, giving customers immediate visibility into equipment performance and operational health. This approach transforms products from simple devices into intelligent, connected solutions that continuously deliver value through data-driven insights.

This reference architecture demonstrates how you can use Microsoft Fabric Real-Time Intelligence to build comprehensive product embedded analytics solutions that handle millions of IoT events daily from customer factory floors with low latency at high scale. You can process streaming device data and integrate full asset metadata and hierarchy from manufacturer libraries to enable customized analytics experiences and real-time insights for each customer.

The architecture supports complex multitenant analytics operations where devices from customer factory floors continuously generate IoT events. These events provide real-time visibility into equipment performance, operational status, and device health. The architecture integrates daily collected asset metadata through Data Factory and maintains comprehensive device hierarchies stored in OneLake for unified customer analytics experiences.

## Architecture overview

The product embedded analytics reference architecture uses Microsoft Fabric Real-Time Intelligence to create a unified platform that processes real-time data from customer devices and integrates manufacturer asset metadata for intelligent multitenant analytics management.

The following diagram shows the key components and data flows in this architecture. You can implement the architecture with four main operational phases, each building on the previous to deliver comprehensive embedded analytics capabilities: Ingest and process, Analyze and transform, Train, Visualize and activate.

:::image type="content" source="./media/product-embedded-analytics.png" alt-text="Diagram showing the reference architecture for product embedded analytics." lightbox="./media/product-embedded-analytics.png":::

The numbered steps in the diagram correspond to the following data flow:

1. Devices from customer factory floors natively generate and stream millions of IoT events daily to Eventstream, providing low latency at high scale.

1. Full asset metadata and hierarchy are collected daily from manufacturer libraries using Data Factory and stored in OneLake.

1. Streamed events are aggregated and enriched in real time with relevant asset metadata, providing multiple curated views ready for use.

1. Hourly and daily aggregations are created on the fly per customer, factory, and device for easy consumption and long-term retention.

1. Advanced ML models are trained and scored in real time using Data Science capabilities.

1. Real-Time Dashboards provide unique, customized high-granularity experiences for each customer.

1. Activator generates real-time notifications and insights per device per customer.

1. Power BI reports provide rich analytics directly on the real-time data.

1. Custom applications give end customers a dedicated view of their devices in real time.


## Operational phases

This section describes each operational phase in detail, explaining the data flows, processing steps, and capabilities enabled at each stage of the product embedded analytics pipeline.

### Ingest & process

In this phase, devices from the customer factory floor natively generate and stream millions of IoT events daily to [Eventstream](../event-streams/overview.md), providing low latency at high scale. This continuous data stream captures real-time device performance, operational metrics, and equipment health indicators across multiple customer environments for immediate processing and analysis.

Full asset metadata and hierarchy are collected daily from the manufacturer libraries using [Data Factory](../../data-factory/data-factory-overview.md) and stored in [OneLake](../../onelake/onelake-overview.md). This metadata enables comprehensive device contextualization, including the following types of information:

- Equipment specifications and performance baselines define the expected operating parameters for each device type.

- Asset hierarchies and device relationships map the connections between equipment in customer environments.

- Manufacturer documentation and operational parameters provide reference information for device operation.

- Device configuration and capability information describe the features and settings for each device.

- Customer-specific deployment and usage patterns capture how each customer uses their equipment.

**Real-world scenario example**: An industrial equipment manufacturer processes millions of IoT events daily from customer-deployed machinery across hundreds of factories worldwide. Data Factory collects comprehensive asset metadata from manufacturer libraries including equipment specifications, maintenance procedures, and performance baselines, while Eventstream captures real-time operational data from pumps, compressors, and production equipment providing immediate visibility into customer equipment performance and health status.

### Analyze & transform

In this phase, streamed events are aggregated and enriched in real time with the relevant asset metadata, providing multiple curated views ready for use. This real-time enrichment process combines streaming IoT data with the following contextual information:

- Equipment specifications and operational parameters define expected behavior and performance ranges.

- Asset hierarchy and device relationships show how equipment is connected and interdependent.

- Customer-specific configuration and deployment context captures unique customer requirements.

- Manufacturer recommendations and performance baselines provide benchmarks for comparison.

- Historical performance patterns and usage analytics enable trend identification.

Hourly and daily aggregations are created on the fly per customer, factory, and device for easy consumption and long-term retention. These aggregations enable the following capabilities:

- **Real-time device monitoring**: You can immediately track equipment performance and operational status across customer environments.

- **Customer-specific analytics**: The system provides tailored insights and metrics based on individual customer deployments and usage patterns.

- **Historical analysis**: Trend analysis and pattern recognition support performance optimization and predictive insights.

- **Multi-tenant data isolation**: Secure data segregation ensures customized analytics experiences for each customer.

### Train

In this phase, advanced ML models are trained and scored in real time using [Data Science](../../data-science/data-science-overview.md) capabilities. These models provide the following predictive capabilities:

- **Device performance prediction models**: These models forecast equipment performance and optimize operational parameters based on real-time data and historical patterns.

- **Customer usage analytics**: These models predict usage patterns and equipment utilization for capacity planning and optimization.

- **Anomaly detection**: These models anticipate device anomalies and performance deviations before they impact customer operations.

- **Predictive maintenance**: These models forecast maintenance needs and optimize service schedules based on device health indicators.

- **Customer behavior modeling**: These models help you understand customer usage patterns and preferences for product improvement and service optimization.

### Visualize & Activate

In this phase, you bring together visualization, notifications, and custom applications to deliver the embedded analytics experience to customers.

[Real-Time Dashboard](../dashboard-real-time-create.md) enables you to easily create unique customized high granularity experiences for each customer. The dashboards provide the following capabilities:

- **Customer-specific dashboards**: Tailored analytics experiences show only relevant devices and metrics for each customer environment.

- **High granularity monitoring**: Detailed device-level insights include real-time performance indicators and health status.

- **Interactive drill-down**: Users can navigate from customer overview to individual device details with contextual analytics.

- **Customizable visualizations**: Flexible dashboard configurations align with customer-specific requirements and preferences.

[Activator](../data-activator/activator-introduction.md) generates real-time notifications and insights per device per customer. These notifications enable the following scenarios:

- **Customer-specific alerting**: Targeted notifications inform customers about device issues, performance optimization, and maintenance needs.

- **Device-level insights**: Granular alerts and recommendations address specific equipment based on real-time performance and predictive analytics.

- **Automated customer communication**: Proactive notifications and insights are delivered directly to customer systems and personnel.

- **Service optimization**: Real-time triggers initiate maintenance dispatch, technical support, and performance optimization services.

[Power BI](../create-powerbi-report.md) reports provide rich analytics directly on the real-time data. These reports include the following capabilities:

- **Customer analytics**: Comprehensive reporting covers device performance, usage patterns, and operational efficiency for individual customers.

- **Fleet management**: Cross-customer analytics and benchmarking maintain data privacy and security.

- **Performance optimization**: Detailed analysis examines equipment efficiency, utilization, and improvement opportunities.

- **Business intelligence**: Strategic insights support product development, service optimization, and customer success.

Custom applications provide end customers with a dedicated view of their devices in real time. These applications offer the following features:

- **Branded customer portal**: Custom-branded applications provide customers with dedicated access to their device data and analytics.

- **Real-time device monitoring**: Live monitoring capabilities show current device status, performance metrics, and operational insights.

- **Self-service analytics**: Customers can explore their data, create custom reports, and access historical trends.

- **Mobile accessibility**: Responsive design supports access from mobile devices and various platforms for field operations.

## Technical benefits and outcomes

Implementing this product embedded analytics architecture delivers measurable benefits across several key areas. This section describes the outcomes you can expect in each area.

### Product embedded analytics intelligence

The architecture provides comprehensive intelligence capabilities for delivering customer value:

- **Real-time customer insights**: You can monitor millions of IoT events daily with low latency at high scale for immediate customer value delivery.

- **Customized analytics experiences**: The platform provides unique, tailored dashboards and insights for each customer based on their specific device deployments.

- **Multi-tenant architecture**: Secure data isolation and customized experiences serve multiple customers while maintaining operational efficiency.

- **Comprehensive device visibility**: Full asset metadata integration provides complete context for customer equipment and operations.

### Automated customer operations

The architecture automates key customer-facing operations to improve service delivery:

- **Intelligent customer alerting**: Real-time notifications and insights per device per customer enable proactive support and optimization.

- **Automated service delivery**: You can set up triggers for maintenance dispatch, technical support, and performance optimization based on device analytics.

- **Proactive customer engagement**: Predictive models support customer success, equipment optimization, and service recommendations.

- **Dynamic resource allocation**: Real-time adjustments optimize support services, maintenance activities, and customer success initiatives.

### Advanced analytics and business intelligence

The architecture provides powerful analytics capabilities for data-driven decision making:

- **Real-time embedded analytics**: You can correlate IoT data with asset metadata for immediate customer insights and value delivery.

- **Cross-customer intelligence**: Aggregate insights across your customer base while maintaining privacy for product improvement and benchmarking.

- **Natural language processing**: Customers can query their data using conversational AI and intuitive interfaces.

- **Predictive and historical analysis**: The platform combines real-time events with historical patterns for optimal equipment performance and customer success.

### Customer success and product optimization

The architecture helps drive customer success and continuous product improvement:

- **Enhanced customer value**: Embedded analytics and custom applications deliver immediate insights and optimization recommendations.

- **Product intelligence**: Aggregate customer data supports product improvement, feature development, and market insights.

- **Service optimization**: Data-driven insights optimize support services, maintenance scheduling, and customer engagement.

- **Competitive advantage**: Advanced analytics and real-time insights embedded in products provide differentiated customer experiences.

## Implementation considerations

When implementing this product embedded analytics architecture, consider the following requirements and best practices to ensure a successful deployment.

### Data architecture requirements

Design your data architecture to handle the volume and velocity of multitenant IoT data:

- **High-throughput ingestion**: Design your system to process millions of IoT events daily from customer factory floors with burst capacity during peak operational periods.

- **Real-time processing**: Ensure low latency at high scale for customer value delivery, under one-second response for critical device alerts, and immediate processing for customer notifications.

- **Data quality and validation**: Implement real-time validation for device identification, customer data segregation, asset metadata accuracy, and analytics calculations with automatic error correction.

- **Multi-tenant scalability**: Design your architecture to handle a growing customer base with expanding device networks, diverse deployment scenarios, and varying data volumes per customer.

- **Storage requirements**: Plan for comprehensive customer data including real-time events, historical analytics, and asset metadata with customer-specific retention policies and data sovereignty requirements.

- **Asset metadata integration**: Configure seamless daily collection from manufacturer libraries with automated updates and version management.

### Security and compliance

Implement appropriate security controls and compliance measures for your multitenant solution:

- **Access controls**: Implement role-based access control aligned with customer boundaries and user responsibilities. Configure multifactor authentication for all system access and privileged access management for administrative functions.

- **Audit trails**: Create comprehensive logging for compliance, including all customer data access, device activities, and analytics operations. Use immutable audit logs and automated compliance reporting.

- **Data privacy**: Ensure compliance with data protection regulations and customer requirements for IoT data privacy, cross-border data transfer, and data residency requirements.

### Integration points

Plan for integration with the following systems and data sources:

- **Customer IoT systems**: Configure native integration with customer factory floor devices, IoT gateways, and existing monitoring systems for seamless data collection.

- **Manufacturer libraries**: Set up daily integration with asset metadata repositories, product documentation, and manufacturer knowledge bases.

- **Customer applications**: Provide APIs and software development kits (SDKs) for embedding analytics into customer workflows, dashboards, and existing business applications.

- **External data sources**: Integrate with third-party systems including customer Enterprise Resource Planning (ERP), maintenance management, and operational technology platforms.

### Monitoring and observability

Implement comprehensive monitoring to ensure system reliability and optimize customer experiences.

**Operational monitoring**

Set up the following monitoring capabilities to track system health:

- **System health dashboards**: Configure real-time monitoring of Eventstream ingestion for customer devices, Data Factory metadata collection, and Activator notification delivery with automated alerting for system anomalies.

- **Data quality monitoring**: Implement continuous validation of incoming customer data with alerting for device communication failures, invalid sensor readings, or corrupted analytics data.

- **Performance metrics**: Track data ingestion latency from customer devices, query response times for customer dashboards, and ML model prediction accuracy with SLA monitoring per customer.

**Customer success optimization**

Implement the following practices to maximize customer value:

- **Capacity management**: Right-size Fabric capacity based on customer growth and data volume. Implement autoscaling for peak usage periods and cost optimization during low-activity windows.

- **Data lifecycle management**: Configure automated archival of older customer data to lower-cost storage tiers. Set retention policies aligned with customer requirements and delete data per customer specifications.

- **Customer analytics optimization**: Use real-time correlation of device performance patterns with customer usage to maximize customer value delivery and optimize embedded analytics experiences.

## Next steps

Follow this phased approach to implement the product embedded analytics architecture for your organization.

### Getting started

Begin with these foundational phases to establish your embedded analytics solution.

**Phase 1: Foundation setup**

Complete the following tasks to prepare your environment:

- Review [Microsoft Fabric Real-Time Intelligence](../overview.md) capabilities and understand capacity requirements for your product embedded analytics scale (customer devices and multitenant operations).

- Plan your [Eventstream](../event-streams/overview.md) integration strategy for customer IoT data ingestion. Start with pilot customers and critical device types for validation.

- Design your real-time analytics implementation in [Eventhouse](../eventhouse.md) for processing customer events with low latency at high scale.

- Configure [OneLake](../../onelake/onelake-overview.md) for asset metadata and customer data storage with appropriate multitenant isolation and retention policies.

**Phase 2: Pilot implementation**

Validate the architecture with a limited scope before full deployment:

- Start with a subset of pilot customers and device types to validate the architecture and multitenant data processing.

- Implement core data flows for customer device monitoring, analytics generation, and basic notification capabilities.

- Establish integration with manufacturer libraries and customer systems for comprehensive asset metadata and contextualization.

- Deploy Real-Time Dashboard for customer-specific monitoring with high granularity customized experiences.

**Phase 3: Customer validation**

Test and validate the solution before expanding to full production:

- Test system performance during peak customer usage periods and high-volume data processing.

- Validate [Activator](../data-activator/activator-introduction.md) rules for customer-specific notifications and insights per device.

- Ensure compliance with data protection regulations and customer-specific security requirements.

- Train your customer success teams on dashboard usage, analytics interpretation, and customer engagement based on embedded insights.

### Advanced implementation

After completing the foundation phases, expand your solution with advanced capabilities.

**Intelligent automation and AI**

Enhance your solution with AI-powered automation:

- Set up advanced [Data Science](../../data-science/data-science-overview.md) capabilities for building, training, and scoring predictive ML models for customer device optimization and service automation.

- Implement [Activator](../data-activator/activator-introduction.md) for sophisticated customer automation including proactive support, predictive maintenance, and automated service delivery.

- Deploy [Copilot](../../fundamentals/copilot-fabric-overview.md) for natural language analytics enabling customers to query their data using conversational interfaces.

- Create intelligent customer applications that provide real-time decision support based on device performance, usage patterns, and predictive analytics.

**Enterprise-scale deployment**

Scale your solution across your full customer base:

- Scale to your full customer base with comprehensive device coverage and centralized multitenant analytics across diverse customer environments.

- Implement advanced analytics for cross-customer insights, product optimization, and service improvement while maintaining customer data privacy.

- Create comprehensive embedded analytics with [Power BI](../create-powerbi-report.md) direct query capabilities and custom customer applications for dedicated device views.

- Develop enterprise-grade machine learning models for customer success, product intelligence, and service optimization.

## Related resources

Explore the following resources to learn more about the components and capabilities used in this architecture:

- [Real-Time Intelligence documentation](../overview.md)

- [Activator for automated alerting](../data-activator/activator-introduction.md)

- [Eventstreams for real-time data ingestion](../event-streams/overview.md)

- [IoT and sensor data analytics with Microsoft Fabric](../overview.md)

- [Advanced analytics and machine learning](../../data-science/data-science-overview.md)
