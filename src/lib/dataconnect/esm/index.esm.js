import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'nex-studio-sql',
  location: 'asia-northeast3'
};

export const createQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuote', inputVars);
}
createQuoteRef.operationName = 'CreateQuote';

export function createQuote(dcOrVars, vars) {
  return executeMutation(createQuoteRef(dcOrVars, vars));
}

export const updateQuoteStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteStatus', inputVars);
}
updateQuoteStatusRef.operationName = 'UpdateQuoteStatus';

export function updateQuoteStatus(dcOrVars, vars) {
  return executeMutation(updateQuoteStatusRef(dcOrVars, vars));
}

export const deleteQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuote', inputVars);
}
deleteQuoteRef.operationName = 'DeleteQuote';

export function deleteQuote(dcOrVars, vars) {
  return executeMutation(deleteQuoteRef(dcOrVars, vars));
}

export const upsertPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPortfolio', inputVars);
}
upsertPortfolioRef.operationName = 'UpsertPortfolio';

export function upsertPortfolio(dcOrVars, vars) {
  return executeMutation(upsertPortfolioRef(dcOrVars, vars));
}

export const deletePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePortfolio', inputVars);
}
deletePortfolioRef.operationName = 'DeletePortfolio';

export function deletePortfolio(dcOrVars, vars) {
  return executeMutation(deletePortfolioRef(dcOrVars, vars));
}

export const upsertQuotePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertQuotePlan', inputVars);
}
upsertQuotePlanRef.operationName = 'UpsertQuotePlan';

export function upsertQuotePlan(dcOrVars, vars) {
  return executeMutation(upsertQuotePlanRef(dcOrVars, vars));
}

export const upsertQuoteFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertQuoteFeature', inputVars);
}
upsertQuoteFeatureRef.operationName = 'UpsertQuoteFeature';

export function upsertQuoteFeature(dcOrVars, vars) {
  return executeMutation(upsertQuoteFeatureRef(dcOrVars, vars));
}

export const upsertEventConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertEventConfig', inputVars);
}
upsertEventConfigRef.operationName = 'UpsertEventConfig';

export function upsertEventConfig(dcOrVars, vars) {
  return executeMutation(upsertEventConfigRef(dcOrVars, vars));
}

export const listPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPortfolios');
}
listPortfoliosRef.operationName = 'ListPortfolios';

export function listPortfolios(dc) {
  return executeQuery(listPortfoliosRef(dc));
}

export const listQuotePlansRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuotePlans');
}
listQuotePlansRef.operationName = 'ListQuotePlans';

export function listQuotePlans(dc) {
  return executeQuery(listQuotePlansRef(dc));
}

export const listQuoteFeaturesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuoteFeatures');
}
listQuoteFeaturesRef.operationName = 'ListQuoteFeatures';

export function listQuoteFeatures(dc) {
  return executeQuery(listQuoteFeaturesRef(dc));
}

export const getEventConfigRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEventConfig');
}
getEventConfigRef.operationName = 'GetEventConfig';

export function getEventConfig(dc) {
  return executeQuery(getEventConfigRef(dc));
}

export const listQuotesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuotes');
}
listQuotesRef.operationName = 'ListQuotes';

export function listQuotes(dc) {
  return executeQuery(listQuotesRef(dc));
}

