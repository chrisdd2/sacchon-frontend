export function getDateString(d:Date){
    console.log("converting " + d);
    let res = d.getFullYear().toString();
    if( d.getMonth() < 10 )
        res += "-0" + (d.getMonth()+1);
    else
        res += "-" + (d.getMonth() +1);
    
    if( d.getDate() < 10 )
        res += "-0" + d.getDate();
    else
        res += "-" + d.getDate();
    console.log("to " + res);
    return res;
}