import { Component, OnInit } from '@angular/core';
import { PROCEDURE, Procedure, Substep, Step, Phase, SuccessResponse, InstrumentList, TypeList, AnatomyList, ActionList, DescriptionList } from '../models/procedure';
import { ProcedureService } from '../procedure.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public procedure: Procedure = PROCEDURE;
  public current_phase: any;
  phase_index = 0;
  step_current = 0;
  procedure_completed = false;
  phase_started: Number;
  current_time: any;
  loading: boolean = true;

  constructor(private procedure_service: ProcedureService) { }

  ngOnInit() {

    this.updatePhase();

    this.procedure_service.setParameters();
    this.current_time = Date.now();

    //send current time to server
    this.procedure_service.getProcedureReview("{procedure:'"+localStorage.getItem("procedure")+"', type: '"+localStorage.getItem("procedure_type")+"'}")
    .subscribe((response: Procedure) => {
      this.procedure = response;
      console.log(this.procedure);
      this.updatePhase();
      this.phase_started = Date.now();
      this.loading = false;
    },
    (error) => console.log(error));

  }

  onDone(){

    this.step_current++;

    if (this.step_current > this.procedure.phases[this.phase_index].steps.length - 1) {
      this.step_current = 0;
      this.phase_index++;
      this.updatePhase();
    }
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

  changePhase(mode: string) {
    if (mode=="up") {
      this.phase_index++;
      this.current_phase = this.procedure.phases[this.phase_index];
    }
    else {
      this.phase_index--;
      this.current_phase = this.procedure.phases[this.phase_index];
    }
  }
}
