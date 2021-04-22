
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

export class FieldSupplier<T>{

  reached: boolean;
  limit: number = 40;
  data: T[];
  private obs: BehaviorSubject<T[]>;

  constructor(
    private http: HttpClient,
    private route: string,
    public params: HttpParams,
  ) {
      this.obs = new BehaviorSubject([]);
      this.reset(params)
  }

  public refresh() {
    console.log("refreshing");
    if (this.reached)
      this.reached = false;
    this.getData(this.route, this.params,
      (res: T[]) => {
        if (!res)
          return;
        if (res.length == 0)
          this.reached = true;
        else {
          if (res.length <= this.limit)
            this.reached = true;
          this.data = res;
        }
        this.obs.next(this.data);
      }, 0);
  }

  public getMore() {
    if (!this.data)
      this.data = [];
    this.getData(this.route, this.params,
      (res: T[]) => {
        if (!res)
          return;
        if (res.length == 0)
          this.reached = true;
        else {
          if (res.length <= this.limit)
            this.reached = true;
          this.data.push(...res);
        }
        this.obs.next(this.data);
      }, this.data.length);
  }

  observable(): Observable<T[]> {
    return this.obs;
  }
  public reset(params:HttpParams){
      this.reached=false;
      this.params = params;
      this.data = [];
      this.obs.next(this.data);
  }

  private getData(route: string, params: HttpParams,cb: (res:T[]) => void, offset: number) {
    params = params.set("offset", offset.toString()).set("limit", this.limit.toString());
    this.http.get<T[]>(route, { params }).subscribe(
      cb, (er) => console.log(er));
  };


}