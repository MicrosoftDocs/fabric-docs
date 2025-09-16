---
title: GQL Schema Example - Social Network
description: Complete schema definition for the social network domain used throughout GQL documentation examples in graph for Microsoft Fabric.
ms.topic: reference
ms.date: 09/15/2025
author: spmsft
ms.author: splantikow
ms.reviewer: eur
ms.service: fabric
#ms.subservice: graph
---

# GQL schema example: Social network

This article provides the complete technical specification for the social network graph type used throughout the GQL documentation. This schema demonstrates many common features of complex graphs and serves as the foundation for all query examples in the GQL language documentation.

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

- **Node type inheritance** using abstract base types (`Message`, `Organisation`, `Place`)
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
(:Organisation => { id :: UINT64 NOT NULL, name :: STRING, url :: STRING }),

(:University => :Organisation),
(:Company => :Organisation),

CONSTRAINT organisation_pk
FOR (n:Organisation) REQUIRE (n.id) IS KEY,

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
- `Organisation` (abstract) → `University`, `Company`

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
- Posts/comments located in countries/regions: `(:Post|Comment)-[:isLocatedIn]->(:Country)`

### Key constraints

Every node type has a corresponding key constraint ensuring unique identification by `id` property:
- `tag_class_pk`, `tag_pk`, `place_pk`, `organisation_pk`, `person_pk`, `forum_pk`, `message_pk`

## Related content

- [GQL language guide](gql-language-guide.md)
- [GQL graph types](gql-graph-types.md)
- [Try Microsoft Fabric for free](/fabric/fundamentals/fabric-trial)