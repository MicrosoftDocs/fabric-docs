---
title: Hospital Operations Architecture With Real-Time Intelligence
description: Optimize hospital operations with Microsoft Fabric Real-Time Intelligence—streamline EHR data, monitor patient flow, and enhance resource management.
#customer intent: As a hospital administrator, I want to understand how to implement Microsoft Fabric Real-Time Intelligence for hospital operations so that I can optimize patient flow and resource allocation.
ms.reviewer: bisiadele
ms.author: spelluru
author: spelluru
ms.topic: example-scenario
ms.subservice: rti-core
ms.date: 02/12/2026
ms.search.form: Architecture
---

# Hospital operations reference architecture 

This reference architecture shows how you can use Microsoft Fabric Real-Time Intelligence to build comprehensive hospital operations solutions that handle real-time Electronic Health Records (EHR) data and Admission, Discharge, Transfer (ADT) feeds from multiple healthcare sources. You can process continuous hospital operations data streams and integrate Revenue Cycle Management (RCM) data to enable intelligent patient flow monitoring, operational surge prediction, and automated hospital management optimization. 

You can manage complex hospital operations where EHR systems, patient movement tracking, and revenue cycle management systems continuously generate data on patient encounters, bed occupancy, and operational metrics. The architecture integrates real-time hospital data through Eventstreams processing and maintains comprehensive clinical systems data including lab results, imaging, and medication orders for unified hospital operations intelligence and predictive surge management. 

Unlike traditional batch-based analytics architectures, hospital operations require second-by-second visibility into patient movement, capacity constraints, and care coordination. Delays in detecting bed shortages, admission surges, or discharge bottlenecks can directly impact patient safety, care quality, and financial performance. This architecture emphasizes streaming ingestion, low-latency analytics, and automated activation to support continuous operational decision-making.
 
## Architecture overview  

The hospital operations reference architecture uses Microsoft Fabric Real-Time Intelligence to create a unified platform that processes real-time data from hospital systems and integrates digital twin representations for intelligent operations management. You can implement the architecture with five main operational phases: Ingest and process, Analyze, transform and enrich, Model and contextualize, Train, and Visualize and activate.

:::image type="content" source="./media/hospital-operations.png" alt-text="Diagram showing the reference architecture for hospital operations." lightbox="./media/hospital-operations.png":::

Here are the key steps in the architecture:

1. Real-time Electronic Health Records (EHR) data is ingested from multiple sources and processed through Eventstreams. Admission, Discharge, Transfer (ADT) Feeds supplies real-time updates on patient movements within the hospital.

1. Revenue Cycle Management (RCM) data is ingested from multiple sources and is synced using Data Factory then sent to OneLake.

1. The ingested Eventstream data is sent to Eventhouse for further processing, enabling streaming analytics and anomaly detection.

1. A shortcut is created between Eventhouse to OneLake where the clinical systems including lab results, imaging, and medication orders are captured to enrich patient context.

1. Continuous transformations take place within Eventhouse where Kusto Query Language (KQL) Query queries petabytes of data to detect anomalies like duplicate entries or missing billing codes, flagging them for resolution. 

1. Digital Twin Builder constructs digital representations of hospital operations, including bed occupancy, staffing levels, and patient flow.

1. Build, train, and score ML models in real time, to better predict potential surges and spikes.

1. Hospital administrators use Real-Time Dashboard to visualize customized  live updates of hospital operations. 

1. Activator is used to get real-time alerts on bed occupancy and admission surges, enabling timely adjustments and preventing delays.

1. Power BI dashboards—connected directly to OneLake and Eventhouse—monitors reimbursement cycle times and revenue trends.

1. By using Copilot, analysts can ask natural language questions.

## Operational phases 

### Ingest & process 

Real-time Electronic Health Records (EHR) data is ingested from multiple destinations and processed through [Eventstreams](../event-streams/overview.md). This continuous data integration captures comprehensive hospital operations information including: 

- Patient clinical data and medical histories 

- Treatment plans and care coordination information 

- Medication administration and clinical orders 

- Laboratory results and diagnostic imaging data 

- Provider documentation and care notes 

Admission, Discharge, Transfer (ADT) Feeds supply real-time updates on patient movements within the hospital, enabling immediate tracking of: 

- Patient admissions and registration processing 

- Room assignments and bed occupancy changes 

- Patient transfers between departments and units 

- Discharge planning and patient release coordination 

- Emergency department flow and capacity management 

Revenue Cycle Management (RCM) data is ingested from multiple destinations and is synced using [Data Factory](../../data-factory/data-factory-overview.md) then sent to [OneLake](../../onelake/onelake-overview.md), including: 


- Billing and charge capture information 

- Insurance verification and authorization data 

- Payment processing and reimbursement tracking 

- Financial performance and revenue optimization 

- Compliance and regulatory reporting requirements 

#### **Real-world scenario example**

A major hospital system processes real-time EHR data from thousands of daily patient encounters while ADT feeds track continuous patient movements across emergency departments, inpatient units, and specialty services. Data Factory synchronizes RCM data from billing systems, insurance platforms, and payment processors to provide comprehensive visibility into hospital operations, patient flow, and financial performance for optimal resource allocation and patient care delivery. 


### Analyze, transform, & enrich 

The ingested [Eventstream](../event-streams/overview.md) data is sent to [Eventhouse](../eventhouse.md) for further processing, low-latency streaming analytics, and real-time anomaly detection. This real-time processing enables immediate hospital operations optimization including the following capabilities: 

- **Real-time patient monitoring** enables continuous tracking of patient status, care progression, and clinical events to quickly identify delays, exceptions, or care handoff issues.

- **Operational efficiency analysis** enables the immediate identification of workflow bottlenecks, resource constraints, and process improvements to enhance hospital performance.

- **Quality assurance** enables real-time monitoring of care quality indicators, patient safety metrics, and clinical compliance signals as events occur.

- **Resource optimization** enables dynamic analysis of bed utilization, staff allocation, and equipment availability to support operational decisions during routine operations and surge periods. 

To enrich real-time events with clinical context, a shortcut is created between [Eventhouse](../eventhouse.md) and [OneLake](../../onelake/onelake-overview.md). The shortcut allows Eventhouse queries to access supporting clinical systems data such as laboratory results, diagnostic imaging, and medication orders without duplicating data. This enrichment provides deeper patient context for operational decision-making including the following capabilities:

- **Comprehensive patient care** enables complete integration of clinical data to support holistic patient care coordination and treatment optimization.

- **Clinical decision support** provides real-time access to laboratory results, diagnostic imaging, and medication information to support informed care decisions.

- **Care coordination** enables seamless integration of clinical data across hospital departments and care teams.

- **Outcome analysis** correlates clinical interventions with patient outcomes and quality indicators.

Within [Eventhouse](../eventhouse.md), continuous transformations are applied using KQL to analyze large volumes of real-time and historical data. These transformations detect anomalies such as duplicate records, incomplete clinical events, or missing billing codes, and flag them for resolution. This processing enables the following capabilities: 

- **Data quality management** enables early detection and remediation of data inconsistencies before they impact downstream analytics or reporting.

- **Billing optimization** enables automated detection of missing charges, coding errors, and revenue optimization opportunities.

- **Compliance monitoring** enables continuous assessment of regulatory compliance and documentation requirements.

- **Operational intelligence** provides advanced analytics to support hospital performance optimization and quality improvement.



### Model & contextualize 

Digital Twin Builder constructs digital representations of hospital operations, including bed occupancy, staffing levels, and patient flow. This digital twin modeling provides comprehensive operational context including the following capabilities: 

- **Bed occupancy modeling** enables real-time digital representations of hospital capacity, bed availability, and patient placement to support operational optimization.

- **Staffing level optimization** enables digital modeling of workforce allocation, shift scheduling, and staff-to-patient ratios across hospital departments.

- **Patient flow visualization** provides comprehensive mapping of patient movement patterns, bottlenecks, and operational efficiency opportunities.

- **Resource utilization tracking** enables digital modeling of equipment usage, facility capacity, and operational resource optimization.

- **Operational dependency analysis** enables understanding of interdependencies between hospital departments, services, and patient care workflows.

### Train & score 

Build, train, and score ML models in real time, to better predict potential surges, and spikes using [Data Science](../../data-science/data-science-overview.md) capabilities, including the following capabilities: 

- **Patient surge prediction models** forecast admission volumes, emergency department capacity needs, and seasonal or event-driven demand patterns.

- **Bed occupancy forecasting** predicts bed availability, discharge timing, and capacity trends to support optimal resource allocation.

- **Staffing optimization** predicts staffing requirements based on patient acuity, census levels, and operational demand patterns.

- **Revenue forecasting** predicts financial performance, reimbursement trends, and revenue cycle optimization opportunities.

- **Quality outcome prediction** forecasts patient outcomes, readmission risk, and care quality indicators to support proactive intervention.

### Visualize & Activate 

Hospital administrators use [Real-Time Dashboard](../dashboard-real-time-create.md) to visualize customized live updates of hospital operations, providing the following capabilities: 

- **Operations command center** provides a comprehensive, real-time view of hospital capacity, patient flow, and overall operational status.

- **Department-specific monitoring** provides tailored dashboards for emergency departments, inpatient units, surgical areas, and specialty services.

- **Executive oversight** provides strategic operational metrics and key performance indicators for hospital leadership.

- **Clinical workflow support** delivers real-time information to clinical teams, including patient status, care plans, and resource availability.


[Activator](../data-activator/activator-introduction.md) is used to get real-time alerts on bed occupancy and admission surges, enabling timely adjustments and preventing delays, including the following capabilities: 

- **Capacity management alerts** deliver immediate notifications for changes in bed availability, census thresholds, and capacity constraints.

- **Surge response activation** triggers automated alerts for patient volume spikes that require extra resources and staff activation.

- **Transfer coordination** provides real-time notifications to support patient placement, bed assignments, and inter-facility transfers.

- **Emergency preparedness** triggers automated actions to support disaster response, mass casualty events, and emergency capacity expansion.


[Power BI](../create-powerbi-report.md) dashboards—connected directly to OneLake and Eventhouse—monitor reimbursement cycle times and revenue trends, including the following capabilities: 

- **Financial performance monitoring** tracks revenue cycles, payment processing, and financial optimization metrics across hospital operations.

- **Operational efficiency analysis** analyzes length of stay, resource utilization, and cost optimization opportunities.

- **Quality and safety metrics** monitor patient safety indicators, clinical outcomes, and regulatory compliance.

- **Strategic planning** supports long-term operational planning and performance benchmarking based on hospital analytics.


By using [Copilot](../../fundamentals/copilot-fabric-overview.md), analysts can ask natural language questions, enabling the following capabilities: 


- **Conversational hospital analytics** enables hospital staff to ask natural language questions such as “Show current bed availability in the cardiac unit.”

- **Intuitive operational insights** enable natural language exploration of complex hospital scenarios and operational analysis.

- **Simplified reporting** provides easy access to operational performance information and administrative reporting.

- **Strategic decision support** enables conversational access to hospital intelligence to support operational optimization and planning.



## Technical benefits and outcomes 

This reference architecture delivers measurable operational and financial benefits by applying real-time intelligence to hospital data. By combining streaming ingestion, analytics, predictive modeling, and activation, hospitals can improve situational awareness, automate operational responses, and support data-driven decision-making across clinical, operational, and administrative domains.

The following sections summarize the primary outcomes enabled by this architecture.

### Hospital operations intelligence and optimization 

The architecture provides a unified, real-time view of hospital operations by correlating clinical, operational, and financial data. It enables hospital administrators and operations teams to understand current conditions, anticipate near-term issues, and optimize patient flow and resource utilization across the organization.

- **Real-time operations monitoring** enables continuous monitoring of EHR data, ADT feeds, and patient flow to support timely operational decision-making.

- **Predictive analytics** uses machine learning models to forecast patient surges and optimize hospital resource allocation.

- **Digital twin modeling** creates comprehensive digital representations of hospital operations to support optimization and operational planning.

- **Unified hospital platform** integrates EHR, ADT, and RCM data with clinical systems to provide comprehensive hospital operations intelligence.

### Automated hospital operations 

In addition to monitoring and analytics, the architecture supports event-driven automation that reduces manual intervention and response time. Operational signals are continuously evaluated, allowing hospitals to trigger alerts and coordinated actions when defined conditions or thresholds are met.

- **Intelligent operational alerts** provide real-time notifications for bed occupancy changes, admission surges, and capacity management conditions.

- **Automated workflow optimization** enables event-driven triggers for patient placement, staff allocation, and resource coordination.

- **Proactive capacity management** uses predictive models to support surge response and improve operational efficiency.

- **Dynamic resource allocation** enables real-time adjustments to staffing, bed management, and facility operations.


### Advanced analytics and business intelligence 

The architecture supports both real-time and historical analysis by integrating streaming operational data with persisted hospital and financial datasets. It enables deeper insight across departments and simplifies access to analytics for both technical and nontechnical users.

- **Real-time hospital analytics** correlates patient data with operational information to support immediate optimization and quality improvement.

- **Cross-departmental intelligence** provides business intelligence reporting with comprehensive analysis across clinical and operational areas.

- **Natural language processing** enables querying of complex hospital scenarios using conversational AI and intuitive interfaces.

- **Predictive and historical analysis** combines real-time events with historical patterns to support effective hospital operations management.


### Cost optimization and operational efficiency

By aligning real-time operational insight with predictive analytics, the architecture helps hospitals manage costs while maintaining care quality. Financial, operational, and capacity signals are evaluated together to support more efficient use of resources and improved reimbursement outcomes.

- **Predictive cost management** uses predictive analytics to reduce operational costs and improve resource utilization through ML‑driven surge prediction and optimization.

- **Revenue cycle efficiency** improves reimbursement outcomes and reduces billing errors through predictive analytics and real‑time monitoring.

- **Operational optimization** enhances hospital efficiency and patient care through predictive analytics and automated workflow management.

- **Strategic decision support** enables data‑driven decisions for capacity planning, resource allocation, and operational improvements.


## Implementation considerations  

When implementing a real-time hospital operations architecture, it's important to consider data scale, performance, security, and operational reliability. Hospital environments introduce unique requirements around latency, compliance, and system resilience that must be addressed early to ensure the solution remains dependable during both normal operations and surge conditions.

The following considerations highlight key areas to evaluate when planning and operating this architecture.

### Data architecture requirements 

Hospital operations generate large volumes of high‑frequency clinical and operational events that must be processed reliably and with minimal latency. The architecture must support continuous ingestion, real-time analytics, and long-term data retention while maintaining accuracy and consistency across systems.

Key data architecture considerations include throughput, latency, data quality, scalability, and seamless integration with existing clinical platforms.

- **High-throughput ingestion** supports processing of real-time EHR data, ADT feeds, and RCM data from multiple healthcare destinations, including burst capacity during surge periods.

- **Real-time processing** ensures low-latency responses for critical operational alerts, subsecond updates for capacity metrics, and timely processing for surge prediction scenarios.

- **Data quality and validation** enables real-time validation of patient identification, clinical data accuracy, billing information, and operational calculations with automated error correction.

- **Scalability planning** ensures the architecture can support growing hospital networks with increasing patient volumes, clinical complexity, and operational requirements.

- **Storage requirements** support retention of real-time events, historical clinical records, and operational analytics data using appropriate storage and retention policies.

- **Clinical systems integration** enables seamless integration with EHR systems, clinical platforms, and hospital information systems.


### Security and compliance 

Hospital operations data includes sensitive patient and clinical information that's subject to strict regulatory controls. The architecture must enforce strong security boundaries, maintain auditable access records, and protect patient privacy across all data flows and operational processes.

Security and compliance design should account for healthcare regulations, hospital role separation, and ongoing audit requirements.

- **Access controls** implement role-based access control aligned with hospital responsibilities, enforce multifactor authentication for all system access, and apply privileged access management for administrative functions.

- **Audit trails** create comprehensive logging for compliance, including all patient data access, clinical activities, and operational events, using immutable audit logs and automated compliance reporting.

- **Data privacy** ensures compliance with HIPAA, healthcare regulations, and patient privacy requirements for protecting EHR data and hospital operations information.


### Integration points 

This architecture depends on reliable integration with multiple clinical, operational, and external systems. Defining clear integration points ensures that real-time and contextual data can be ingested, enriched, and analyzed without disrupting existing hospital workflows.

Integration planning should address both internal clinical platforms and external data providers.


- **EHR systems** integrate with electronic health record platforms to ingest clinical data and patient care information.

- **ADT systems** integrate in real time with admission, discharge, and transfer systems to support patient movement tracking.

- **RCM platforms** integrate with revenue cycle management systems to ingest billing, financial, and reimbursement data.

- **Clinical systems** integrate with laboratory, imaging, pharmacy, and other clinical platforms to support comprehensive patient care.

- **External data sources** integrate through APIs with insurance providers, regulatory systems, and healthcare information exchanges.


### Monitoring and observability  

Continuous monitoring and observability are essential for maintaining system reliability and operational trust. Hospitals must be able to detect ingestion failures, latency issues, and data quality problems quickly to prevent downstream operational impact.

Monitoring should also include cost awareness to ensure the system remains efficient as data volumes and usage patterns change.

**Operational monitoring**: 
Operational monitoring focuses on the health, performance, and reliability of real-time data processing and analytics components.

- **System health dashboards** provide real-time monitoring of EHR data ingestion, ADT feed processing, and Eventhouse analytics, with automated alerting for system anomalies.

- **Data quality monitoring** enables continuous validation of incoming hospital data, with alerts for system communication failures, invalid clinical data, or corrupted operational information.

- **Performance metrics** track data ingestion latency from hospital systems, query response times for real-time dashboards, and machine learning model prediction accuracy against defined service-level agreements (SLAs).

**Cost optimization**: 
Cost optimization focuses on managing resource usage and operational costs while meeting performance and regulatory requirements.

- **Capacity management** supports right-sizing of Fabric capacity based on hospital network size and data volume, including autoscaling during surge periods and cost optimization during low-activity windows.

- **Data lifecycle management** enables automated archival of older hospital data to lower-cost storage tiers, applies retention policies aligned with regulatory requirements, and removes nonessential operational data.

- **Operations cost optimization** correlates hospital performance patterns with operational costs in real time to minimize expenses and maximize efficiency.


## Next steps  

Once the reference architecture is understood, the next step is to move from design to implementation in a controlled and scalable way. A phased approach helps hospitals validate real-time data flows, operational analytics, and alerting mechanisms while minimizing risk to clinical operations.

The following guidance outlines how to get started, validate the architecture, and prepare for broader deployment.

### Getting started  

Getting started with this architecture involves establishing the core real-time data foundation, validating integration points, and incrementally introducing operational intelligence capabilities. The recommended approach focuses on building confidence early through targeted pilots before expanding to full hospital or network-wide deployment.

**Phase 1: Foundation setup**  

The foundation setup phase focuses on establishing the core real-time data platform for hospital operations. During this phase, organizations assess platform capabilities, plan ingestion and analytics architecture, and prepare shared storage for clinical and operational data. The goal is to ensure that real-time processing, scalability, and data retention requirements are clearly defined before introducing operational workloads.

- Review [Microsoft Fabric Real-Time Intelligence](../overview.md) capabilities and understand capacity requirements for your hospital operations scale, including EHR systems, patient volumes, and overall operational complexity.

- Plan your [Eventstream](../event-streams/overview.md) integration strategy for EHR data and ADT feeds, starting with critical clinical areas and high-volume patient services.

- Design your real-time analytics implementation in [Eventhouse](../eventhouse.md) to process hospital events that have immediate response requirements.

- Configure [OneLake](../../onelake/onelake-overview.md) for clinical systems data and historical hospital analytics, with appropriate data retention policies.


**Phase 2: Pilot implementation**  

The pilot implementation phase validates the architecture in a controlled environment by applying it to a limited set of hospital departments or clinical areas. This phase emphasizes verifying data integration, analytics accuracy, dashboard usability, and alerting behavior while minimizing risk to day‑to‑day operations. Successful pilots help build confidence before scaling to broader hospital workflows.

- Start with a subset of hospital departments and clinical areas to validate the reference architecture, data integration, and overall system performance.

- Implement core data flows that support patient monitoring, operational tracking, and basic alerting capabilities.

- Establish integration with EHR, ADT, and clinical systems to provide comprehensive visibility into hospital operations.

- Deploy the Real-Time Dashboard to support operations monitoring, with customized live updates tailored to different hospital roles.


**Phase 3: Operational validation**  

The operational validation phase ensures that the architecture performs reliably under real-world conditions, including peak demand and surge scenarios. This phase focuses on stress testing, alert validation, compliance verification, and user readiness. The objective is to confirm that real-time insights and automated responses behave predictably, securely, and in alignment with hospital response procedures.

- Test system performance during peak patient volume periods and across operational surge scenarios to validate ingestion, analytics, and alerting behavior under high demand.

- Validate [Activator](../data-activator/activator-introduction.md) rules for capacity alerts and surge management to ensure alerts are timely, actionable, and aligned with hospital response procedures.

- Ensure compliance with HIPAA regulations and hospital operational standards across data ingestion, processing, and access workflows.

- Train hospital teams on dashboard usage, alert management, and natural language analytics to support effective operational optimization and decision-making.


### Advanced implementation  

Advanced implementation focuses on extending the foundational and pilot architecture to support intelligent automation, predictive capabilities, and enterprise‑level scale. At this stage, hospitals apply advanced analytics, machine learning, and automation to improve responsiveness, optimize operations, and enable broader organizational adoption across facilities and departments.

The following sections describe how to introduce advanced intelligence and scale the solution across a hospital network.

#### Intelligent automation and AI

This phase emphasizes the use of machine learning and automation to move from reactive operations to predictive and proactive management. By combining real-time data with advanced analytics, hospitals can anticipate demand, automate operational responses, and provide decision support to clinical and administrative teams.

These capabilities enable hospitals to respond more effectively to changing conditions while reducing manual intervention and operational delays.

- Set up advanced [data science](../../data-science/data-science-overview.md) capabilities to build, train, and score predictive machine learning models for surge forecasting and hospital operations optimization.

- Implement [Activator](../data-activator/activator-introduction.md) to enable sophisticated hospital automation scenarios, including predictive capacity management, dynamic resource allocation, and automated surge response.

- Deploy [Copilot](../../fundamentals/copilot-fabric-overview.md) to support natural language analytics, enabling hospital teams to query complex operational scenarios using conversational interfaces.

- Create intelligent hospital operations systems that provide real-time decision support based on patient data, operational performance, and predictive analytics.

#### Enterprise-scale deployment  

Enterprise-scale deployment focuses on extending the architecture beyond individual departments or facilities to support hospital networks and multi-site operations. This phase emphasizes centralized visibility, consistent analytics, and scalable governance to ensure reliable performance across the organization.

The goal of this phase is to standardize operations intelligence, support executive oversight, and enable long-term planning at the system or network level.

- Scale to full hospital network operations with comprehensive clinical coverage and centralized monitoring across all facilities and departments.

- Implement advanced analytics to support cross-facility operational optimization, quality management, and performance analysis.

- Create comprehensive dashboards using [Power BI](../create-powerbi-report.md) direct query capabilities and [real-time dashboards](../dashboard-real-time-create.md) to support executive reporting, operational monitoring, and regulatory compliance.

- Develop enterprise-grade machine learning models to support patient outcome prediction, operational optimization, and hospital network expansion planning.


## Related resources  

- [Real-Time Intelligence documentation](../overview.md) 

- [Activator for automated alerting](../data-activator/activator-introduction.md) 

- [Eventstreams for real-time data ingestion](../event-streams/overview.md) 

- [Healthcare data analytics with Microsoft Fabric](../overview.md) 

- [Advanced analytics and machine learning](../../data-science/data-science-overview.md) 

- [Microsoft Fabric Real-Time Intelligence capacity planning](../../enterprise/plan-capacity.md) 

- [OneLake data storage overview](../../onelake/onelake-overview.md) 

- [Data Factory for data integration](../../data-factory/data-factory-overview.md) 

 