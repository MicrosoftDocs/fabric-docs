---
title: Responsible AI FAQ for Fabric Observability Investigation
description: Learn how Fabric observability investigation works, what it can and can't do, and how to interpret and validate AI-generated outputs.
ms.topic: concept-article
ms.service: fabric
ms.collection: ce-skilling-ai-copilot
ms.reviewer: ilanawaitser
ms.date: 09/03/2026

# Customer intent: As a data engineer or operations user, I want to understand how Fabric observability investigation generates results, what limitations apply, and how to validate outputs before taking action.
---

# Responsible use of AI - FAQ for Fabric observability investigation

Use this FAQ to understand transparency, reliability expectations, limitations, and how to interpret outputs from Fabric observability investigation.

For data retention, residency, access controls, and governance settings, see [Data, privacy, and governance FAQ for Fabric observability investigation](fabric-observability-investigation-governance-faq.md).

## About Fabric observability investigation

### What is Fabric observability investigation?

Fabric observability investigation helps you find out why a data pipeline run failed in Microsoft Fabric by using a conversational experience.

It uses AI to gather the relevant monitoring signals for a failed job, correlate them, interpret the errors, visualize the run history, and suggest next steps based on the available data. For an overview, see [Fabric observability investigation](fabric-observability-investigation-overview.md).

### What can Fabric observability investigation do?

It provides a chat experience where you investigate a failed data pipeline run and ask follow-up questions.

During analysis, the agent can:

- Interpret the failure and its relevant scope.
- Gather the job, activity, and error signals for the failed run.
- Correlate findings and potential causes.
- Identify the likely root cause.
- Summarize and visualize the pipeline's recent run history.
- Suggest next steps based on the available data.
- Explain its reasoning progress during the investigation.
- Suggest follow-up questions.

The investigation is surfaced step by step so you can review findings as they appear. At the end, the agent provides a summary and the supporting findings.

### What is the intended use of Fabric observability investigation?

Data engineering and operations teams use the agent to understand why a data pipeline run failed. It helps them identify problems faster, determine the likely root cause, and evaluate what to do next.

## Reliability, limitations, and fairness

### How did Microsoft evaluate Fabric observability investigation?

Microsoft evaluated the experience through multiple channels, including:

- Product telemetry trends.
- Customer feedback from in-product channels.
- Survey results and text feedback.
- Automated tests in test environments.

### Are the results reliable?

Fabric observability investigation is designed to generate the best possible analysis based on the data and context it can access. Microsoft repeatedly assesses and calibrates it to provide reliable insights and evidence. However, like any AI-powered system, output might not always be perfect. Carefully evaluate and validate results before taking action in your Fabric environment.

### Are the outputs authoritative?

No. The agent provides assistive insights based on the available monitoring data. You're responsible for validating outputs before taking action.

### What are the limitations, and how can I reduce their impact?

- Lack of monitoring data: The investigation relies on the data captured by workspace monitoring. If monitoring isn't enabled, or the run failed before monitoring was turned on, the investigation might not have enough data to succeed. Enable workspace monitoring and run the investigation again once data is available.
- Scope: During preview, investigations support data pipeline run failures only.
- Capacity and timeouts: If many investigations run at the same time, request volume can delay responses. Send your message again in the same chat to retry.

### What are the fairness considerations?

Fairness is a core part of Fabric observability investigation development. Consistent performance across different scenarios and input data types is critical. The development team evaluates the system for fairness by checking reliability signals and potential incorrect outputs. They take measures to prevent harmful generated text and ensure fallback options are in place when AI encounters issues such as timeouts or service unavailability.

## Data, privacy, and access

### What data can it access?

The agent accesses your Fabric monitoring data and related pipeline details within the scope of the signed-in user's permissions. It operates within existing access management controls, such as workspace roles in Microsoft Fabric.

### Can it access data I'm not authorized to view?

No. The agent runs under your identity and workspace permissions, and it can access only data that you're already authorized to access.

### How does it use my Fabric data?

Fabric observability investigation analyzes your workspace monitoring data and pipeline details to reason over a failed run and find the likely cause, scoped to the job you're investigating.

### What usage data does it collect?

Fabric observability investigation doesn't use your data, prompts, or responses to train or improve underlying AI models. To improve Microsoft products and services, it might collect usage engagement data, such as the number of sessions, session duration, and feedback, subject to the [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement) and applicable consent requirements. The agent doesn't collect personally identifiable information (PII).

### How current is the information it provides?

Fabric observability investigation uses the latest monitoring data it finds. Data freshness depends on ingestion and processing, so recently generated telemetry might appear with a delay.

## Responsible use and support

### How do I use Fabric observability investigation responsibly?

- Enable workspace monitoring so that pipeline runs produce enough data for an investigation.
- Start the investigation from the specific failed run so the analysis stays scoped and grounded.
- Validate the findings and recommended next steps before you act on them.

### What should I do if I see unexpected or offensive content?

The development of Fabric observability investigation follows AI principles and the Responsible AI Standard. It prioritizes preventing irrelevant or offensive output. However, as with any AI feature, unexpected results might still appear. Report it through the in-product feedback controls. Microsoft continuously works to improve this technology to prevent such content.

### How do I provide feedback?

Provide feedback through the in-product feedback controls in the investigation chat and the Fabric feedback experience.

### Where can I read more about Responsible AI standards?

For more information, see the [Microsoft Responsible AI Standard](https://aka.ms/RAIStandardPDF).

## Related content

- [Fabric observability investigation](fabric-observability-investigation-overview.md)
- [Run a Fabric observability investigation](fabric-observability-investigation-run.md)
- [Data, privacy, and governance FAQ for Fabric observability investigation](fabric-observability-investigation-governance-faq.md)
