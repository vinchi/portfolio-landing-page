# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPortfolios*](#listportfolios)
  - [*ListQuotePlans*](#listquoteplans)
  - [*ListQuoteFeatures*](#listquotefeatures)
  - [*GetEventConfig*](#geteventconfig)
  - [*ListQuotes*](#listquotes)
- [**Mutations**](#mutations)
  - [*CreateQuote*](#createquote)
  - [*UpdateQuoteStatus*](#updatequotestatus)
  - [*DeleteQuote*](#deletequote)
  - [*UpsertPortfolio*](#upsertportfolio)
  - [*DeletePortfolio*](#deleteportfolio)
  - [*UpsertQuotePlan*](#upsertquoteplan)
  - [*UpsertQuoteFeature*](#upsertquotefeature)
  - [*UpsertEventConfig*](#upserteventconfig)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@nex-studio/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@nex-studio/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@nex-studio/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPortfolios
You can execute the `ListPortfolios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listPortfolios(): QueryPromise<ListPortfoliosData, undefined>;

interface ListPortfoliosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPortfoliosData, undefined>;
}
export const listPortfoliosRef: ListPortfoliosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPortfolios(dc: DataConnect): QueryPromise<ListPortfoliosData, undefined>;

interface ListPortfoliosRef {
  ...
  (dc: DataConnect): QueryRef<ListPortfoliosData, undefined>;
}
export const listPortfoliosRef: ListPortfoliosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPortfoliosRef:
```typescript
const name = listPortfoliosRef.operationName;
console.log(name);
```

### Variables
The `ListPortfolios` query has no variables.
### Return Type
Recall that executing the `ListPortfolios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPortfoliosData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPortfoliosData {
  portfolios: ({
    id: string;
    name: string;
    category: string;
    url: string;
    displayUrl?: string | null;
    thumbnail?: string | null;
    description?: string | null;
    matchedPlanId?: string | null;
    sortOrder: number;
  } & Portfolio_Key)[];
}
```
### Using `ListPortfolios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPortfolios } from '@nex-studio/dataconnect';


// Call the `listPortfolios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPortfolios();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPortfolios(dataConnect);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
listPortfolios().then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

### Using `ListPortfolios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPortfoliosRef } from '@nex-studio/dataconnect';


// Call the `listPortfoliosRef()` function to get a reference to the query.
const ref = listPortfoliosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPortfoliosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

## ListQuotePlans
You can execute the `ListQuotePlans` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listQuotePlans(): QueryPromise<ListQuotePlansData, undefined>;

interface ListQuotePlansRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuotePlansData, undefined>;
}
export const listQuotePlansRef: ListQuotePlansRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuotePlans(dc: DataConnect): QueryPromise<ListQuotePlansData, undefined>;

interface ListQuotePlansRef {
  ...
  (dc: DataConnect): QueryRef<ListQuotePlansData, undefined>;
}
export const listQuotePlansRef: ListQuotePlansRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuotePlansRef:
```typescript
const name = listQuotePlansRef.operationName;
console.log(name);
```

### Variables
The `ListQuotePlans` query has no variables.
### Return Type
Recall that executing the `ListQuotePlans` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuotePlansData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuotePlansData {
  quotePlans: ({
    id: string;
    name: string;
    subtitle?: string | null;
    price: number;
    days: number;
    sortOrder: number;
  } & QuotePlan_Key)[];
}
```
### Using `ListQuotePlans`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuotePlans } from '@nex-studio/dataconnect';


// Call the `listQuotePlans()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuotePlans();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuotePlans(dataConnect);

console.log(data.quotePlans);

// Or, you can use the `Promise` API.
listQuotePlans().then((response) => {
  const data = response.data;
  console.log(data.quotePlans);
});
```

### Using `ListQuotePlans`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuotePlansRef } from '@nex-studio/dataconnect';


// Call the `listQuotePlansRef()` function to get a reference to the query.
const ref = listQuotePlansRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuotePlansRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quotePlans);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quotePlans);
});
```

## ListQuoteFeatures
You can execute the `ListQuoteFeatures` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listQuoteFeatures(): QueryPromise<ListQuoteFeaturesData, undefined>;

interface ListQuoteFeaturesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteFeaturesData, undefined>;
}
export const listQuoteFeaturesRef: ListQuoteFeaturesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuoteFeatures(dc: DataConnect): QueryPromise<ListQuoteFeaturesData, undefined>;

interface ListQuoteFeaturesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuoteFeaturesData, undefined>;
}
export const listQuoteFeaturesRef: ListQuoteFeaturesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuoteFeaturesRef:
```typescript
const name = listQuoteFeaturesRef.operationName;
console.log(name);
```

### Variables
The `ListQuoteFeatures` query has no variables.
### Return Type
Recall that executing the `ListQuoteFeatures` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuoteFeaturesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuoteFeaturesData {
  quoteFeatures: ({
    id: string;
    name: string;
    description?: string | null;
    price: number;
    days: number;
    sortOrder: number;
  } & QuoteFeature_Key)[];
}
```
### Using `ListQuoteFeatures`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuoteFeatures } from '@nex-studio/dataconnect';


// Call the `listQuoteFeatures()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuoteFeatures();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuoteFeatures(dataConnect);

console.log(data.quoteFeatures);

// Or, you can use the `Promise` API.
listQuoteFeatures().then((response) => {
  const data = response.data;
  console.log(data.quoteFeatures);
});
```

### Using `ListQuoteFeatures`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuoteFeaturesRef } from '@nex-studio/dataconnect';


// Call the `listQuoteFeaturesRef()` function to get a reference to the query.
const ref = listQuoteFeaturesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuoteFeaturesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quoteFeatures);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteFeatures);
});
```

## GetEventConfig
You can execute the `GetEventConfig` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getEventConfig(): QueryPromise<GetEventConfigData, undefined>;

interface GetEventConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEventConfigData, undefined>;
}
export const getEventConfigRef: GetEventConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEventConfig(dc: DataConnect): QueryPromise<GetEventConfigData, undefined>;

interface GetEventConfigRef {
  ...
  (dc: DataConnect): QueryRef<GetEventConfigData, undefined>;
}
export const getEventConfigRef: GetEventConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEventConfigRef:
```typescript
const name = getEventConfigRef.operationName;
console.log(name);
```

### Variables
The `GetEventConfig` query has no variables.
### Return Type
Recall that executing the `GetEventConfig` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEventConfigData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEventConfigData {
  eventConfig?: {
    id: number;
    isHalfPriceActive: boolean;
    title: string;
    subtitle: string;
  } & EventConfig_Key;
}
```
### Using `GetEventConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEventConfig } from '@nex-studio/dataconnect';


// Call the `getEventConfig()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEventConfig();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEventConfig(dataConnect);

console.log(data.eventConfig);

// Or, you can use the `Promise` API.
getEventConfig().then((response) => {
  const data = response.data;
  console.log(data.eventConfig);
});
```

### Using `GetEventConfig`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEventConfigRef } from '@nex-studio/dataconnect';


// Call the `getEventConfigRef()` function to get a reference to the query.
const ref = getEventConfigRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEventConfigRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.eventConfig);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.eventConfig);
});
```

## ListQuotes
You can execute the `ListQuotes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listQuotes(): QueryPromise<ListQuotesData, undefined>;

interface ListQuotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuotesData, undefined>;
}
export const listQuotesRef: ListQuotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listQuotes(dc: DataConnect): QueryPromise<ListQuotesData, undefined>;

interface ListQuotesRef {
  ...
  (dc: DataConnect): QueryRef<ListQuotesData, undefined>;
}
export const listQuotesRef: ListQuotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listQuotesRef:
```typescript
const name = listQuotesRef.operationName;
console.log(name);
```

### Variables
The `ListQuotes` query has no variables.
### Return Type
Recall that executing the `ListQuotes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListQuotesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListQuotesData {
  quotes: ({
    id: string;
    clientNameEnc: string;
    clientContactEnc: string;
    clientMemoEnc?: string | null;
    planName: string;
    featureNames: string[];
    scheduleName: string;
    totalPrice: number;
    totalDays: number;
    status: string;
    createdAt: TimestampString;
  } & Quote_Key)[];
}
```
### Using `ListQuotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listQuotes } from '@nex-studio/dataconnect';


// Call the `listQuotes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listQuotes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listQuotes(dataConnect);

console.log(data.quotes);

// Or, you can use the `Promise` API.
listQuotes().then((response) => {
  const data = response.data;
  console.log(data.quotes);
});
```

### Using `ListQuotes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listQuotesRef } from '@nex-studio/dataconnect';


// Call the `listQuotesRef()` function to get a reference to the query.
const ref = listQuotesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listQuotesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quotes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quotes);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateQuote
You can execute the `CreateQuote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createQuote(vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface CreateQuoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
}
export const createQuoteRef: CreateQuoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createQuote(dc: DataConnect, vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface CreateQuoteRef {
  ...
  (dc: DataConnect, vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
}
export const createQuoteRef: CreateQuoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createQuoteRef:
```typescript
const name = createQuoteRef.operationName;
console.log(name);
```

### Variables
The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateQuoteVariables {
  id: string;
  clientNameEnc: string;
  clientContactEnc: string;
  clientMemoEnc?: string | null;
  planName: string;
  featureNames: string[];
  scheduleName: string;
  totalPrice: number;
  totalDays: number;
}
```
### Return Type
Recall that executing the `CreateQuote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateQuoteData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateQuoteData {
  quote_insert: Quote_Key;
}
```
### Using `CreateQuote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createQuote, CreateQuoteVariables } from '@nex-studio/dataconnect';

// The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`:
const createQuoteVars: CreateQuoteVariables = {
  id: ..., 
  clientNameEnc: ..., 
  clientContactEnc: ..., 
  clientMemoEnc: ..., // optional
  planName: ..., 
  featureNames: ..., 
  scheduleName: ..., 
  totalPrice: ..., 
  totalDays: ..., 
};

// Call the `createQuote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createQuote(createQuoteVars);
// Variables can be defined inline as well.
const { data } = await createQuote({ id: ..., clientNameEnc: ..., clientContactEnc: ..., clientMemoEnc: ..., planName: ..., featureNames: ..., scheduleName: ..., totalPrice: ..., totalDays: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createQuote(dataConnect, createQuoteVars);

console.log(data.quote_insert);

// Or, you can use the `Promise` API.
createQuote(createQuoteVars).then((response) => {
  const data = response.data;
  console.log(data.quote_insert);
});
```

### Using `CreateQuote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createQuoteRef, CreateQuoteVariables } from '@nex-studio/dataconnect';

// The `CreateQuote` mutation requires an argument of type `CreateQuoteVariables`:
const createQuoteVars: CreateQuoteVariables = {
  id: ..., 
  clientNameEnc: ..., 
  clientContactEnc: ..., 
  clientMemoEnc: ..., // optional
  planName: ..., 
  featureNames: ..., 
  scheduleName: ..., 
  totalPrice: ..., 
  totalDays: ..., 
};

// Call the `createQuoteRef()` function to get a reference to the mutation.
const ref = createQuoteRef(createQuoteVars);
// Variables can be defined inline as well.
const ref = createQuoteRef({ id: ..., clientNameEnc: ..., clientContactEnc: ..., clientMemoEnc: ..., planName: ..., featureNames: ..., scheduleName: ..., totalPrice: ..., totalDays: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createQuoteRef(dataConnect, createQuoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quote_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quote_insert);
});
```

## UpdateQuoteStatus
You can execute the `UpdateQuoteStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateQuoteStatus(vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface UpdateQuoteStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateQuoteStatus(dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface UpdateQuoteStatusRef {
  ...
  (dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateQuoteStatusRef:
```typescript
const name = updateQuoteStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateQuoteStatusVariables {
  id: string;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateQuoteStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateQuoteStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}
```
### Using `UpdateQuoteStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateQuoteStatus, UpdateQuoteStatusVariables } from '@nex-studio/dataconnect';

// The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`:
const updateQuoteStatusVars: UpdateQuoteStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateQuoteStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateQuoteStatus(updateQuoteStatusVars);
// Variables can be defined inline as well.
const { data } = await updateQuoteStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateQuoteStatus(dataConnect, updateQuoteStatusVars);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
updateQuoteStatus(updateQuoteStatusVars).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

### Using `UpdateQuoteStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateQuoteStatusRef, UpdateQuoteStatusVariables } from '@nex-studio/dataconnect';

// The `UpdateQuoteStatus` mutation requires an argument of type `UpdateQuoteStatusVariables`:
const updateQuoteStatusVars: UpdateQuoteStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateQuoteStatusRef()` function to get a reference to the mutation.
const ref = updateQuoteStatusRef(updateQuoteStatusVars);
// Variables can be defined inline as well.
const ref = updateQuoteStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateQuoteStatusRef(dataConnect, updateQuoteStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quote_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quote_update);
});
```

## DeleteQuote
You can execute the `DeleteQuote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteQuote(vars: DeleteQuoteVariables): MutationPromise<DeleteQuoteData, DeleteQuoteVariables>;

interface DeleteQuoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteVariables): MutationRef<DeleteQuoteData, DeleteQuoteVariables>;
}
export const deleteQuoteRef: DeleteQuoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteQuote(dc: DataConnect, vars: DeleteQuoteVariables): MutationPromise<DeleteQuoteData, DeleteQuoteVariables>;

interface DeleteQuoteRef {
  ...
  (dc: DataConnect, vars: DeleteQuoteVariables): MutationRef<DeleteQuoteData, DeleteQuoteVariables>;
}
export const deleteQuoteRef: DeleteQuoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteQuoteRef:
```typescript
const name = deleteQuoteRef.operationName;
console.log(name);
```

### Variables
The `DeleteQuote` mutation requires an argument of type `DeleteQuoteVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteQuoteVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteQuote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteQuoteData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteQuoteData {
  quote_delete?: Quote_Key | null;
}
```
### Using `DeleteQuote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteQuote, DeleteQuoteVariables } from '@nex-studio/dataconnect';

// The `DeleteQuote` mutation requires an argument of type `DeleteQuoteVariables`:
const deleteQuoteVars: DeleteQuoteVariables = {
  id: ..., 
};

// Call the `deleteQuote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteQuote(deleteQuoteVars);
// Variables can be defined inline as well.
const { data } = await deleteQuote({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteQuote(dataConnect, deleteQuoteVars);

console.log(data.quote_delete);

// Or, you can use the `Promise` API.
deleteQuote(deleteQuoteVars).then((response) => {
  const data = response.data;
  console.log(data.quote_delete);
});
```

### Using `DeleteQuote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteQuoteRef, DeleteQuoteVariables } from '@nex-studio/dataconnect';

// The `DeleteQuote` mutation requires an argument of type `DeleteQuoteVariables`:
const deleteQuoteVars: DeleteQuoteVariables = {
  id: ..., 
};

// Call the `deleteQuoteRef()` function to get a reference to the mutation.
const ref = deleteQuoteRef(deleteQuoteVars);
// Variables can be defined inline as well.
const ref = deleteQuoteRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteQuoteRef(dataConnect, deleteQuoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quote_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quote_delete);
});
```

## UpsertPortfolio
You can execute the `UpsertPortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertPortfolio(vars: UpsertPortfolioVariables): MutationPromise<UpsertPortfolioData, UpsertPortfolioVariables>;

interface UpsertPortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPortfolioVariables): MutationRef<UpsertPortfolioData, UpsertPortfolioVariables>;
}
export const upsertPortfolioRef: UpsertPortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPortfolio(dc: DataConnect, vars: UpsertPortfolioVariables): MutationPromise<UpsertPortfolioData, UpsertPortfolioVariables>;

interface UpsertPortfolioRef {
  ...
  (dc: DataConnect, vars: UpsertPortfolioVariables): MutationRef<UpsertPortfolioData, UpsertPortfolioVariables>;
}
export const upsertPortfolioRef: UpsertPortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPortfolioRef:
```typescript
const name = upsertPortfolioRef.operationName;
console.log(name);
```

### Variables
The `UpsertPortfolio` mutation requires an argument of type `UpsertPortfolioVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertPortfolioVariables {
  id: string;
  name: string;
  category: string;
  url: string;
  displayUrl?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  matchedPlanId?: string | null;
  sortOrder: number;
}
```
### Return Type
Recall that executing the `UpsertPortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPortfolioData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPortfolioData {
  portfolio_upsert: Portfolio_Key;
}
```
### Using `UpsertPortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPortfolio, UpsertPortfolioVariables } from '@nex-studio/dataconnect';

// The `UpsertPortfolio` mutation requires an argument of type `UpsertPortfolioVariables`:
const upsertPortfolioVars: UpsertPortfolioVariables = {
  id: ..., 
  name: ..., 
  category: ..., 
  url: ..., 
  displayUrl: ..., // optional
  thumbnail: ..., // optional
  description: ..., // optional
  matchedPlanId: ..., // optional
  sortOrder: ..., 
};

// Call the `upsertPortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPortfolio(upsertPortfolioVars);
// Variables can be defined inline as well.
const { data } = await upsertPortfolio({ id: ..., name: ..., category: ..., url: ..., displayUrl: ..., thumbnail: ..., description: ..., matchedPlanId: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPortfolio(dataConnect, upsertPortfolioVars);

console.log(data.portfolio_upsert);

// Or, you can use the `Promise` API.
upsertPortfolio(upsertPortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio_upsert);
});
```

### Using `UpsertPortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPortfolioRef, UpsertPortfolioVariables } from '@nex-studio/dataconnect';

// The `UpsertPortfolio` mutation requires an argument of type `UpsertPortfolioVariables`:
const upsertPortfolioVars: UpsertPortfolioVariables = {
  id: ..., 
  name: ..., 
  category: ..., 
  url: ..., 
  displayUrl: ..., // optional
  thumbnail: ..., // optional
  description: ..., // optional
  matchedPlanId: ..., // optional
  sortOrder: ..., 
};

// Call the `upsertPortfolioRef()` function to get a reference to the mutation.
const ref = upsertPortfolioRef(upsertPortfolioVars);
// Variables can be defined inline as well.
const ref = upsertPortfolioRef({ id: ..., name: ..., category: ..., url: ..., displayUrl: ..., thumbnail: ..., description: ..., matchedPlanId: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPortfolioRef(dataConnect, upsertPortfolioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.portfolio_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio_upsert);
});
```

## DeletePortfolio
You can execute the `DeletePortfolio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deletePortfolio(vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface DeletePortfolioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
}
export const deletePortfolioRef: DeletePortfolioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePortfolio(dc: DataConnect, vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface DeletePortfolioRef {
  ...
  (dc: DataConnect, vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
}
export const deletePortfolioRef: DeletePortfolioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePortfolioRef:
```typescript
const name = deletePortfolioRef.operationName;
console.log(name);
```

### Variables
The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePortfolioVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeletePortfolio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePortfolioData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePortfolioData {
  portfolio_delete?: Portfolio_Key | null;
}
```
### Using `DeletePortfolio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePortfolio, DeletePortfolioVariables } from '@nex-studio/dataconnect';

// The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`:
const deletePortfolioVars: DeletePortfolioVariables = {
  id: ..., 
};

// Call the `deletePortfolio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePortfolio(deletePortfolioVars);
// Variables can be defined inline as well.
const { data } = await deletePortfolio({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePortfolio(dataConnect, deletePortfolioVars);

console.log(data.portfolio_delete);

// Or, you can use the `Promise` API.
deletePortfolio(deletePortfolioVars).then((response) => {
  const data = response.data;
  console.log(data.portfolio_delete);
});
```

### Using `DeletePortfolio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePortfolioRef, DeletePortfolioVariables } from '@nex-studio/dataconnect';

// The `DeletePortfolio` mutation requires an argument of type `DeletePortfolioVariables`:
const deletePortfolioVars: DeletePortfolioVariables = {
  id: ..., 
};

// Call the `deletePortfolioRef()` function to get a reference to the mutation.
const ref = deletePortfolioRef(deletePortfolioVars);
// Variables can be defined inline as well.
const ref = deletePortfolioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePortfolioRef(dataConnect, deletePortfolioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.portfolio_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolio_delete);
});
```

## UpsertQuotePlan
You can execute the `UpsertQuotePlan` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertQuotePlan(vars: UpsertQuotePlanVariables): MutationPromise<UpsertQuotePlanData, UpsertQuotePlanVariables>;

interface UpsertQuotePlanRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuotePlanVariables): MutationRef<UpsertQuotePlanData, UpsertQuotePlanVariables>;
}
export const upsertQuotePlanRef: UpsertQuotePlanRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertQuotePlan(dc: DataConnect, vars: UpsertQuotePlanVariables): MutationPromise<UpsertQuotePlanData, UpsertQuotePlanVariables>;

interface UpsertQuotePlanRef {
  ...
  (dc: DataConnect, vars: UpsertQuotePlanVariables): MutationRef<UpsertQuotePlanData, UpsertQuotePlanVariables>;
}
export const upsertQuotePlanRef: UpsertQuotePlanRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertQuotePlanRef:
```typescript
const name = upsertQuotePlanRef.operationName;
console.log(name);
```

### Variables
The `UpsertQuotePlan` mutation requires an argument of type `UpsertQuotePlanVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertQuotePlanVariables {
  id: string;
  name: string;
  subtitle?: string | null;
  price: number;
  days: number;
  sortOrder: number;
}
```
### Return Type
Recall that executing the `UpsertQuotePlan` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertQuotePlanData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertQuotePlanData {
  quotePlan_upsert: QuotePlan_Key;
}
```
### Using `UpsertQuotePlan`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertQuotePlan, UpsertQuotePlanVariables } from '@nex-studio/dataconnect';

// The `UpsertQuotePlan` mutation requires an argument of type `UpsertQuotePlanVariables`:
const upsertQuotePlanVars: UpsertQuotePlanVariables = {
  id: ..., 
  name: ..., 
  subtitle: ..., // optional
  price: ..., 
  days: ..., 
  sortOrder: ..., 
};

// Call the `upsertQuotePlan()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertQuotePlan(upsertQuotePlanVars);
// Variables can be defined inline as well.
const { data } = await upsertQuotePlan({ id: ..., name: ..., subtitle: ..., price: ..., days: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertQuotePlan(dataConnect, upsertQuotePlanVars);

console.log(data.quotePlan_upsert);

// Or, you can use the `Promise` API.
upsertQuotePlan(upsertQuotePlanVars).then((response) => {
  const data = response.data;
  console.log(data.quotePlan_upsert);
});
```

### Using `UpsertQuotePlan`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertQuotePlanRef, UpsertQuotePlanVariables } from '@nex-studio/dataconnect';

// The `UpsertQuotePlan` mutation requires an argument of type `UpsertQuotePlanVariables`:
const upsertQuotePlanVars: UpsertQuotePlanVariables = {
  id: ..., 
  name: ..., 
  subtitle: ..., // optional
  price: ..., 
  days: ..., 
  sortOrder: ..., 
};

// Call the `upsertQuotePlanRef()` function to get a reference to the mutation.
const ref = upsertQuotePlanRef(upsertQuotePlanVars);
// Variables can be defined inline as well.
const ref = upsertQuotePlanRef({ id: ..., name: ..., subtitle: ..., price: ..., days: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertQuotePlanRef(dataConnect, upsertQuotePlanVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quotePlan_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quotePlan_upsert);
});
```

## UpsertQuoteFeature
You can execute the `UpsertQuoteFeature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertQuoteFeature(vars: UpsertQuoteFeatureVariables): MutationPromise<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;

interface UpsertQuoteFeatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuoteFeatureVariables): MutationRef<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;
}
export const upsertQuoteFeatureRef: UpsertQuoteFeatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertQuoteFeature(dc: DataConnect, vars: UpsertQuoteFeatureVariables): MutationPromise<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;

interface UpsertQuoteFeatureRef {
  ...
  (dc: DataConnect, vars: UpsertQuoteFeatureVariables): MutationRef<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;
}
export const upsertQuoteFeatureRef: UpsertQuoteFeatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertQuoteFeatureRef:
```typescript
const name = upsertQuoteFeatureRef.operationName;
console.log(name);
```

### Variables
The `UpsertQuoteFeature` mutation requires an argument of type `UpsertQuoteFeatureVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertQuoteFeatureVariables {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  days: number;
  sortOrder: number;
}
```
### Return Type
Recall that executing the `UpsertQuoteFeature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertQuoteFeatureData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertQuoteFeatureData {
  quoteFeature_upsert: QuoteFeature_Key;
}
```
### Using `UpsertQuoteFeature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertQuoteFeature, UpsertQuoteFeatureVariables } from '@nex-studio/dataconnect';

// The `UpsertQuoteFeature` mutation requires an argument of type `UpsertQuoteFeatureVariables`:
const upsertQuoteFeatureVars: UpsertQuoteFeatureVariables = {
  id: ..., 
  name: ..., 
  description: ..., // optional
  price: ..., 
  days: ..., 
  sortOrder: ..., 
};

// Call the `upsertQuoteFeature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertQuoteFeature(upsertQuoteFeatureVars);
// Variables can be defined inline as well.
const { data } = await upsertQuoteFeature({ id: ..., name: ..., description: ..., price: ..., days: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertQuoteFeature(dataConnect, upsertQuoteFeatureVars);

console.log(data.quoteFeature_upsert);

// Or, you can use the `Promise` API.
upsertQuoteFeature(upsertQuoteFeatureVars).then((response) => {
  const data = response.data;
  console.log(data.quoteFeature_upsert);
});
```

### Using `UpsertQuoteFeature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertQuoteFeatureRef, UpsertQuoteFeatureVariables } from '@nex-studio/dataconnect';

// The `UpsertQuoteFeature` mutation requires an argument of type `UpsertQuoteFeatureVariables`:
const upsertQuoteFeatureVars: UpsertQuoteFeatureVariables = {
  id: ..., 
  name: ..., 
  description: ..., // optional
  price: ..., 
  days: ..., 
  sortOrder: ..., 
};

// Call the `upsertQuoteFeatureRef()` function to get a reference to the mutation.
const ref = upsertQuoteFeatureRef(upsertQuoteFeatureVars);
// Variables can be defined inline as well.
const ref = upsertQuoteFeatureRef({ id: ..., name: ..., description: ..., price: ..., days: ..., sortOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertQuoteFeatureRef(dataConnect, upsertQuoteFeatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quoteFeature_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quoteFeature_upsert);
});
```

## UpsertEventConfig
You can execute the `UpsertEventConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertEventConfig(vars: UpsertEventConfigVariables): MutationPromise<UpsertEventConfigData, UpsertEventConfigVariables>;

interface UpsertEventConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertEventConfigVariables): MutationRef<UpsertEventConfigData, UpsertEventConfigVariables>;
}
export const upsertEventConfigRef: UpsertEventConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertEventConfig(dc: DataConnect, vars: UpsertEventConfigVariables): MutationPromise<UpsertEventConfigData, UpsertEventConfigVariables>;

interface UpsertEventConfigRef {
  ...
  (dc: DataConnect, vars: UpsertEventConfigVariables): MutationRef<UpsertEventConfigData, UpsertEventConfigVariables>;
}
export const upsertEventConfigRef: UpsertEventConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertEventConfigRef:
```typescript
const name = upsertEventConfigRef.operationName;
console.log(name);
```

### Variables
The `UpsertEventConfig` mutation requires an argument of type `UpsertEventConfigVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertEventConfigVariables {
  isHalfPriceActive: boolean;
  title: string;
  subtitle: string;
}
```
### Return Type
Recall that executing the `UpsertEventConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertEventConfigData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertEventConfigData {
  eventConfig_upsert: EventConfig_Key;
}
```
### Using `UpsertEventConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertEventConfig, UpsertEventConfigVariables } from '@nex-studio/dataconnect';

// The `UpsertEventConfig` mutation requires an argument of type `UpsertEventConfigVariables`:
const upsertEventConfigVars: UpsertEventConfigVariables = {
  isHalfPriceActive: ..., 
  title: ..., 
  subtitle: ..., 
};

// Call the `upsertEventConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertEventConfig(upsertEventConfigVars);
// Variables can be defined inline as well.
const { data } = await upsertEventConfig({ isHalfPriceActive: ..., title: ..., subtitle: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertEventConfig(dataConnect, upsertEventConfigVars);

console.log(data.eventConfig_upsert);

// Or, you can use the `Promise` API.
upsertEventConfig(upsertEventConfigVars).then((response) => {
  const data = response.data;
  console.log(data.eventConfig_upsert);
});
```

### Using `UpsertEventConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertEventConfigRef, UpsertEventConfigVariables } from '@nex-studio/dataconnect';

// The `UpsertEventConfig` mutation requires an argument of type `UpsertEventConfigVariables`:
const upsertEventConfigVars: UpsertEventConfigVariables = {
  isHalfPriceActive: ..., 
  title: ..., 
  subtitle: ..., 
};

// Call the `upsertEventConfigRef()` function to get a reference to the mutation.
const ref = upsertEventConfigRef(upsertEventConfigVars);
// Variables can be defined inline as well.
const ref = upsertEventConfigRef({ isHalfPriceActive: ..., title: ..., subtitle: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertEventConfigRef(dataConnect, upsertEventConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.eventConfig_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.eventConfig_upsert);
});
```

