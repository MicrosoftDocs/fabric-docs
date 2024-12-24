| Operation                       | Description                               | Item         | Azure billing meter        | Type       |
| ------------------------------- | ----------------------------------------- | ------------ | -------------------------- | ---------- |
| Eventstream Per Hour <sup>**[Note 1](#Note-1)**</sup>           | Flat charge  | Eventstream | Eventstream Capacity Usage CU               | Background |
| Eventstream Data Traffic per GB | Data ingress & egress volume in default and derived streams(Includes 24-hour retention)| Eventstream | Eventstream Data Traffic per GB Capacity Usage CU | Background |
| Eventstream Processor Per Hour  |Computing resources consumed by the processor| Eventstream | Eventstream Processor Capacity Usage CU    | Background |
| Eventstream Connectors Per vCore Hour  | Computing resources consumed by the connectors |Eventstream | Eventstream Connectors Capacity Usage CU | Background |

* <a id="Note-1"></a>**Note 1**. **Eventstream Per Hour** is charged only when it's active (that is, has events flowing in or out). If there's no traffic flowing in or out for the past two hours, no charges apply.