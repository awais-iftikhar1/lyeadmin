

export interface EngineOilType {
  id?: number,
  oilManufacturerId:number | undefined,
  oilGradeId:number | undefined,
  oilTypeId:number | undefined,
  oilEngineTypeId:string | undefined,
  oilCheckResultNewOil:number | undefined,
  dateTested:string | undefined,
  oilTestLocation:string | undefined,
  oneLitreCost:number | undefined,
  fourLitreCost:number | undefined,
  fiveLitreCost:number | undefined,
  twoHundredLitreCost:number | undefined,
  oilCheckChangeIntervalMiles:number | undefined,
  oilCheckChangeIntervalkm:number | undefined,
  oilCheckChangeIntervalHours:number | undefined,
  notes:string | undefined,
  oilModel:string | undefined,
}


export interface OilData{
  id?:number,
  name: string | undefined
}

export interface OilGrade{
  id?:number,
  oilGrade: string | undefined
}

export interface OilEngineType{
  id?:number,
  engineType: string | undefined
}


