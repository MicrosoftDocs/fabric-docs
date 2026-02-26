---
title: How to validate your workload for publishing
description: Learn how to use the Fabric Extensibility Toolkit Validator to check your workload against publishing requirements before submitting for review.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How to validate your workload for publishing

This article explains how to use the Fabric Extensibility Toolkit Validator to ensure your workload meets all publishing requirements before submitting your publishing request form. The validator helps identify compliance issues early in the development process, reducing review time and improving approval success rates.

## Overview

The Fabric Extensibility Toolkit Validator is a command-line tool designed to help partners validate their workloads against Microsoft Fabric publishing requirements. The tool combines automated testing with manual guided tests to provide comprehensive validation coverage.

### Validation Types

The validator provides two types of validation:

* **Automated Tests**: Programmatic checks that scan your workload for compliance issues automatically
* **Manual Guided Tests**: Step-by-step instructions for validation tasks that require human verification

## Prerequisites

Before using the validation tool, ensure you have:

* A completed workload ready for validation
* Access to the Fabric Extensibility Toolkit Validator repository
* Command-line interface access on your development machine
* Your workload properly configured and deployable

## Accessing the Validator

The Fabric Extensibility Toolkit Validator is available through GitHub:

🔗 **Repository**: <https://github.com/microsoft/fabric-extensibility-toolkit-validator>

For detailed installation and usage instructions, see [Microsoft Fabric Extensibility Toolkit Validator](tools-workload-validator.md).

Visit the repository to:

* Download the latest version of the validator
* Review available command-line parameters
* Access documentation for tool usage
* Check system requirements and setup instructions

## Using the Validator

### Command-Line Interface

The validator operates as a command-line tool that you run against your workload. The specific parameters and usage instructions are available in the validator repository.

**Refer to the repository documentation for**:

* Complete parameter reference
* Command-line syntax
* Configuration options
* Output format details

### Validation Workflow

Follow this general workflow when using the validator:

1. **Prepare Your Workload**: Ensure your workload is built and ready for testing
2. **Run Automated Tests**: Execute the validator's automated compliance checks
3. **Complete Manual Tests**: Follow guided instructions for manual verification tasks
4. **Review Results**: Analyze the validation report and identify any issues
5. **Address Findings**: Fix any compliance gaps identified by the validator
6. **Re-validate**: Run the validator again to confirm all issues are resolved
7. **Submit for Publishing**: Proceed with your publishing request once validation passes

### Validation Coverage

The validator checks your workload against:

* **Publishing requirements for workloads**: Infrastructure, security, and compliance standards
* **Publishing requirements for items**: User experience and functionality requirements
* **Manifest compliance**: Proper configuration and required properties
* **Platform integration**: Correct implementation of Fabric platform features

## Interpreting Results

### Automated Test Results

The validator provides detailed reports on automated test results, including:

* **Pass/Fail Status**: Clear indication of test outcomes
* **Issue Descriptions**: Specific explanations of any compliance gaps
* **Remediation Guidance**: Suggestions for fixing identified issues
* **Severity Levels**: Priority indicators for addressing different types of issues

### Manual Test Guidance

For manual validation tasks, the tool provides:

* **Step-by-step instructions**: Clear guidance for manual verification processes
* **Verification criteria**: Specific standards to check against
* **Documentation requirements**: Evidence needed to demonstrate compliance
* **Best practices**: Recommendations for optimal implementation

## Best Practices

### Pre-Validation Preparation

* **Complete development**: Ensure your workload is feature-complete before validation
* **Test thoroughly**: Conduct your own testing before running the validator
* **Review requirements**: Familiarize yourself with publishing requirements beforehand
* **Prepare documentation**: Ensure all required documentation is ready and accessible

### Validation Execution

* **Run regularly**: Use the validator throughout development, not just at the end
* **Address issues promptly**: Fix identified problems as soon as possible
* **Document changes**: Keep track of modifications made based on validation feedback
* **Verify fixes**: Re-run validation after making changes to confirm resolution

## Troubleshooting

### Common Issues

* **Tool setup problems**: Refer to the repository documentation for installation guidance
* **Permission issues**: Ensure you have appropriate access rights to run the validator
* **Configuration errors**: Verify your workload configuration matches expected formats
* **Environment issues**: Check that your development environment meets tool requirements

### Getting Help

* **Repository Documentation**: Check the validator repository for detailed guidance
* **Issue Reporting**: Use the repository's issue tracker to report problems or ask questions
* **Community Support**: Engage with other developers using the validator
* **Microsoft Support**: Contact your Microsoft partner representative for additional assistance

## Related Content

* [Publishing Requirements](./publishing-requirements-general.md) - General requirements overview
* [Publishing Requirements Cross tenants](./publishing-requirements-overview.md)
* [Publishing requirements for workloads](./publishing-requirements-workload.md) - Workload-specific standards
* [Publishing requirements for items](./publishing-requirements-item.md) - Item-specific requirements
* [Publishing Overview](./publishing-overview.md) - High-level publishing process
* [Manifest overview](./manifest-overview.md) - Workload manifest configuration
