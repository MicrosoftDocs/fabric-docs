---
title: Tutorial - Supportability Best Practices
description: Learn supportability best practices for your Fabric Extensibility Toolkit workload to ensure effective troubleshooting and customer support.
ms.reviewer: gesaur
ms.topic: tutorial
ms.date: 12/15/2025
---

# Supportability best practices

This tutorial provides guidance for Fabric Extensibility Toolkit developers on how to support their customers. It covers best practices for maintaining, saving, and correlating important request headers, as well as recommendations for logging, monitoring, and support.

## Overview

The Fabric Extensibility Toolkit enables developers to create workloads that integrate seamlessly with the Microsoft Fabric platform. This document outlines the supportability practices that developers should follow to ensure effective troubleshooting and customer support.

## Request Headers

Fabric exposes two important headers in requests made between customers and Fabric, which are crucial for supportability:

- **ActivityId**: A globally unique ID that can be used by you, the developer, to correlate the request with your systems when a Fabric user interacts with your workload.
- **RequestId**: A globally unique ID that helps Fabric to correlate your request with platform traces, which will help investigate issues and provide assistance. If you cannot determine the issue on your end using the `ActivityId`, you can provide the `RequestId` to Fabric support when reporting an issue. Ensure that you maintain and save the `RequestId` so it can be easily provided later.

## Best Practices for Supportability

To effectively support your customers, it is essential to maintain, save, and correlate these IDs. Here are some best practices:

### 1. Logging

- **Retention of Logs**: Ensure that logs are retained for a sufficient period to allow for effective troubleshooting.
- **Detailed Logging**: Include the `ActivityId` and `RequestId` in all relevant log entries. This will help you trace the flow of a request through your system.
- **Application Insights Integration**: For Azure-hosted workloads, consider integrating with [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview) to automatically capture telemetry and correlation IDs.

### 2. Monitoring

- **Real-time Monitoring**: Implement real-time monitoring to detect and alert on issues as they occur. This includes monitoring request rates, error rates, and system performance.
- **Correlation with Headers**: Ensure that your monitoring tools can correlate logs and metrics using the `ActivityId` and `RequestId`. This will help you quickly identify and diagnose issues.
- **Azure Monitor**: Consider using [Azure Monitor](/azure/azure-monitor/overview) for comprehensive monitoring and alerting capabilities.

### 3. Support

- **Customer Support**: Train your support team to ask for the `ActivityId` and `RequestId` when dealing with customer issues. This will expedite the troubleshooting process.
- **Documentation**: Provide clear documentation to your customers on how to obtain and use these IDs when reporting issues.
- **Escalation Process**: Establish clear procedures for escalating issues to Fabric support using the `RequestId` when platform-level investigation is needed.

## Example Workflow

1. **Log Entry**: When a request is received, log the `ActivityId` and `RequestId` along with other relevant information.
2. **Monitor**: Use monitoring tools to track the request in real time, correlating with the IDs.
3. **Troubleshoot**: If an issue arises, use the `ActivityId` and `RequestId` to trace the request through your logs and systems.
4. **Support**: When a customer reports an issue, ask for the `ActivityId` and `RequestId` to quickly locate the relevant logs and provide assistance. If the issue cannot be determined on your end, provide the `RequestId` to Fabric support for further investigation.

## Implementation Considerations

### For Frontend-Only Workloads

- Extract correlation headers from the workload client context when available
- Pass correlation IDs to any external API calls your workload makes
- Include correlation IDs in browser console logs for debugging

### For Workloads with Backend Components

- Propagate correlation headers through your service architecture
- Implement structured logging that includes correlation IDs
- Set up monitoring dashboards that can filter by correlation IDs

### Azure Integration

- **Application Insights**: Automatically captures request correlation and provides built-in dashboards
- **Azure Log Analytics**: Query logs using correlation IDs for troubleshooting
- **Azure Alerts**: Set up alerts based on error patterns or performance metrics

## Customer Support Guidelines

### For Your Customers

Provide customers with clear instructions on how to report issues:

1. **Activity ID**: Can often be found in browser developer tools console logs
2. **Request ID**: May be displayed in error messages or available through support tools
3. **Timestamp**: When the issue occurred
4. **Context**: What operation they were performing when the issue occurred

### For Your Support Team

Train your support team to:

1. **Collect Correlation IDs**: Always ask for `ActivityId` and `RequestId` when investigating issues
2. **Use Diagnostic Tools**: Leverage your logging and monitoring systems to trace issues
3. **Escalate When Needed**: Know when to escalate to Fabric support with the `RequestId`
4. **Document Solutions**: Build a knowledge base of common issues and their correlation patterns

## Conclusion

By following these best practices, developers can effectively support their customers on the Fabric platform, ensuring a seamless and efficient troubleshooting process. Proper logging, monitoring, request management, and support protocols are essential to maintaining high service quality and customer satisfaction.

For more detailed implementation guidance, refer to:

- [Azure Application Insights documentation](/azure/azure-monitor/app/app-insights-overview)
- [Azure Monitor documentation](/azure/azure-monitor/overview)
- [Architecture Overview](./architecture.md)
- [Authentication Guidelines](./authentication-guidelines.md)
