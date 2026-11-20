import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateQuoteData {
  quote_insert: Quote_Key;
}

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

export interface DeletePortfolioData {
  portfolio_delete?: Portfolio_Key | null;
}

export interface DeletePortfolioVariables {
  id: string;
}

export interface DeleteQuoteData {
  quote_delete?: Quote_Key | null;
}

export interface DeleteQuoteVariables {
  id: string;
}

export interface EventConfig_Key {
  id: number;
  __typename?: 'EventConfig_Key';
}

export interface GetEventConfigData {
  eventConfig?: {
    id: number;
    isHalfPriceActive: boolean;
    title: string;
    subtitle: string;
  } & EventConfig_Key;
}

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

export interface Portfolio_Key {
  id: string;
  __typename?: 'Portfolio_Key';
}

export interface QuoteFeature_Key {
  id: string;
  __typename?: 'QuoteFeature_Key';
}

export interface QuotePlan_Key {
  id: string;
  __typename?: 'QuotePlan_Key';
}

export interface Quote_Key {
  id: string;
  __typename?: 'Quote_Key';
}

export interface UpdateQuoteStatusData {
  quote_update?: Quote_Key | null;
}

export interface UpdateQuoteStatusVariables {
  id: string;
  status: string;
}

export interface UpsertEventConfigData {
  eventConfig_upsert: EventConfig_Key;
}

export interface UpsertEventConfigVariables {
  isHalfPriceActive: boolean;
  title: string;
  subtitle: string;
}

export interface UpsertPortfolioData {
  portfolio_upsert: Portfolio_Key;
}

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

export interface UpsertQuoteFeatureData {
  quoteFeature_upsert: QuoteFeature_Key;
}

export interface UpsertQuoteFeatureVariables {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  days: number;
  sortOrder: number;
}

export interface UpsertQuotePlanData {
  quotePlan_upsert: QuotePlan_Key;
}

export interface UpsertQuotePlanVariables {
  id: string;
  name: string;
  subtitle?: string | null;
  price: number;
  days: number;
  sortOrder: number;
}

interface CreateQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateQuoteVariables): MutationRef<CreateQuoteData, CreateQuoteVariables>;
  operationName: string;
}
export const createQuoteRef: CreateQuoteRef;

export function createQuote(vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;
export function createQuote(dc: DataConnect, vars: CreateQuoteVariables): MutationPromise<CreateQuoteData, CreateQuoteVariables>;

interface UpdateQuoteStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationRef<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
  operationName: string;
}
export const updateQuoteStatusRef: UpdateQuoteStatusRef;

export function updateQuoteStatus(vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;
export function updateQuoteStatus(dc: DataConnect, vars: UpdateQuoteStatusVariables): MutationPromise<UpdateQuoteStatusData, UpdateQuoteStatusVariables>;

interface DeleteQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteQuoteVariables): MutationRef<DeleteQuoteData, DeleteQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteQuoteVariables): MutationRef<DeleteQuoteData, DeleteQuoteVariables>;
  operationName: string;
}
export const deleteQuoteRef: DeleteQuoteRef;

export function deleteQuote(vars: DeleteQuoteVariables): MutationPromise<DeleteQuoteData, DeleteQuoteVariables>;
export function deleteQuote(dc: DataConnect, vars: DeleteQuoteVariables): MutationPromise<DeleteQuoteData, DeleteQuoteVariables>;

interface UpsertPortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPortfolioVariables): MutationRef<UpsertPortfolioData, UpsertPortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPortfolioVariables): MutationRef<UpsertPortfolioData, UpsertPortfolioVariables>;
  operationName: string;
}
export const upsertPortfolioRef: UpsertPortfolioRef;

export function upsertPortfolio(vars: UpsertPortfolioVariables): MutationPromise<UpsertPortfolioData, UpsertPortfolioVariables>;
export function upsertPortfolio(dc: DataConnect, vars: UpsertPortfolioVariables): MutationPromise<UpsertPortfolioData, UpsertPortfolioVariables>;

interface DeletePortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePortfolioVariables): MutationRef<DeletePortfolioData, DeletePortfolioVariables>;
  operationName: string;
}
export const deletePortfolioRef: DeletePortfolioRef;

export function deletePortfolio(vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;
export function deletePortfolio(dc: DataConnect, vars: DeletePortfolioVariables): MutationPromise<DeletePortfolioData, DeletePortfolioVariables>;

interface UpsertQuotePlanRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuotePlanVariables): MutationRef<UpsertQuotePlanData, UpsertQuotePlanVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertQuotePlanVariables): MutationRef<UpsertQuotePlanData, UpsertQuotePlanVariables>;
  operationName: string;
}
export const upsertQuotePlanRef: UpsertQuotePlanRef;

export function upsertQuotePlan(vars: UpsertQuotePlanVariables): MutationPromise<UpsertQuotePlanData, UpsertQuotePlanVariables>;
export function upsertQuotePlan(dc: DataConnect, vars: UpsertQuotePlanVariables): MutationPromise<UpsertQuotePlanData, UpsertQuotePlanVariables>;

interface UpsertQuoteFeatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertQuoteFeatureVariables): MutationRef<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertQuoteFeatureVariables): MutationRef<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;
  operationName: string;
}
export const upsertQuoteFeatureRef: UpsertQuoteFeatureRef;

export function upsertQuoteFeature(vars: UpsertQuoteFeatureVariables): MutationPromise<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;
export function upsertQuoteFeature(dc: DataConnect, vars: UpsertQuoteFeatureVariables): MutationPromise<UpsertQuoteFeatureData, UpsertQuoteFeatureVariables>;

interface UpsertEventConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertEventConfigVariables): MutationRef<UpsertEventConfigData, UpsertEventConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertEventConfigVariables): MutationRef<UpsertEventConfigData, UpsertEventConfigVariables>;
  operationName: string;
}
export const upsertEventConfigRef: UpsertEventConfigRef;

export function upsertEventConfig(vars: UpsertEventConfigVariables): MutationPromise<UpsertEventConfigData, UpsertEventConfigVariables>;
export function upsertEventConfig(dc: DataConnect, vars: UpsertEventConfigVariables): MutationPromise<UpsertEventConfigData, UpsertEventConfigVariables>;

interface ListPortfoliosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPortfoliosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPortfoliosData, undefined>;
  operationName: string;
}
export const listPortfoliosRef: ListPortfoliosRef;

export function listPortfolios(): QueryPromise<ListPortfoliosData, undefined>;
export function listPortfolios(dc: DataConnect): QueryPromise<ListPortfoliosData, undefined>;

interface ListQuotePlansRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuotePlansData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuotePlansData, undefined>;
  operationName: string;
}
export const listQuotePlansRef: ListQuotePlansRef;

export function listQuotePlans(): QueryPromise<ListQuotePlansData, undefined>;
export function listQuotePlans(dc: DataConnect): QueryPromise<ListQuotePlansData, undefined>;

interface ListQuoteFeaturesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuoteFeaturesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuoteFeaturesData, undefined>;
  operationName: string;
}
export const listQuoteFeaturesRef: ListQuoteFeaturesRef;

export function listQuoteFeatures(): QueryPromise<ListQuoteFeaturesData, undefined>;
export function listQuoteFeatures(dc: DataConnect): QueryPromise<ListQuoteFeaturesData, undefined>;

interface GetEventConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEventConfigData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetEventConfigData, undefined>;
  operationName: string;
}
export const getEventConfigRef: GetEventConfigRef;

export function getEventConfig(): QueryPromise<GetEventConfigData, undefined>;
export function getEventConfig(dc: DataConnect): QueryPromise<GetEventConfigData, undefined>;

interface ListQuotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListQuotesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListQuotesData, undefined>;
  operationName: string;
}
export const listQuotesRef: ListQuotesRef;

export function listQuotes(): QueryPromise<ListQuotesData, undefined>;
export function listQuotes(dc: DataConnect): QueryPromise<ListQuotesData, undefined>;

