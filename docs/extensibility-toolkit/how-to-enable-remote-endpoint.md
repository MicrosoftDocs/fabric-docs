---
title: HowTo - Enable Remote Endpoints for Custom Items
description: Learn how to configure remote service endpoints for your custom Fabric items to enable job execution and backend processing.

ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 02/12/2026
ai-usage: ai-assisted
---

# How-To: Enable remote endpoints for custom items

Custom items in Fabric can leverage remote endpoints to execute job logic and receive item lifecycle notifications. This article explains how to implement and configure remote service endpoints for your custom workload.

## Why use remote endpoints?

If you want to integrate complex business logic or need to run jobs, you need a remote endpoint where Fabric can call you. Remote endpoints enable custom items to execute jobs and receive lifecycle notifications outside of Fabric. You need to implement a remote endpoint that Fabric calls when:

- **A job is triggered** - Execute background processing, scheduled operations, or on-demand tasks (see [Define Jobs for Your Workload](how-to-enable-remote-jobs.md))
- **Item lifecycle events occur** - Respond to item creation, updates, deletion, or other lifecycle events (see [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md))

This architecture gives you full control over where and how your logic executes, allowing you to:

- Choose the appropriate compute platform for your workload requirements
- Scale resources independently of Fabric
- Implement custom authentication and security policies
- Integrate with external systems and services
- Use any programming language or runtime environment

## Remote endpoint requirements

When a job is triggered (either on-demand or on a schedule), or you have onboarded to livecylce notifications, Fabric calls your remote endpoint with the details. You're responsible for implementing the job execution logic at this endpoint.

The remote endpoint can be:

- **An Endpoint Resolution Service** - Dynamically resolve endpoint URLs at runtime for flexible routing (see [Use Endpoint Resolution Service](how-to-enable-remote-endpoint-resolution.md))
- **An Azure Function** - Simple, serverless execution for lightweight jobs
- **An Azure Container Instance** - For jobs requiring specific runtime environments
- **A custom web service** - For complex job orchestration and processing
- **Any compute service** - As long as it can expose an HTTP endpoint and handle the job execution

### Swagger specification

Your remote endpoint must implement the Fabric job execution contract defined in the Swagger specification (link TBD). This contract specifies:

- Required HTTP endpoints for job execution
- Request and response payload formats
- Authentication and authorization requirements
- Status reporting mechanisms

## Local development support

For local development and testing, the Fabric Extensibility Toolkit provides a built-in stub implementation in the development server. This allows you to try the job execution experience on your local machine without deploying to Azure.

### How it works

When you run the local development server (see [Get started with Fabric Extensibility Toolkit](get-started.md) and [Register Local Web Server](tools-register-local-web-server.md)), all jobs defined in your item manifest are automatically redirected to your local machine. 

When a job is triggered in dev mode:

1. The job request is intercepted by the local development server
1. Log statements appear in your local console showing the job details
1. A sample implementation demonstrates how to interact with OneLake
1. You receive a token that can be used to call any Fabric operation

This stub implementation provides:

- **Immediate feedback** - See log statements in your console as jobs are triggered
- **Sample code** - Learn how to structure your job execution logic
- **OneLake integration examples** - See how to access OneLake data during job execution
- **Token handling** - Understand how to obtain and use Fabric authentication tokens

### Using the development stub

To use the local development server for job testing:

1. Start your local development server following the [quickstart guide](get-started.md)
1. Register your local web server using the [registration steps](tools-register-local-web-server.md)
1. Define jobs in your item manifest as described in [Define Jobs for Your Workload](how-to-enable-remote-jobs.md)
1. Trigger a job from your item in Fabric
1. Observe the log output in your local console
1. Review the sample code and token handling in the development server logs

This local development experience allows you to build and test your job logic before deploying to production endpoints.

## Configuration steps

To enable remote endpoint execution for your custom items:

### 1. Implement the remote endpoint

Create a service that handles job execution requests. Your implementation must:

- **Accept job trigger requests** - Receive and validate incoming job requests from Fabric
- **Execute job logic** - Perform the actual work defined by your job type
- **Report progress** - Send status updates back to Fabric during execution
- **Handle errors** - Implement proper error handling and reporting
- **Update job status** - Notify Fabric when the job completes or fails

### 2. Define the remote service endpoint

Configure the endpoint in your WorkloadManifest. Add the remote service configuration to specify where Fabric should send job execution requests.

```xml
<!-- WorkloadManifest configuration example -->
<!-- Detailed configuration schema TBD -->
```

### 3. Handle job lifecycle

Your remote endpoint receives job trigger requests and is responsible for:

- **Executing the job logic** - Run the actual processing defined for each job type
- **Reporting progress to Fabric** - Update the job status in Fabric's monitoring hub
- **Handling errors and retries** - Implement retry logic for transient failures
- **Updating job status in the monitoring hub** - Ensure users can track job execution

## Implementation example

Here's a conceptual example of a remote endpoint implementation using Azure Functions:

```csharp
[FunctionName("ExecuteJob")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "jobs/execute")] HttpRequest req,
    ILogger log)
{
    // Parse the job request from Fabric
    var jobRequest = await ParseJobRequest(req);
    
    // Validate authentication and authorization
    if (!await ValidateRequest(jobRequest))
    {
        return new UnauthorizedResult();
    }
    
    try
    {
        // Report job started
        await ReportJobStatus(jobRequest.JobId, "Running");
        
        // Execute the job logic based on job type
        var result = await ExecuteJobLogic(jobRequest);
        
        // Report job completed successfully
        await ReportJobStatus(jobRequest.JobId, "Succeeded", result);
        
        return new OkObjectResult(result);
    }
    catch (Exception ex)
    {
        log.LogError(ex, $"Job {jobRequest.JobId} failed");
        
        // Report job failure
        await ReportJobStatus(jobRequest.JobId, "Failed", ex.Message);
        
        return new StatusCodeResult(500);
    }
}
```

## Security considerations

When implementing remote endpoints for Fabric integration:

### Authentication and authorization
- Use secure authentication mechanisms (for example, OAuth 2.0, managed identities)
- Validate that requests originate from Fabric
- Implement proper authorization checks for job execution

### Communication security
- Use HTTPS for all communication
- Validate and sanitize all input data
- Implement rate limiting to prevent abuse

### Data protection
- Handle sensitive data securely
- Follow data residency and compliance requirements
- Implement proper logging without exposing sensitive information

## Accessing Fabric and Other Entra-Secured Services

When Fabric calls your remote endpoint, it provides authentication tokens that you can use to access Fabric APIs and other Microsoft Entra-secured services. This enables your workload to call back to Fabric or access resources like OneLake on behalf of the user.

### Authentication Token Format

Fabric uses the SubjectAndAppToken format when calling your remote endpoint:

```
SubjectAndAppToken1.0 subjectToken="<user-token>", appToken="<app-token>"
```

This dual-token format provides:
- **subjectToken** - A user-delegated token representing the user on whose behalf the operation is being performed
- **appToken** - An app-only token from Fabric, proving the request originated from Fabric

### Token Exchange for Resource Access

To access Fabric APIs or other resources like OneLake, you need to exchange the user's token for resource-specific tokens using the OAuth 2.0 On-Behalf-Of (OBO) flow.

#### Accessing OneLake

```javascript
// Exchange user token for OneLake access token
const oneLakeToken = await getOneLakeToken(
  authContext.subjectToken,
  authContext.tenantId
);

// Use the token to access OneLake data
const response = await axios.get(
  `https://onelake.dfs.fabric.microsoft.com/workspaces/${workspaceId}/items/${itemId}/files/data.parquet`,
  {
    headers: {
      'Authorization': `Bearer ${oneLakeToken}`
    }
  }
);
```

#### Accessing Fabric APIs

```javascript
// Build composite token for Fabric API calls
const fabricAuthHeader = await buildCompositeToken(authContext);

// Call Fabric workload control API
const itemDetails = await axios.get(
  `https://api.fabric.microsoft.com/v1/workspaces/${workspaceId}/items/${itemId}`,
  {
    headers: {
      'Authorization': fabricAuthHeader
    }
  }
);
```

#### Accessing Other Entra-Secured Services

You can exchange the user token for any Entra-secured service:

```javascript
// Exchange for Azure Resource Manager token
const armToken = await getTokenForScope(
  authContext.subjectToken,
  authContext.tenantId,
  'https://management.azure.com/.default'
);

// Exchange for Microsoft Graph token
const graphToken = await getTokenForScope(
  authContext.subjectToken,
  authContext.tenantId,
  'https://graph.microsoft.com/.default'
);
```

### Token Validation and Security

Always validate incoming tokens from Fabric:

1. **Parse the SubjectAndAppToken format** - Extract both tokens from the Authorization header
2. **Validate token signatures** - Verify tokens against Azure AD signing keys
3. **Check token claims** - Ensure issuer, audience, and tenant match expected values
4. **Verify app token is from Fabric** - Confirm the appToken originates from the Fabric service

For complete authentication implementation details, including token validation, parsing, and exchange service examples, see [Authenticate Remote Endpoints](authentication-remote.md).

## Best practices

### Reliability
- Implement retry logic for transient failures
- Use idempotent operations where possible
- Design for graceful handling of endpoint unavailability

### Performance
- Choose appropriate compute resources for your remote endpoint
- Consider memory and compute requirements for job execution
- Implement proper resource cleanup after job completion

### Monitoring
- Log all job execution requests and responses
- Track performance metrics (execution time, resource usage)
- Set up alerts for failures and anomalies
- Integrate with Azure Monitor or other monitoring solutions

### Error handling
- Provide meaningful error messages that appear in the monitoring hub
- Differentiate between transient and permanent failures
- Implement proper timeout handling

## Integration with Fabric monitoring

Your remote endpoint should report job status updates to Fabric so users can track execution in the [monitoring hub](/fabric/admin/monitoring-hub). Status updates should include:

- Job start time
- Progress updates (if applicable)
- Completion status (succeeded, failed, cancelled)
- Error messages and diagnostic information
- Execution duration and resource usage

## Related content

- [Authenticate Remote Endpoints](authentication-remote.md)
- [Use Endpoint Resolution Service](how-to-enable-remote-endpoint-resolution.md)
- [Define Jobs for Your Workload](how-to-enable-remote-jobs.md)
- [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md)
- [Get started with Fabric Extensibility Toolkit](get-started.md)
- [Register Local Web Server](tools-register-local-web-server.md)
- [Job Scheduler API](/rest/api/fabric/core/job-scheduler)
- [Monitoring Hub](/fabric/admin/monitoring-hub)
- [Manifest Overview](manifest-overview.md)
