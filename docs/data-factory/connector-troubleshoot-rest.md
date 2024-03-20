---
title: Troubleshoot the REST connector
description: Learn how to troubleshoot issues with the REST connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Troubleshoot the REST connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the REST connector in Data Factory in Microsoft Fabric.

## Error code: RestSinkCallFailed

- **Message**: `Rest Endpoint responded with Failure from server. Check the error from server:%message;`

- **Cause**: This error occurs when a data factory or Synapse pipeline talks to the REST endpoint over HTTP protocol, and the request operation fails.

- **Recommendation**: Check the HTTP status code or the message in the error message and fix the remote server issue.

## Error code: RestSourceCallFailed

- **Message**: `The HttpStatusCode %statusCode; indicates failure.&#xA;Request URL: %requestUri;&#xA;Response payload:%payload;`

- **Cause**: This error occurs when Data Factory talks to the REST endpoint over HTTP protocol, and the request operation fails.

- **Recommendation**: Check the HTTP status code or the request URL or the response payload in the error message and fix the remote server issue.

## Error code: RestSinkUNSupportedCompressionType

- **Message**: `User Configured CompressionType is Not Supported By Data Factory：%message;`

- **Recommendation**: Check the supported compression types for the REST destination.

## Unexpected network response from the REST connector

- **Symptoms**: The endpoint sometimes receives an unexpected response (400, 401, 403, 500) from the REST connector.

- **Cause**: The REST source connector uses the URL and HTTP method/header/body from the connection/data/copy source as parameters when it constructs an HTTP request. The issue is most likely caused by some mistakes in one or more specified parameters.

- **Resolution**: 
    - Use 'curl' in a Command Prompt window to see whether the parameter is the cause (**Accept** and **User-Agent** headers should always be included):
    
      `curl -i -X <HTTP method> -H <HTTP header1> -H <HTTP header2> -H "Accept: application/json" -H "User-Agent: azure-data-factory/2.0" -d '<HTTP body>' <URL>`
      
      If the command returns the same unexpected response, fix the preceding parameters with 'curl' until it returns the expected response. 

      You can also use 'curl--help' for more advanced usage of the command.

    - If only the REST connector returns an unexpected response, contact Microsoft support for further troubleshooting.
    
    - Note that 'curl' might not be suitable to reproduce an SSL certificate validation issue. In some scenarios, the 'curl' command was executed successfully without encountering any SSL certificate validation issues. But when the same URL is executed in a browser, no SSL certificate is actually returned for the client to establish trust with server.

      Tools like **Postman** and **Fiddler** are recommended for the preceding case.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
