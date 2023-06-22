import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListModel } from './list/list.model';


@Injectable({
  providedIn: 'root'
})
export class ListserviceService {

  constructor(private http:HttpClient) { }
  baseurl: string = "http://localhost:3000/lists"

  
  
  postlist(data:any){
    return this.http.post<ListModel>(this.baseurl,data)
  }
  getlist() {
    return this.http.get<ListModel[]>(this.baseurl)
  }  
  deletelist(id: number) {
    return this.http.delete<ListModel>(this.baseurl + '/' + id)
      
  }
  updatelist(data: any, id: number) {
    return this.http.put<ListModel>(this.baseurl + '/' + id, data)
      
  }
  searchlist(date:number){
    return this.http.get<ListModel[]>(`${this.baseurl}?date=${date}`);
  }
  }

