---
title: Microsoft Fabric Extensibility Toolkit Validator
description: Learn about the Microsoft Fabric Extensibility Toolkit Validator, a tool for validating workloads against Fabric requirements.
ms.reviewer: gesaur
ms.topic: concept-article
ms.date: 12/04/2025
---

# Microsoft Fabric Extensibility Toolkit Validator

The Microsoft Fabric Extensibility Toolkit Validator is a comprehensive validation tool for Microsoft Fabric workloads. It helps publishers validate their workloads against Microsoft Fabric requirements before submitting for official certification.

This tool is the **public validation tool** for external partners and customers developing Fabric workloads.

## Overview

The validation tool allows workload creators to self-validate their Microsoft Fabric workloads. It's designed to help identify potential issues early in the development process, making the official validation process more likely to succeed.

> [!IMPORTANT]
> Successful self-validation is no guarantee for passing official validation, but it significantly increases the likelihood of success by catching common issues early.

## Prerequisites

* **Node.js** (version 14 or higher)
* **Microsoft Fabric Account** with access to Fabric Workload Hub
* **Chrome/Chromium Browser** (for automated manifest download)
* **Workload Package** built using the [Microsoft Fabric Extensibility Toolkit](https://github.com/microsoft/fabric-extensibility-toolkit)
* **Published Workload** - Your workload must be published to a tenant before validation can begin.

> [!TIP]
> Use a different tenant for validation than the one used for publishing. This allows you to experience what end users will see and provides a more realistic validation environment.

## Get started

### 1. Build your workload

First, create your workload using the official starter kit:

1. Clone the [Fabric Extensibility Toolkit (starter kit)](https://github.com/microsoft/fabric-extensibility-toolkit.git).
2. Follow the toolkit documentation to build your workload.

### 2. Install dependencies

Navigate to the validator directory and install the dependencies:

```bash
cd fabric-extensibility-toolkit-validator/validator
npm install
```

### 3. Basic validation

Run a complete validation for your workload:

**Basic validation command**

```bash
node index.js --workload-name "YourPublisher.YourWorkload" --workload-stage "Preview"
```

**Example with real workload**

```bash
node index.js --workload-name "Contoso.DataProcessor" --workload-stage "Preview"
```

**For GA stage workloads**

```bash
node index.js --workload-name "Contoso.DataProcessor" --workload-stage "GA"
```

> [!NOTE]
> Make sure you're logged into Microsoft Fabric in your browser before running validation, and ensure your workload is published and accessible in the target tenant.

## Command line options

| Option | Description | Example |
|--------|-------------|---------|
| `--workload-name` | Full workload name (Publisher.Product) | `"Contoso.DataProcessor"` |
| `--workload-stage` | Validation stage | `"Preview"` or `"GA"` |
| `--help` | Show help information | *(flag only)* |

## Validation process

The validator runs through several stages:

1. **Manifest Download** - Automatically downloads your workload manifest from Fabric Workload Hub.
2. **Test Discovery** - Identifies applicable test cases based on your workload type.
3. **Test Execution** - Runs validation tests using the configured validators (both automated and manual).
4. **Report Generation** - Creates comprehensive reports in multiple formats.

## Output structure

After validation, you'll find results in the `Results` directory:

```text
Results/
├── YourPublisher.YourWorkload/
│   └── Preview/
│       └── [ValidationID]/
│           ├── YourPublisher.YourWorkload_Metadata.json
│           ├── YourPublisher.YourWorkload_Manifest.json
│           ├── YourPublisher.YourWorkload_Workload_Tests.json
│           ├── YourPublisher.YourWorkload.Item_Item_Tests.json
│           └── Reports/
│               ├── ValidationReport.md
│               ├── ValidationReport.html
│               └── ValidationReport.pdf
```

## Validators

The tool uses a set of specialized validators to check different aspects of your workload. Some validators are automated, while others require manual interaction.

## Troubleshooting

### Browser issues

* Ensure Chrome/Chromium is installed and accessible.
* Make sure you're logged into Microsoft Fabric in your browser.
* Check network connectivity to Fabric services.

### Manifest download issues

* Verify workload name matches exactly (case-sensitive).
* Ensure workload is deployed and accessible in Fabric Workload Hub.
* Check authentication and permissions.

### Test execution issues

* Review validation logs in the Results directory.
* Check individual test case documentation in `validator/validators/`.
* Verify all required workload assets are accessible.

## Related content

* [Microsoft Fabric Extensibility Toolkit](https://github.com/microsoft/fabric-extensibility-toolkit) - Official starter kit for building Fabric workloads
