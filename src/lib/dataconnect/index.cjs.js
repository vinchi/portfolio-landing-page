const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'nex-studio-sql',
  location: 'asia-northeast3'
};
exports.connectorConfig = connectorConfig;

const createQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateQuote', inputVars);
}
createQuoteRef.operationName = 'CreateQuote';
exports.createQuoteRef = createQuoteRef;

exports.createQuote = function createQuote(dcOrVars, vars) {
  return executeMutation(createQuoteRef(dcOrVars, vars));
};

const updateQuoteStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateQuoteStatus', inputVars);
}
updateQuoteStatusRef.operationName = 'UpdateQuoteStatus';
exports.updateQuoteStatusRef = updateQuoteStatusRef;

exports.updateQuoteStatus = function updateQuoteStatus(dcOrVars, vars) {
  return executeMutation(updateQuoteStatusRef(dcOrVars, vars));
};

const deleteQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteQuote', inputVars);
}
deleteQuoteRef.operationName = 'DeleteQuote';
exports.deleteQuoteRef = deleteQuoteRef;

exports.deleteQuote = function deleteQuote(dcOrVars, vars) {
  return executeMutation(deleteQuoteRef(dcOrVars, vars));
};

const upsertPortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPortfolio', inputVars);
}
upsertPortfolioRef.operationName = 'UpsertPortfolio';
exports.upsertPortfolioRef = upsertPortfolioRef;

exports.upsertPortfolio = function upsertPortfolio(dcOrVars, vars) {
  return executeMutation(upsertPortfolioRef(dcOrVars, vars));
};

const deletePortfolioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePortfolio', inputVars);
}
deletePortfolioRef.operationName = 'DeletePortfolio';
exports.deletePortfolioRef = deletePortfolioRef;

exports.deletePortfolio = function deletePortfolio(dcOrVars, vars) {
  return executeMutation(deletePortfolioRef(dcOrVars, vars));
};

const upsertQuotePlanRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertQuotePlan', inputVars);
}
upsertQuotePlanRef.operationName = 'UpsertQuotePlan';
exports.upsertQuotePlanRef = upsertQuotePlanRef;

exports.upsertQuotePlan = function upsertQuotePlan(dcOrVars, vars) {
  return executeMutation(upsertQuotePlanRef(dcOrVars, vars));
};

const upsertQuoteFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertQuoteFeature', inputVars);
}
upsertQuoteFeatureRef.operationName = 'UpsertQuoteFeature';
exports.upsertQuoteFeatureRef = upsertQuoteFeatureRef;

exports.upsertQuoteFeature = function upsertQuoteFeature(dcOrVars, vars) {
  return executeMutation(upsertQuoteFeatureRef(dcOrVars, vars));
};

const upsertEventConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertEventConfig', inputVars);
}
upsertEventConfigRef.operationName = 'UpsertEventConfig';
exports.upsertEventConfigRef = upsertEventConfigRef;

exports.upsertEventConfig = function upsertEventConfig(dcOrVars, vars) {
  return executeMutation(upsertEventConfigRef(dcOrVars, vars));
};

const listPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPortfolios');
}
listPortfoliosRef.operationName = 'ListPortfolios';
exports.listPortfoliosRef = listPortfoliosRef;

exports.listPortfolios = function listPortfolios(dc) {
  return executeQuery(listPortfoliosRef(dc));
};

const listQuotePlansRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuotePlans');
}
listQuotePlansRef.operationName = 'ListQuotePlans';
exports.listQuotePlansRef = listQuotePlansRef;

exports.listQuotePlans = function listQuotePlans(dc) {
  return executeQuery(listQuotePlansRef(dc));
};

const listQuoteFeaturesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuoteFeatures');
}
listQuoteFeaturesRef.operationName = 'ListQuoteFeatures';
exports.listQuoteFeaturesRef = listQuoteFeaturesRef;

exports.listQuoteFeatures = function listQuoteFeatures(dc) {
  return executeQuery(listQuoteFeaturesRef(dc));
};

const getEventConfigRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEventConfig');
}
getEventConfigRef.operationName = 'GetEventConfig';
exports.getEventConfigRef = getEventConfigRef;

exports.getEventConfig = function getEventConfig(dc) {
  return executeQuery(getEventConfigRef(dc));
};

const listQuotesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListQuotes');
}
listQuotesRef.operationName = 'ListQuotes';
exports.listQuotesRef = listQuotesRef;

exports.listQuotes = function listQuotes(dc) {
  return executeQuery(listQuotesRef(dc));
};
