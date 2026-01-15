---
title: GQL Schema Example - Social Network
description: Complete schema definition for the social network domain used throughout GQL documentation examples for graph in Microsoft Fabric.
ms.topic: reference
ms.date: 11/18/2025
author: lorihollasch
ms.author: loriwhip
ms.reviewer: splantikow
---

# GQL schema example: Social network

[!INCLUDE [feature-preview](./includes/feature-preview-note.md)]

This article provides the complete technical specification for the social network graph type used throughout the GQL documentation. This schema demonstrates many common features of complex graphs and serves as the foundation for all query examples in the GQL language documentation.

> [!NOTE] 
> The social network is example is derived from 
> the [LDBC SNB (LDBC Social Network Benchmark)](https://ldbcouncil.org/benchmarks/snb/) published by 
> the [GDC (Graph Data Council)](https://ldbcouncil.org/).
> See the article ["The LDBC Social Network Benchmark"](https://arxiv.org/abs/2001.02299) for further details.
> See [social network example graph dataset](sample-datasets.md) for how to obtain a copy of the derived dataset.

<!-- Image source in graphviz dot format
//// CREATE GRAPH ldbc_snb {

digraph LDBC_SNB_Schema {
    
    // Graph settings
    
    compund=true;
    rankdir=BT;
    labelloc="b";
    nodesep=1.0;
    ranksep=1.2;
    layout=dot;
    fontname="Helvetica";
    
    // Node and edge settings
    
    node [shape=record fontname="Helvetica" style=filled fontsize=11];
    edge [fontsize=10 fontname="Helvetica" fontcolor="black" color="grey"];

    
    //// (:TagClass => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

    TagClass [
      fillcolor=orange, 
      label=<{<b>(:TagClass)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />name :: STRING<br align="left"
              />url :: STRING<br align="left"/>}>];
    

    //// (:TagClass)-[:isSubclassOf]->(:TagClass),  
 
    TagClass -> TagClass [xlabel=<<b>:isSubclassOf</b>>];
 

    //// (:Tag => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

    Tag [
      fillcolor=yellow, 
      label=<{<b>(:Tag)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />name :: STRING<br align="left"
              />url :: STRING<br align="left"/>}>];


    //// (:Tag)-[:hasType]->(:TagClass),

    Tag -> TagClass [label=<<b>:hasType</b>>];


    //// ABSTRACT 
    //// (:Place => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

    Place [
      fillcolor=lightblue, 
      label=<{ABSTRACT<br/><b>(:Place)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />name :: STRING<br align="left"
              />url :: STRING<br align="left"/>}>];

    
    //// (:City => :Place),
    //// (:Country => :Place),
    //// (:Continent => :Place),

    City [fillcolor=lightblue, label=<{<b>(:City =&gt; :Place)</b>|<b>...</b>}>];
    Country [fillcolor=lightblue, label=<{<b>(:Country =&gt; :Place)</b>|<b>...</b>}>];
    Continent [fillcolor=lightblue, label=<{<b>(:Continent =&gt; :Place)</b>|<b>...</b>}>];

    City -> Place[style=dashed fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];
    Country -> Place[style=dashed color=grey fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];
    Continent -> Place[style=dashed color=grey fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];

  
    ///// (:City)-[:isPartOf]->(:Country),
    ///// (:Country)-[:isPartOf]->(:Continent),

    City -> Country [label=<<b>-[:isPartOf]-&gt;</b>>];
    Country -> Continent [label=<<b>-[:isPartOf]-&gt;</b>>];


    //// ABSTRACT
    //// (:Organization => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

    Organization [
      fillcolor=lightgreen, 
      label=<{ABSTRACT<br/><b>(:Organization)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />name :: STRING<br align="left"
              />url :: STRING<br align="left"/>}>]


    //// (:University => :Organization),
    //// (:Company => :Organization),

    University [fillcolor=lightgreen, label=<{<b>(:University =&gt; :Organization)</b>|<b>...</b>}>];
    Company [fillcolor=lightgreen, label=<{<b>(:Company =&gt; :Organization)</b>|<b>...</b>}>];

    University -> Organization[style=dashed fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];
    Company -> Organization[style=dashed fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];


    //// (:Person => {
    ////   id :: UINT64 NOT NULL,
    ////   creationDate :: ZONED DATETIME,
    ////   firstName :: STRING,
    ////   lastName :: STRING,
    ////   gender :: STRING,
    ////   birthday :: UINT64,
    ////   browserUsed :: STRING,
    ////   locationIP :: STRING
    //// }),

    Person [
      fillcolor=pink, 
      label=<{<b>(:Person)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />creationDate :: ZONED DATETIME<br align="left"
              />firstName :: STRING<br align="left"
              />lastName :: STRING<br align="left"
              />gender :: STRING<br align="left"
              />birthday :: UINT64<br align="left"
              />email :: LIST&lt;STRING NOT NULL&gt;<br align="left"
              />speaks :: LIST&lt;STRING NOT NULL&gt;<br align="left"
              />browserUsed :: STRING<br align="left"
              />locationIP :: STRING<br align="left"/>}>];


    //// (:Person)-[:hasInterest]->(:Tag),
    //// (:Person)-[:studyAt { classYear :: UINT64 }]->(:University),
    //// (:Person)-[:workAt { workFrom :: UINT64 }]->(:Company),
    //// (:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person),

    Person -> Tag [label=<<b>-[:hasInterest]-&gt;</b>>];
    Person -> University [label=<<b>-[:studyAt {classYear :: UINT64}]-&gt;</b>>];
    Person -> Company [label=<<b>-[:workAt {workFrom :: UINT64}]-&gt;</b>>];
    Person -> Person [label=<<b>-[:knows {creationDate :: ZONED DATETIME}]-&gt;</b>>];


    //// (:Forum => {
    ////   id :: UINT64 NOT NULL,
    ////   creationDate :: ZONED DATETIME,
    ////   title :: STRING
    //// }),

    Forum [
      fillcolor=lightcyan, 
      label=<{<b>(:Forum)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />creationDate :: ZONED DATETIME<br align="left"
              />title :: STRING<br align="left"/>}>];


    //// (:Forum)-[:hasMember { creationDate :: ZONED DATETIME, joinDate :: UINT64 }]->(:Person),
    //// (:Forum)-[:hasModerator]->(:Person),

    Forum -> Person [label=<<b>-[:hasMember<br/>{creationDate :: ZONED DATETIME, joinDate :: ZONED DATETIME]-&gt;</b>>];
    Forum -> Person [label=<<b>-[:hasModerator]-&gt;</b>>];


    //// ABSTRACT 
    //// (:Message => {
    ////    id :: UINT64 NOT NULL,
    ////    creationDate :: ZONED DATETIME,
    ////    browserUsed :: STRING,
    ////    locationIP :: STRING,
    ////    content :: STRING,
    ////    length :: UINT64
    //// }),

    Message [
      fillcolor=lightyellow, 
      label=<{ABSTRACT<br/><b>(:Message)</b>|<b>id :: UINT64 NOT NULL</b><br align="left"
              />creationDate :: ZONED DATETIME<br align="left"
              />browserUser :: STRING<br align="left"
              />locationIP :: STRING<br align="left"
              />content :: STRING<br align="left"
              />length :: INT<br align="left"/>}>];


    //// (:Post => :Message += {
    ////   language :: STRING,
    ////   imageFile :: STRING
    //// }),

    Post [fillcolor=lightyellow, label=<{<b>(:Post =&gt; :Message)</b>|<b>...</b><br align="center"/><br align="left"
        />language :: STRING<br align="left"
        />imageFile :: STRING<br aligen="left"/>
    }>];

    Post -> Message[style=dashed fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];


    ////  (:Comment => :Message)

    Comment [fillcolor=lightyellow, label=<{<b>(:Comment =&gt; :Message)</b>|<b>...</b>}>];

    Comment -> Message[style=dashed fontcolor=grey arrowhead=empty label=<<b>=&gt;</b>>];


    //// (:Forum)-[:hasTag]->(:Tag),  
    //// (<:Message)-[:hasTag]->(:Tag)
    
    Forum -> Tag [label=<<b>-[:hasTag]-&gt;</b>>];
    Message -> Tag [label=<<b>-[:hasTag]-&gt;</b>>, style="bold", ltail="cluster_messages"];

 
    ///// (:Forum)-[:containerOf]->(:Post),

    Forum -> Post [label=<<b>-[:containerOf]-&gt;</b>>];


    //// (:Comment)-[:replyOf]->(<:Message),
    Comment -> Message[label=<<b>-[:replyOf]-&gt;</b>>, lhead="cluser_messages"];


    ////  (:Person)-[:likes { creationDate :: ZONED DATETIME }]->(<:Message),
    Person -> Message [label=<<b>-[:likes<br/>{creationDate :: ZONED DATETIME}]-&gt;</b>>, style="bold", lhead="cluster_messages"];


    //// (<:Message)-[:hasCreator]->(:Person),
    Message -> Person [label=<<b>-[:hasCreator]-&gt;</b>>, style="bold", ltail="messages_cluster"];
    

    //// (:University)-[:isLocatedIn]->(:City),
    //// (:Company)-[:isLocatedIn]->(:Country),
    //// (:Person)-[:isLocatedIn]->(:City),
    //// (<:Message)-[:isLocatedIn]->(:Country),

    University -> City [label=<<b>-[:isLocatedIn]-&gt;</b>>];
    Company -> Country [label=<<b>-[:isLocatedIn]-&gt;</b>>];
    Person -> City [label=<<b>-[:isLocatedIn]-&gt;</b>>];
    Message -> Country [label=<<b>-[:isLocatedIn]-&gt;</b>>, style="bold", ltail="cluster_messages"];


    //// Subgraphs for better organization

    subgraph cluster_places {
        label=<<b>Places</b>>;
        style=filled;
        color=lightblue;
        fillcolor=aliceblue;
        Place; City; Country; Continent;
    }
    
    subgraph cluster_organizations {
        label=<<b>Organizations</b>>;
        style=filled;
        color=lightgreen;
        fillcolor=honeydew;
        Organization; University; Company;
    }
    
    subgraph cluster_messages {
        label=<<b>Messages</b>>;
        style=filled;
        color=yellow;
        fillcolor=lightyellow;
        Message; Post; Comment;
    }
    
    subgraph cluster_tags {
        label=<<b>Tags</b>>;
        style=filled;
        color=orange;
        fillcolor=papayawhip;
        TagClass; Tag;
    }
}
-->
:::image type="content" source="./media/gql/schema-example.png" alt-text="Diagram showing the social network schema." lightbox="./media/gql/schema-example.png":::

## Domain specification

The social network domain models a comprehensive social platform with the following entities:

- **People** with demographic and behavioral properties
- **Organizations** including educational institutions (universities) and employers (companies)
- **Geographic hierarchy** from cities through countries/regions to continents
- **Content system** with forums, posts, and threaded comments
- **Taxonomy system** with tags and tag classifications
- **Social and professional relationships** between people and organizations

For a more detailed introduction to the entities of this domain, see [GQL language guide](gql-language-guide.md#a-practical-example-social-network).

## Schema features demonstrated

This graph type showcases advanced GQL capabilities:

- **Node type inheritance** using abstract base types (`Message`, `Organization`, `Place`)
- **Multiple inheritance patterns** with shared property definitions
- **Edge type families** where the same relationship label connects different node type combinations
- **Comprehensive constraint system** ensuring data integrity through key constraints
- **Mixed relationship patterns** including hierarchical containment, social connections, and content interactions

## Complete schema definition

The following [graph type](gql-graph-types.md) provides a complete schema definition in GQL syntax:

```gql
(:TagClass => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

CONSTRAINT tag_class_pk
FOR (n:TagClass) REQUIRE (n.id) IS KEY,

(:TagClass)-[:isSubclassOf]->(:TagClass),

(:Tag => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:Tag)-[:hasType]->(:TagClass),

CONSTRAINT tag_pk
FOR (n:Tag) REQUIRE (n.id) IS KEY,

ABSTRACT
(:Place => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:City => :Place),
(:Country => :Place),
(:Continent => :Place),

CONSTRAINT place_pk
FOR (n:Place) REQUIRE (n.id) IS KEY,

(:City)-[:isPartOf]->(:Country),
(:Country)-[:isPartOf]->(:Continent),

ABSTRACT
(:Organization => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:University => :Organization),
(:Company => :Organization),

CONSTRAINT organization_pk
FOR (n:Organization) REQUIRE (n.id) IS KEY,

(:University)-[:isLocatedIn]->(:City),
(:Company)-[:isLocatedIn]->(:Country),

(:Person => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    firstName :: STRING,
    lastName :: STRING,
    gender :: STRING,
    birthday :: UINT64,
    browserUsed :: STRING,
    locationIP :: STRING
}),

CONSTRAINT person_pk
FOR (n:Person) REQUIRE (n.id) IS KEY,

(:Person)-[:hasInterest]->(:Tag),
(:Person)-[:isLocatedIn]->(:City),
(:Person)-[:studyAt { classYear :: UINT64 }]->(:University),
(:Person)-[:workAt { workFrom :: UINT64 }]->(:Company),
(:Person)-[:knows { creationDate :: ZONED DATETIME }]->(:Person),

(:Forum => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    title :: STRING
}),

CONSTRAINT forum_pk
FOR (n:Forum) REQUIRE (n.id) IS KEY,

(:Forum)-[:hasTag]->(:Tag),
(:Forum)-[:hasMember { creationDate :: ZONED DATETIME, joinDate :: UINT64 }]->(:Person),
(:Forum)-[:hasModerator]->(:Person),

ABSTRACT (:Message => {
    id :: UINT64 NOT NULL,
    creationDate :: ZONED DATETIME,
    browserUsed :: STRING,
    locationIP :: STRING,
    content :: STRING,
    length :: UINT64
}),

CONSTRAINT message_pk
FOR (n:Message) REQUIRE (n.id) IS KEY,

(:Post => :Message += {
    language :: STRING,
    imageFile :: STRING
}),

(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(:Post),
(:Post)-[:hasCreator]->(:Person),
(:Post)-[:isLocatedIn]->(:Country),
(:Forum)-[:containerOf]->(:Post),

(:Comment => :Message),

(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(:Comment),
(:Comment)-[:hasCreator]->(:Person),
(:Comment)-[:isLocatedIn]->(:Country),

(:Comment)-[:replyOf]->(<:Message),
(:Person)-[:likes { creationDate :: ZONED DATETIME }]->(<:Message),
(<:Message)-[:hasCreator]->(:Person),
(<:Message)-[:isLocatedIn]->(:Country),
(<:Message)-[:hasTag]->(:Tag)
```

## Schema analysis

### Node type hierarchy

The schema defines three inheritance hierarchies:

**Geographic hierarchy:**
- `Place` (abstract) → `City`, `Country`, `Continent`

**Organizational hierarchy:**
- `Organization` (abstract) → `University`, `Company`

**Content hierarchy:**
- `Message` (abstract) → `Post`, `Comment`

### Edge type families

Several edge labels form type families connecting different node combinations:

**Location relationships (`isPartOf`):**
- Cities belong to countries/regions: `(:City)-[:isPartOf]->(:Country)`
- Countries/regions belong to continents: `(:Country)-[:isPartOf]->(:Continent)`

**Content interactions (`likes`):**
- People like posts: `(:Person)-[:likes]->(:Post)`
- People like comments: `(:Person)-[:likes]->(:Comment)`
- People like messages: `(:Person)-[:likes]->(<:Message)`

**Geographic location (`isLocatedIn`):**
- People live in cities: `(:Person)-[:isLocatedIn]->(:City)`
- Universities located in cities: `(:University)-[:isLocatedIn]->(:City)`
- Companies located in countries/regions: `(:Company)-[:isLocatedIn]->(:Country)`
- Posts located in countries/regions: `(:Post)-[:isLocatedIn]->(:Country)`
- Comments located in countries/regions: `(:Comment)-[:isLocatedIn]->(:Country)`

### Key constraints

Every node type has a corresponding key constraint ensuring unique identification by `id` property:
- `tag_class_pk`, `tag_pk`, `place_pk`, `organization_pk`, `person_pk`, `forum_pk`, `message_pk`

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL graph types](gql-graph-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)
