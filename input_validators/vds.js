exports.createVDSInputValidator = function(req, res, next) {
const {
   name,
   referenceId,
   screenWidth,
   screenHeight,
   screenSizeDiagonal,
   aspectRatio,
   resolutionWidth,
   resolutionHeight,
   orientation,
   siteType,
   location,
   locationAddress,
   premises,
   premisesType,
   placement,
   spotduration,
   spotprice,
   currency,
   pricingUnit
} = req.body;

 const validAspectRatios=["16:9", "16:10", "4:3", "2:1", "1:1", "custom", "1:1", "1:2", "3:4", "10:16", "9:16"];
 const validOrientations =["+90", "-90", "180", "0"];
 const validSiteTypes=["stationary", "moving"];
 const validCurrencies = ["USD", "INR"];

 const response = {};
 response.success=false;
 const errors=[];

 if(!name || typeof(name)!=='string') errors.push(_errMsg('name'));
 if(!referenceId || isNaN(Number(referenceId))) errors.push(_errMsg('referenceId'));
 if(Number(referenceId) <=0) errors.push('referenceId should be a non-zero integer')
 if(!screenWidth || isNaN(Number(screenWidth))) errors.push(_errMsg('screenWidth'));
 if(!screenHeight || isNaN(Number(screenHeight))) errors.push(_errMsg('screenHeight'));
 if(!screenSizeDiagonal || isNaN(Number(screenSizeDiagonal))) errors.push(_errMsg('screenSizeDiagonal'));
 if(!aspectRatio || !validAspectRatios.includes(aspectRatio)) errors.push(_errMsg('aspectRatio'));
 if(resolutionWidth && isNaN(Number(resolutionWidth))) errors.push(_dataTypeErrMsg('resolutionWidth'));
 if(resolutionHeight && isNaN(Number(resolutionHeight))) errors.push(_dataTypeErrMsg('resolutionHeight'));
 if(orientation && !validOrientations.includes(orientation)) errors.push(_dataTypeErrMsg('orientation'));
 if(!siteType  || !validSiteTypes.includes(siteType)) errors.push(_dataTypeErrMsg('siteType')); 
 if(!location || typeof(location)!=='string') errors.push(_errMsg('location'));
 if(!locationAddress || typeof(locationAddress)!=='string') errors.push(_errMsg('locationAddress'));
 if(!premises || typeof(premises)!=='string') errors.push(_errMsg('premises'));
 if(!premisesType || typeof(premisesType)!=='string') errors.push(_errMsg('premisesType'));
 if(!placement || typeof(placement)!=='string') errors.push(_errMsg('placement'));
 if(!spotduration || isNaN(Number(spotduration))) errors.push(_errMsg('spotduration'));
 if(!spotprice || isNaN(Number(spotprice))) errors.push(_errMsg('spotprice'));
 if(!currency || !validCurrencies.includes(currency.toUpperCase())) errors.push(_errMsg('currency'));
 if(!pricingUnit || isNaN(Number(pricingUnit))) errors.push(_errMsg('pricingUnit'));

 if(errors.length===0) return next();

 response.errors=errors;
 return res.status(400).json(response);

}


const reqdFieldTypes = {
   name : 'string',
   referenceId : 'number',
   screenWidth : 'number',
   screenHeight : 'number',
   screenSizeDiagonal : 'number',
   aspectRatio: 'one of "16:9", "16:10", "4:3", "2:1", "1:1", "custom", "1:1", "1:2", "3:4", "10:16", "9:16"',
   resolutionWidth: 'number',
   resolutionHeight: 'number',
   orientation: 'one of "+90", "-90", "180", "0"',
   siteType : 'one of "stationary", "moving"',
   location : 'string',
   locationAddress : 'string',
   premises : 'string',
   premisesType : 'string',
   placement:'string',
   spotduration : 'number',
   spotprice : 'number',
   currency : 'one of "USD", "INR"',
   pricingUnit:'number'
 }


const _errMsg = field  => `Field ${field} is required and should be of type ${reqdFieldTypes[field]}`;

const _dataTypeErrMsg = field => `Field ${field} should be of type ${reqdFieldTypes[field]}`