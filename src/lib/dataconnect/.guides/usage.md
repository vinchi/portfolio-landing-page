# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createQuote, updateQuoteStatus, deleteQuote, upsertPortfolio, deletePortfolio, upsertQuotePlan, upsertQuoteFeature, upsertEventConfig, listPortfolios, listQuotePlans } from '@nex-studio/dataconnect';


// Operation CreateQuote:  For variables, look at type CreateQuoteVars in ../index.d.ts
const { data } = await CreateQuote(dataConnect, createQuoteVars);

// Operation UpdateQuoteStatus:  For variables, look at type UpdateQuoteStatusVars in ../index.d.ts
const { data } = await UpdateQuoteStatus(dataConnect, updateQuoteStatusVars);

// Operation DeleteQuote:  For variables, look at type DeleteQuoteVars in ../index.d.ts
const { data } = await DeleteQuote(dataConnect, deleteQuoteVars);

// Operation UpsertPortfolio:  For variables, look at type UpsertPortfolioVars in ../index.d.ts
const { data } = await UpsertPortfolio(dataConnect, upsertPortfolioVars);

// Operation DeletePortfolio:  For variables, look at type DeletePortfolioVars in ../index.d.ts
const { data } = await DeletePortfolio(dataConnect, deletePortfolioVars);

// Operation UpsertQuotePlan:  For variables, look at type UpsertQuotePlanVars in ../index.d.ts
const { data } = await UpsertQuotePlan(dataConnect, upsertQuotePlanVars);

// Operation UpsertQuoteFeature:  For variables, look at type UpsertQuoteFeatureVars in ../index.d.ts
const { data } = await UpsertQuoteFeature(dataConnect, upsertQuoteFeatureVars);

// Operation UpsertEventConfig:  For variables, look at type UpsertEventConfigVars in ../index.d.ts
const { data } = await UpsertEventConfig(dataConnect, upsertEventConfigVars);

// Operation ListPortfolios: 
const { data } = await ListPortfolios(dataConnect);

// Operation ListQuotePlans: 
const { data } = await ListQuotePlans(dataConnect);


```