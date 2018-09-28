import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Procedure, SuccessResponse, Substep, Step, Phase, InstrumentList, EditName } from './models/procedure';
import { Observable } from 'rxjs';
import { ProcedureRequest } from './models/procedure_request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'text/plain'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProcedureService {

  procedure_request: any = {procedure: "RAPNTest", type: "RAPN", name: ""};
  server_ip: string = "http://160.40.51.194:8080/SMARTsurgProtocolServer/protocol/"

  constructor(
    private http: HttpClient
  ) { }

  setProcedureRequest(procedure_req: any) {
    this.procedure_request = procedure_req;
  }

  getProcedure(): Observable<Procedure> {
    return this.http.post<Procedure>(this.server_ip+"server/load_ontology", 
    JSON.stringify(this.procedure_request), httpOptions);
  }

  getCurrentProcedure() {
    return this.http.get(this.server_ip+"procedure/get_current");
  }

  getProcedureList() {
    return this.http.get(this.server_ip+"server/get_procedures");
  }

  getInstrumentList() {
    return this.http.get(this.server_ip+"instrument/get_all");
  }

  getActionList() {
    return this.http.get(this.server_ip+"action/get_all");
  }

  getAnatomyList() {
    return this.http.get(this.server_ip+"anatomy/get_all");
  }

  delete(delete_options: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"server/delete", delete_options, httpOptions);
  }

  editSubstep(edited_substep: Substep) {
    return this.http.post<SuccessResponse>(this.server_ip+"substep/edit", JSON.stringify(edited_substep), httpOptions);
  }

  getInstrumentPerAction(action: string) {
    return this.http.post<InstrumentList>(this.server_ip+"instrument/per_action", action, httpOptions);
  }

  addSubstep(add_substep: Substep) {
    return this.http.post<SuccessResponse>(this.server_ip+"substep/add", 
    JSON.stringify(add_substep), httpOptions);
  }

  addStep(add_step: Step) {
    return this.http.post<SuccessResponse>(this.server_ip+"step/add", 
    JSON.stringify(add_step), httpOptions);
  }

  addPhase(add_phase: Phase) {
    return this.http.post<SuccessResponse>(this.server_ip+"phase/add", 
    JSON.stringify(add_phase), httpOptions);
  }

  editNamePhase(edit_name_phase: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"phase/edit_name", 
    edit_name_phase, httpOptions);
  }

  editNameStep(edit_name_step: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"step/edit_name", 
    edit_name_step, httpOptions);
  }
}
