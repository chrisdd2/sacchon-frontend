import { FieldSupplier } from './../services/field-supplier';
import { HttpParams } from '@angular/common/http';

export function getDateString(d:Date){
    let res = d.getFullYear().toString();
    if( d.getMonth() < 10 )
        res += "-0" + (d.getMonth()+1);
    else
        res += "-" + (d.getMonth() +1);
    
    if( d.getDate() < 10 )
        res += "-0" + d.getDate();
    else
        res += "-" + d.getDate();
    return res;
}
export function resetFieldWithDates<T>(field:FieldSupplier<T>,extra: { [key:string]:string},{start=null,end=null}){
    let params = new HttpParams();
    params = params.appendAll(extra);
    if( start)
      params = params.set("start",getDateString(start))
    if( end)
      params = params.set("end",getDateString(end));
    field.reset(params);
  }
export function patientName(c:{patientName:string,patientEmail:string}):string{
  return `${c.patientName} ( ${c.patientEmail} )`;
}