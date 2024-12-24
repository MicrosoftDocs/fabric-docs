| Operation in Capacity Metrics App | Description | Operation unit of measure | Fabric consumption rate |
| --------------------------------- | ----------- | ------------------------- | ----------------------- |
| Eventstream Per Hour <sup>**[Note 1](#Note-1)**</sup> | Flat charge | Per hour | **0.222** CU hour |
| Eventstream Data Traffic per GB | Data ingress & egress volume in default and derived streams <br/> (Includes 24-hour retention) | Per GB | **0.342** CU hour |
| Eventstream Processor Per Hour | Computing resources consumed by the processor | Per hour | Starts at **0.778** CU hour and autoscale <sup>**[Note 2](#Note-2)**</sup> per throughput |
| Eventstream Connectors Per vCore Hour | Computing resources consumed by the connectors | Per hour | **0.611** CU hour per vCore <sup>**[Note 3](#Note-3)**</sup> |

* <a id="Note-1"></a>**Note 1**. **Eventstream Per Hour** is charged only when it's active (that is, has events flowing in or out). If there's no traffic flowing in or out for the past two hours, no charges apply.
* <a id="Note-2"></a>**Note 2: Eventstream Processor Per Hour**. The CU consumption rate of the Eventstream processor is correlated to the throughput of event traffic, the complexity of the event processing logic, and the partition count of input data:
   * With "Low" set in "Event throughput setting", the processor CU consumption rate starts at 1/3 base-rate (0.778 CU hour) and autoscale within 2/3 base-rate (1.555 CU hour), 1 base-rate (2.333 CU hour), 2 base-rates, and 4 base-rates.
   * With "Medium" set in "Event throughput setting", the processor CU consumption rate starts at 1 base-rate and autoscale within multiple possible base-rates.
   * With "High" set in "Event throughput setting", the processor CU consumption rate starts at 2 base-rates and autoscale within multiple possible base-rates.
* <a id="Note-3"></a>**Note 3: Eventstream Connectors Per vCore Hour** 
   * The CU consumption of the Eventstream connector is for charging computing resources when pulling real-time data from sources, excluding Azure Event Hubs, Azure IoT Hub, and Custom endpoints. Data from Azure Event Hubs and Azure IoT Hub is pulled using the Eventstream Processor. 
   * Connector CU consumption is designed to correlate with throughput. When throughput increases, the number of vCores increases (autoscale), resulting in higher CU consumption. Currently, connector autoscaling is unavailable, so only one vCore is used per connector source.