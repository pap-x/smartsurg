import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Procedure, SuccessResponse, Substep, Step, Phase, InstrumentList, DescriptionList, EditName, Anatomy } from './models/procedure';
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

  server_ip: string;  // = "http://localhost:8080";
  procedure_details: string;

  constructor(
    private http: HttpClient
  ) { }

  setParameters() {
    this.procedure_details = "/"+localStorage.getItem("procedure_type")+"/"+localStorage.getItem("procedure_name");
  }

  getProcedure(procedure: string): Observable<Procedure> {
    return this.http.post<Procedure>(this.server_ip+"server/load_ontology",
    procedure, httpOptions);
  }

  getCurrentProcedure() {
    return this.http.get(this.server_ip+"procedure/get_current"+this.procedure_details);
  }

  getProcedureList() {
    return this.http.get(this.server_ip+"server/get_procedures");
  }

  getInstrumentList() {
    return this.http.get(this.server_ip+"instrument/get_all"+this.procedure_details);
  }

  getActionList() {
    return this.http.get(this.server_ip+"action/get_all"+this.procedure_details);
  }

  getAnatomyList() {
    return this.http.get(this.server_ip+"anatomy/get_all"+this.procedure_details);
  }

  delete(delete_options: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"server/delete"+this.procedure_details, delete_options, httpOptions);
  }

  editSubstep(edited_substep: Substep) {
    return this.http.post<SuccessResponse>(this.server_ip+"substep/edit"+this.procedure_details, JSON.stringify(edited_substep), httpOptions);
  }

  getInstrumentPerAction(action: string) {
    return this.http.post<InstrumentList>(this.server_ip+"instrument/per_action"+this.procedure_details, action, httpOptions);
  }

  addSubstep(add_substep: Substep) {
    return this.http.post<SuccessResponse>(this.server_ip+"substep/add"+this.procedure_details,
    JSON.stringify(add_substep), httpOptions);
  }

  addStep(add_step: Step) {
    return this.http.post<SuccessResponse>(this.server_ip+"step/add"+this.procedure_details,
    JSON.stringify(add_step), httpOptions);
  }

  addPhase(add_phase: Phase) {
    return this.http.post<SuccessResponse>(this.server_ip+"phase/add"+this.procedure_details,
    JSON.stringify(add_phase), httpOptions);
  }

  editNamePhase(edit_name_phase: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"phase/edit_name"+this.procedure_details,
    edit_name_phase, httpOptions);
  }

  editNameStep(edit_name_step: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"step/edit_name"+this.procedure_details,
    edit_name_step, httpOptions);
  }

  getDescriptions(edit_description: string) {
    return this.http.post<DescriptionList>(this.server_ip+"action/get_descriptions"+this.procedure_details,
    edit_description, httpOptions);
  }

  addAnatomy(add_anatomy: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"anatomy/add"+this.procedure_details,
    add_anatomy, httpOptions);
  }

  addInstrument(add_instrument: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"instrument/add"+this.procedure_details,
    add_instrument, httpOptions);
  }

  getInstrumentTypes() {
    return this.http.get(this.server_ip+"instrument/get_types"+this.procedure_details);
  }

  uploadImage(uploadImage: FormData) {
    return this.http.post<SuccessResponse>(this.server_ip+"substep/upload"+this.procedure_details,
    uploadImage);
  }

  getProcedureExecute(procedure: string): Observable<Procedure> {
    return this.http.post<Procedure>(this.server_ip+"procedure/set_executing_procedure",
    procedure, httpOptions);
  }

  addDetails(step_details: string) {
    return this.http.post<SuccessResponse>(this.server_ip+"step/add_step_details"+this.procedure_details,
    step_details, httpOptions);
  }

  getReviewProcedureList() {
    return this.http.get(this.server_ip+"server/get_procedures_for_review");
  }

  getProcedureReview(procedure: string) {
    return this.http.post<Procedure>(this.server_ip+"server/load_procedure_for_review",
    procedure, httpOptions);
  }
}
