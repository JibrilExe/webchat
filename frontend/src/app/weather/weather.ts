export interface Weather {
    location:Location,
    current:Current
}

interface Location {
    name:String,
    region:String,
    country:String,
    lat:Number,
    lon:Number,
    tz_id:String,
    localtime_epoch: Number,
    localtime: String
}
interface Current {
    last_updated_epoch:Number,
    last_updated:String,
    temp_c:Number,
    temp_f:Number,
    is_day:Number,
    condition:Condition,
    wind_mph:Number,
    wind_kph:Number,
    wind_degree:Number,
    wind_dir:String,
    pressure_mb:number,
    pressur_in:number,
    precip_mm:number,
    precip_in:number,
    humdidity:Number,
    cloud:number,
    feelslike_c:number,
    feelslike_f:number,
    vis_km:number,
    vis_miles:number,
    uv:number,
    gust_mph:number,
    gust_kph:number
}
interface Condition {
    text:String,
    icon:String,
    code:Number
}
