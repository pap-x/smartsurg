import { Component, OnInit } from '@angular/core';
import { PROCEDURE, Procedure, Substep, Step, Phase, SuccessResponse, InstrumentList, TypeList, AnatomyList, ActionList, DescriptionList } from '../models/procedure';
import { ProcedureService } from '../procedure.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public procedure: Procedure = PROCEDURE;
  public current_phase: any;
  phase_index = 0;
  step_current = 0;
  procedure_completed = false;
  phase_started: Number;
  current_time: any;
  next_step_id: string;
  loading: boolean = true;
  ready_review: boolean = false;

  constructor(private procedure_service: ProcedureService) { }

  ngOnInit() {

    this.updatePhase();

    this.procedure_service.setParameters();
    this.current_time = Date.now();

    //send current time to server
    this.procedure_service.getProcedureExecute("{procedure:'"+localStorage.getItem("procedure")+"', type: '"+localStorage.getItem("procedure_type")+"', name: '"+localStorage.getItem("procedure_name")+"', timestamp: '"+this.current_time+"'}")
    .subscribe((response: Procedure) => {
      this.procedure = response;
      this.updatePhase();
      this.phase_started = Date.now();
      this.loading = false;
      localStorage.setItem("procedure",localStorage.getItem("procedure_name"));
    },
    (error) => console.log(error));

  }

  onDone(skip: boolean, step_comment: string) {

    if (skip) {
      this.procedure.phases[this.phase_index].steps[this.step_current].skipped = true;
      this.procedure.phases[this.phase_index].steps[this.step_current].bg = 'skip';
    }
    else {
      this.procedure.phases[this.phase_index].steps[this.step_current].skipped = false;
      this.procedure.phases[this.phase_index].steps[this.step_current].bg = 'complete';
    }

    this.current_time = Date.now();
    this.procedure.phases[this.phase_index].steps[this.step_current].time_completed = this.current_time;
    this.step_current++;

    if (this.step_current > this.procedure.phases[this.phase_index].steps.length - 1) {
      this.step_current = 0;
      this.phase_index++;
      this.updatePhase();
    }

    //send details to server
    if (this.phase_index > this.procedure.phases.length - 1) {
      this.next_step_id = "finished";
      setTimeout(()=>{
        this.ready_review = true;
      }, 5000);
    }
    else {
      this.next_step_id = this.procedure.phases[this.phase_index].steps[this.step_current].id;
    }
    this.procedure_service.addDetails('{step_id:"'+this.next_step_id+'", comment: "'+step_comment+'", timestamp: "'+this.current_time+'", skipped: "'+skip+'"}')
    .subscribe((response: SuccessResponse) => {
    },
    (error) => console.log(error));

  }

  updatePhase() {
    if (this.phase_index > this.procedure.phases.length - 1) {
      this.procedure_completed = true;
    }
    else {
      this.current_phase = this.procedure.phases[this.phase_index];
    }
  }

  hasAssignment(instruments: any[]) {
    const assigned_instr: any[] = instruments.filter(instr=>instr.assigned !== 'none');
    return (assigned_instr.length > 0) ? true : false;
  }
}
