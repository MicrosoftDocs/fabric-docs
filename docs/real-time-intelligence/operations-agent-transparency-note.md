---
title: Operations Agent Transparency Note
description: Understand the transparency measures in place for operations agents in Real-Time Intelligence.
ms.reviewer: willthom
author: hzargari-ms
ms.author: v-hzargari
ms.topic: how-to
ms.custom:
ms.date: 11/24/2025
ms.search.form: Operations Agent Transparency Note
---

# Operations agent transparency note

## What is a Transparency Note? 

An AI system includes not only the technology but also the people who use it, the people who are affected by it, and the environment in which it's deployed. Creating a system that's fit for its intended purpose requires an understanding of how the technology works, what its capabilities and limitations are, and how to achieve the best performance. Microsoft’s Transparency Notes help you understand how our AI technology works, the choices system owners can make that influence system performance and behavior, and the importance of thinking about the whole system, including the technology, the people, and the environment. Use Transparency Notes when developing or deploying your own system, or share them with the people who use or are affected by your system.  

Microsoft’s Transparency Notes are part of a broader effort at Microsoft to put our AI Principles into practice. For more information, see the Microsoft AI principles. 

## The basics of the Real-Time Intelligence operations agent

### Introduction

The Real-Time Intelligence operations agent is a platform for creating agents that monitor data streams, detect anomalies or conditions, and recommend actions based on real-world events. These agents automate tasks, provide insights, and support timely decision-making. By configuring business goals, knowledge sources, actions, and instructions, the agent creates an operational plan to track goals, monitor data, and apply rules to detect conditions. When conditions are met, it notifies users with recommended actions.

### Key terms

Knowledge source: a database connection that the agent can use to find and monitor data. 

- **Tool:** built-in functionality that enables the agent to perform tasks such as generating structured queries from natural language, performing anomaly detection, sending Teams or email messages, and more. 
- **Thread:** a conversation session between an agent and a user. Threads store messages and automatically handle truncation to fit content into a model’s context. 
- **Playbook:** the agent’s internal representation of the entities, data, rules, and possible actions that form its operating manual.  
- **Entity:** objects in your business that the agent is monitoring. For example, in a bike rental business, bikes and docking stations might be relevant entities. In an airport management scenario, check-in lines, security checkpoints, and passengers are relevant entities. 
- **Instances:** specific occurrences of an entity, such as `Bike #0451` or `Flight MS1234`. 
- **Rules:** conditions or patterns in data that the agent monitors for before making recommendations. 
- **Autonomous rules:** rules that have actions associated that the agent is permitted to take without a human confirmation first. 

## Capabilities

### System behavior

When you create an operations agent, you configure the following settings: 

- **Business goals:** the high-level goals that you want the agent to optimize towards. Examples include “Reduce customer wait times”, “Improve power output”, and “Ensure stock distribution to meet upcoming demand”.  

- **Knowledge sources:** data connections that represent information the agent can use to a) track performance towards the business goals and b) analyze and provide insights when problems arise. 

- **Possible actions:** in addition to simple email and Teams actions, you can give the agent an explicit list of actions that it can recommend when it detects issues in the data. The agent can only recommend from these actions, it won’t make suggestions beyond this list. Also, initially the agent always contacts you as the agent creator to confirm before it actually performs these actions. 

- **Instructions:** you can give the agent explicit instructions that help it understand particular business terminology, details about where or how to find data on particular topics, explicit conditions under which it should take different actions, and more.

With these inputs, the agent uses Large Language Models (LLMs) to create a playbook of entities, mapped data, and rules to monitor. You can refine the model by adjusting goals and instructions. Once activated, the agent monitors data in the background. When conditions match the rules, it analyzes the data, identifies the cause, and recommends actions to achieve business goals. 

The agent notifies you via Teams with natural language alerts, keeping you in the loop for initial recommendations. You can approve, reject, or make the rule autonomous, allowing the agent to act without further confirmation.

Given that LLMs are used to create the agent’s playbook and to recommend actions, you should:

- carefully review the behavior model before starting the agent. 
- monitor the agent’s recommendations closely, and confirm the reasoning it uses to make recommendations before acting.
- carefully review any autonomous rules you create with the agent as these rules drive action automatically.

## Use cases

### Intended uses

Operations agents can be used in various scenarios. The system's intended uses include:

- **Bike rental management:** You can configure the operations agent to continually monitor bike availability at various stations by using real-time data. Set a goal to ensure the availability of bikes, so it finds the right queries to track that value for each docking station. Give it actions that reallocate bikes from place to place, pull bikes for maintenance, and more. It generates a plan with rules such as when the number of available bikes falls below a certain threshold, reallocate bikes from other docking stations.  

- **Wind turbine optimization:** The agent monitors data coming from wind farms, tracking power output, rpm, direction and angle of blades, and more. It looks for anomalies or dips in power output and recommends adjustments to the operating parameters. Some dips that are more severe might need on-site engineers, so it can also recommend actions that schedule in-person maintenance. These actions need approval from the human operator first. 

- **Warehouse inventory balancing:** The operations agent monitors stock levels across multiple warehouses in real time. Set a goal to maintain optimal inventory distribution and avoid stockouts or overstocking. It identifies the right queries to track SKU-level availability in each store or warehouse. Give it actions like triggering inter-warehouse transfers or adjusting restock orders. It generates rules such as: if projected demand exceeds current stock by more than 20% in any location, initiate a transfer from the nearest warehouse with surplus. 

- **Expense monitoring:** Give the agent access to data about expense requests and reports, and ask it to flag expenses that are out of compliance with common rules, and to spot anomalies in longer term patterns for each employee or cost center. By giving the agent actions that can approve and reject claims, and adjust the approval limits, it can help triage reports to reduce the time taken to manage them. 

- **Incident response automation:** The agent monitors IT infrastructure logs and telemetry for signs of service degradation or security anomalies. Its goal is to reduce mean time to detect (MTTD) and mean time to resolve (MTTR). It queries log patterns, alert thresholds, and incident history. Give it actions like opening a ticket, notifying on-call engineers, or triggering a remediation script. It generates rules like: if CPU usage on a production VM exceeds 90% for more than 5 minutes and no scaling event is triggered, open a Sev2 incident and notify the SRE team. 

### Considerations when choosing other use cases

We encourage you to apply operations agents in your innovative solutions or applications. However, consider the following factors to ensure the agent is suitable for your specific use case:

- **Avoid scenarios where use or misuse of the system could result in significant physical or psychological injury to an individual.** For example, scenarios that diagnose patients or prescribe medications have the potential to cause significant harm. 

- **Avoid scenarios where use or misuse of the system could have a consequential impact on life opportunities or legal status.** Examples include scenarios where the AI system or agent could affect an individual's legal status, legal rights, or their access to credit, education, employment, healthcare, housing, insurance, social welfare benefits, services, opportunities, or the terms on which they're provided. 

- **Avoid high-stakes scenarios that could lead to harm.** The model used in an agent might reflect certain societal views, biases, and other undesirable content present in the training data or the examples provided in the prompt. As a result, we caution against using agents in high-stakes scenarios where unfair, unreliable, or offensive behavior might be costly or lead to harm. 

- **Carefully consider use cases in high stakes domains or industry where Agent actions are irreversible or highly consequential.** Such industries include but aren't limited to healthcare, medicine, finance, or legal domains. For example: the ability to make financial transactions or give financial advice, the ability to directly interact with outside services, the ability to administer medicine or give health-related advice, the ability to share sensitive information publicly, or the ability to grant access to critical systems. 

- **Legal and regulatory considerations.** Organizations need to evaluate potential specific legal and regulatory obligations when using any AI services and solutions, which might not be appropriate for use in every industry or scenario. Restrictions might vary based on regional or local regulatory requirements. Additionally, AI services or solutions aren't designed for and might not be used in ways prohibited in applicable terms of service and relevant codes of conduct.

## Limitations

### Technical limitations, operational factors, and ranges

- Despite intensive training by OpenAI and the implementation of responsible AI controls by Microsoft on both user prompts and LLM outputs, AI services are fallible and probabilistic. This limitation makes it challenging to comprehensively block all inappropriate content, leading to potential biases, stereotypes, or ungroundedness in AI-generated content. For more on the known limitations of AI-generated content, see the [Transparency Note for Azure OpenAI Service](/azure/ai-foundry/responsible-ai/openai/transparency-note), which includes references to the LLMs behind operations agents.  

- You can give operations agents a wide range of instructions and goals, but the inherent probabilistic nature of the LLMs used to generate their behavior models means that you might not be able to fully align them with your requirements. The description of the agent’s behavior model is also generated using AI, so it might not be 100% accurate. 

- To use operations agents effectively, you need to understand their capabilities and limitations. There might be a learning curve, and you need training to effectively interact with and benefit from the service. 

- Running advanced AI models requires significant computational resources, which can impact performance, especially in resource-constrained environments. You might experience latency or performance issues during peak usage times. 

- As agents combine large language models with external systems, tracing the “why” behind their decisions can become challenging. When using an agent, you might find it difficult to understand why it chose certain tools or combinations of tools to answer a query. This challenge complicates trust and verification of the agent’s outputs or actions. 

- Organizations need to consider their particular legal and compliance obligations when using operations agents, especially in regulated industries. Microsoft is examining regulatory requirements that apply to Microsoft as a provider of the technology and addressing them within the product through a process of continuous improvement. 

- The agent configuration UX provides controls to start or stop the agent, which you can use to quickly interrupt or shut down the agent at any time. This action stops the monitoring of any new data and any new actions that the agent might recommend or take. Actions that the agent invoked in other systems (for example, starting a Power Automate flow or Fabric pipeline or notebook) might not stop immediately. The agent launches these actions as independent processes that you need to manage in those other product experiences. 

Messages between the agent and user are delivered via Teams. When you send messages to the agent, the Azure Bot Service processes the messages. The use of [Azure AI Bot Service](/microsoftteams/platform/bots/build-a-bot) has a technical limitation that each bot can only have a single global endpoint. For Teams first-party bots, requests are sent to the global endpoint and then rerouted to a regional endpoint near the user. Operations agents use an endpoint located in the EU, which means your user data can be moved outside of your geographical region for processing. 

## System performance

In AI systems, performance is often linked to accuracy—how often the system provides correct outputs. For operations agents, performance is more flexible, as users might interpret outputs differently. Errors typically occur when the agent misunderstands goals, data, or key entities in the business process. When making recommendations, users should carefully review the context provided before approving actions. 

### Best practices for improving system performance

To achieve the best results with operations agents, focus on creating detailed, well-structured prompts. The goals and instructions you provide help the agent identify the correct data points and rules for monitoring changes over time. Improve accuracy by explicitly defining the data values and conditions the agent should monitor. Clearly outline how actions influence outcomes and how monitored values are expected to change.

High-quality data is equally important. Ensure data structures are well-organized, with meaningful column names instead of coded values. Flatten nested event data where possible to make it easier for the agent to locate and monitor the relevant information effectively.

## Evaluation of operations agents

### Evaluation methods

The operations agent platform uses a rigorous, multistage process to evaluate accuracy, safety, and continuous improvement. At its core is a trace→iterate→evaluate cycle. This cycle starts by implementing telemetry to monitor the agent’s decision-making processes, including planning, ontology formation, data grounding, rule generation, and execution. Evaluation datasets come from real-world use cases and synthetic data that introduces variability. These datasets include ground truth-labeled examples and cases assessed by using LLM-as-judge techniques. You measure metrics such as accuracy, convergence, failure rates, and safety throughout the agent’s lifecycle, from development to production.

The evaluation environment mirrors production conditions and emphasizes separation between development and evaluation pipelines to avoid bias. You manually curate initial datasets and define expected ontologies and outputs in advance. Later, you scale these datasets by using synthetic generation. Importantly, the evaluation process deliberately excludes software engineers from the creation of ground truths to prevent overfitting to test cases. The datasets focus on operational goals relevant to business monitoring and decision-making. While they represent real-world scenarios, they don't yet include broader user populations or dynamic goal configurations. This approach keeps evaluations focused, reproducible, and aligned with responsible AI principles. 

### Evaluation results

Our evaluation processes use a structured trace→iterate→evaluate methodology, with evaluations embedded at each stage of the agent’s decision-making loops. These evaluations confirmed that the agent consistently produces accurate ontologies, generates valid and relevant KQL queries, and selects appropriate actions aligned with user goals. The use of both ground truth comparisons and LLM-as-judge assessments provided robust evidence of the system’s reliability, logical correctness, and safety. These results support the system’s alignment with accountability goals, particularly in ensuring that it performs as expected in real-world operational contexts.

The training and test datasets used in the evaluation were carefully curated to reflect a broad range of operational scenarios. You manually constructed initial datasets from real-world use cases, with clearly defined expected outputs, including ontologies and query results. Later, you expanded these datasets by using synthetic generation to increase variability and coverage. You designed the datasets to represent the types of goals and data environments the agent is expected to encounter, including variations in schema complexity, data availability, and user intent. This approach ensured that the evaluation captured a representative range of operational factors and settings, supporting responsible system development and deployment.

Evaluation results influenced several key design constraints in the system. For example, you introduced limits on maximum query size and minimum ontology complexity to ensure consistent performance and reduce failure rates. You intentionally separated the evaluation pipeline from the development process to prevent overfitting and maintain objectivity. While the results are broadly applicable to many operational monitoring and decision-support scenarios, the initial evaluation didn't include some areas, such as dynamic goal reconfiguration, multi-agent collaboration, and integration with non-Eventhouse data sources. These areas represent opportunities for future testing and development.

## Evaluating and integrating operations agents for your use

An agent’s behavior is shaped by the instructions, goals, data, and actions you provide. Precise prompts and clean, well-organized data with intuitive column names improve accuracy and reduce errors. 

After configuration, validate the agent’s behavioral models and rules by reviewing KQL queries to ensure alignment with business processes. While rule-based conditions trigger the agent, its LLM-generated recommendations might contain inaccuracies, so always review outputs before acting.

Highly responsive agents can lead to excessive notifications or overuse of automated actions, potentially causing system instability. To mitigate risks, adjust rules, conduct regular audits, simulate edge cases, and design interfaces that promote transparency, such as confidence scores and clear explanations for recommendations.

## Related content

* [Operations agent overview](../real-time-intelligence/operations-agent.md)
* [Microsoft AI principles](https://www.microsoft.com/ai/responsible-ai)
* [Microsoft responsible AI resources](https://www.microsoft.com/ai/tools-practices)
* [Microsoft Azure learning courses on responsible AI](/ai/?tabs=developer)

## Contact us

For questions or feedback about this Transparency Note, contact us through the [Fabric Community Forum](https://community.fabric.microsoft.com/).

## About this document 

© 2025 Microsoft Corporation. All rights reserved. This document is provided "as-is" and for informational purposes only. Microsoft makes no warranties, express or implied. Information and views expressed in this document, including URL and other Internet Web site references, might change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. 

This document isn't legal advice. The jurisdiction in which you operate might have various regulatory or legal requirements that apply to your AI system. Consult a legal specialist if you're uncertain about laws or regulations that might apply to your system, especially if you think those laws or regulations might impact these recommendations. Not all of these recommendations and resources are appropriate for every scenario, and conversely, these recommendations and resources might be insufficient for some scenarios. 

Last updated: 11/19/2025 