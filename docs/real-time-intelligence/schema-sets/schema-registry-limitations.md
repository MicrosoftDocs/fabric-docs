---
title: Event Schema Registry limitations
description: Learn about limitations of Event Schema Registry in Microsoft Fabric.
author: spelluru
contributors: 
ms.topic: overview
ms.date: 07/24/2025
ms.author: spelluru
ms.reviewer: spelluru
---

# Schema Registry - known limitations
As Schema Registry in Fabric Real-Time Intelligence (RTI) is currently in public preview. This article provides some important limitations to be aware of. 

## Limitations
- You can't enable schema mode on existing eventstreams Schema support must be enabled when the Eventstream is created and can't be unset after creation. You can't retroactively add schema registration to an existing eventstream. To use registered schemas, you need to create a new Eventstream. You can't combine schema-enabled sources with nonschema sources in the same Eventstream 
- You can't combine schema-enabled sources with nonschema sources in the same Eventstream
- A limited set of input sources are supported. During public preview, schema registration is only available for these input sources: 
    - Custom Endpoint 
    - Azure Event Hubs 
    - Azure SQL Change Data Capture (CDC) 
- A limited set of destinations are supported. Today, schema-validated events can only be written to: 
    - Eventhouse (Push Mode) 
    - Custom App 
    - Derived Stream (another Eventstream) 
- No Schema Compatibility Enforcement. Schema compatibility isn't currently enforced. This means you can make changes to a schema that might break your pipelines. For now, you're responsible for ensuring schema updates don't negatively impact your data flows. 
- Only Avro Schema Format is Supported. Schema definitions can only be created using Avro schema format. Support for other schema formats may be added in the future. 
- What Happens to Non-Conforming Events? When schema validation is enabled in Fabric Real-Time Intelligence (RTI), only events that conform to the registered schema are allowed to pass through. Events that don't match the expected schema—also called nonconforming events—are dropped by the system to preserve data quality and integrity. 

    During public preview, these nonconforming events are not routed to a separate stream or storage location. Instead, errors related to dropped events are logged in Fabric Diagnostics, where you can monitor and investigate issues that arise. 

    We recommend regularly monitoring Fabric Diagnostics to track validation issues and ensure that incoming events meet the schema requirements you've defined. 


## Related content
[Schema Registry (preview)](schema-registry-overview.md)