---
title: Supportability - Best Practices for partners
description: Guide for partners to support their customers on Fabric.
ms.topic: concept-article
ms.date: 07/03/2024
---

# Supportability: Best Practices for partners

This document provides guidance for Fabric's partners on how to support their customers. It covers best practices for maintaining, saving, and correlating important request headers, as well as recommendations for logging, monitoring, and support.

## Overview

Fabric enables third-party partners to integrate their services into the platform using the Fabric Development Kit. This document outlines the supportability practices that partners should follow to ensure effective troubleshooting and customer support.

## Request Headers

Fabric exposes two important headers in [requests](/rest/api/fabric/workload/workloadapi/item-lifecycle/create-item?tabs=HTTP) made between the customer and Fabric, which are crucial for supportability:

- **ActivityId**: A globally unique ID that can be used by you, the developer, to correlate the request with your systems when a Fabric user interacts with your workload.
- **RequestId**: A globally unique ID that helps us (Fabric) to correlate your request with our traces, which will help us investigate the issue and assist you. If you cannot determine the issue on your end using the `ActivityId`, you can provide the `RequestId` to us when reporting an issue. Ensure that you maintain and save the `RequestId` so it can be easily provided later.

## Best Practices for Supportability

To effectively support your customers, it is essential to maintain, save, and correlate these IDs. Here are some best practices:

### 1. Logging

- **Retention of Logs**: Ensure that logs are retained for a sufficient period to allow for effective troubleshooting.
- **Detailed Logging**: Include the `ActivityId` and `RequestId` in all relevant log entries. This will help you trace the flow of a request through your system.

### 2. Monitoring

- **Real-time Monitoring**: Implement real-time monitoring to detect and alert on issues as they occur. This includes monitoring request rates, error rates, and system performance.
- **Correlation with Headers**: Ensure that your monitoring tools can correlate logs and metrics using the `ActivityId` and `RequestId`. This will help you quickly identify and diagnose issues.

### 3. Support

- **Customer Support**: Train your support team to ask for the `ActivityId` and `RequestId` when dealing with customer issues. This will expedite the troubleshooting process.
- **Documentation**: Provide clear documentation to your customers on how to obtain and use these IDs when reporting issues.

## Example Workflow

1. **Log Entry**: When a request is received, log the `ActivityId` and `RequestId` along with other relevant information.
2. **Monitor**: Use monitoring tools to track the request in real time, correlating with the IDs.
3. **Troubleshoot**: If an issue arises, use the `ActivityId` and `RequestId` to trace the request through your logs and systems.
4. **Support**: When a customer reports an issue, ask for the `ActivityId` and `RequestId` to quickly locate the relevant logs and provide assistance. If the issue cannot be determined on your end, provide the `RequestId` to Fabric support for further investigation.

## Conclusion

By following these best practices, partners can effectively support their customers on the Fabric data platform, ensuring a seamless and efficient troubleshooting process. Proper logging, monitoring, request management, and support protocols are essential to maintaining high service quality and customer satisfaction.
