import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
   companyName:String,
   overView:[{
    companyRegistrationDate:String,
    floorSpace:String,
    annualExportrevenue:String,
    yearsExporting:String,
    acceptedLanguages:String,
    yearsInIndustry:String
   }],
   productionCapabilities:[{
    productionLines:Number,
    productionMachines:Number
   }],
   qualityControl:[{
    productSupportTraceabilityOfRawMaterials:String,
    productInspectionMethod:String,
    qualityControlConductedOnAllProductionLines:String,
    QAQCInspectors:Number
   }],
   tradeBackground:[{
    mainMarkets:String,
    supplyChainPartners:Number
   }],
   RDCapabilities:[{
    customizationOptions:String,
    newProductsLaunchedInLastYear:Number,
    RDEngineers:Number,
    RDEngineersEducationLevel:String
   }]
   
}, {
    timestamps: true,
}, );

export default mongoose.model('seller', sellerSchema);