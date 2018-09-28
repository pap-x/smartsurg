import { Component, OnInit } from '@angular/core';
import { PROCEDURE, Procedure, Substep, Step, Phase, SuccessResponse, InstrumentList, AnatomyList, ActionList } from '../models/procedure';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedureService } from '../procedure.service';

declare var bootbox: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  procedure = PROCEDURE;
  
  add_substep: Substep = {
    name: "",
    action: "none",
    instruments: [{
      id: "",
      assigned: ""
    }],
    anatomies: [],
    extras: [],
    order: 0,
    image: "",
    id: "",
    step: "",
    parallel: false
  };

  add_step: Step = {
    name:"",
    id: "",
    phase: "",
    order: 1,
    substep: {
      name: "",
      action: "none",
      instruments: [{
        id: "",
        assigned: ""
      }],
      anatomies: [],
      extras: [],
      order: 1,
      image: "",
      id: "",
      parallel: false
    }
  }

  add_phase: Phase = {
    name: "",
    order: 1,
    id: "",
    step: {
      name: "",
      id: "",
      substep: {
        name: "",
        action: "none",
        instruments: [{
          id: "",
          assigned: ""
        }],
        anatomies: [],
        extras: [],
        order: 1,
        image: "",
        id: "",
        parallel: false
      }
    }
  }

  edit_substep: Substep;

  instruments: string[] = ["Loading from Server"];
  anatomies: string[] = ["Loading from Server"];
  actions: string[] = ["Loading from Server"];
  instrument: string = "none";
  anatomy: string = "none";
  selected_phase: number = 0;
  selected_step: number = 0;
  editMode: string = "no";
  addMode: string = "no";
  placement: string = "none";
  selectedImage: string = "";
  editPhase: number = 0;
  editStep: number = 0;

  constructor(
    private procedure_service: ProcedureService
  ) { }

  ngOnInit() {
    
    this.procedure_service.getProcedure()
    .subscribe((response: Procedure) => {
                  this.procedure = response;
                },
                (error) => console.log(error));
    
    this.procedure_service.getInstrumentList().subscribe((response: InstrumentList) => {
                  this.instruments = response.instruments;
                },
                (error) => console.log(error));

    this.procedure_service.getAnatomyList().subscribe((response: AnatomyList) => {
                  this.anatomies = response.anatomies;
                },
                (error) => console.log(error));

    this.procedure_service.getActionList().subscribe((response: ActionList) => {
                  this.actions = response.actions;
                },
                (error) => console.log(error));
  }

  onSelectedPhase(i: number) {
    if (this.selected_phase!=i) {
      this.editPhase = 0;
    }
    this.selected_phase = i;
    this.selected_step = 0;
    this.addMode = "no";
    this.editMode = "no";
    this.editStep = 0;
  }

  onSelectedStep(i: number) {
    if (this.selected_step!=i) {
      this.editStep = 0;
    }
    this.selected_step = i;
    this.addMode = "no";
    this.editMode = "no";
  }

  onAdd(type: string) {
    this.addMode = type;
    this.editMode = "no";
  }

  onAddInstrument(type: string) {
    switch (type) {
      case "substep":
        if (this.add_substep.instruments[0].id=="") {
          this.add_substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
        }
        else {
          this.add_substep.instruments.push({id: this.instrument, assigned: "none"});
        }
        break;
      case "step":
        if (this.add_step.substep.instruments[0].id=="") {
          this.add_step.substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
        }
        else {
          this.add_step.substep.instruments.push({id: this.instrument, assigned: "none"});
        }
        break;
      case "phase":
        if (this.add_phase.step.substep.instruments[0].id=="") {
          this.add_phase.step.substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
        }
        else {
          this.add_phase.step.substep.instruments.push({id: this.instrument, assigned: "none"});
        }
        break;
    }
    this.instrument = "none";
  }

  onAddInstrumentEdit(type: string) {
    switch (type) {
      case "substep":
        this.edit_substep.instruments.push({id: this.instrument, assigned: "none"});
        break;
    }
    this.instrument = "none"
    console.log(this.edit_substep);
  }

  onAddAnatomy(type: string) {
    switch (type) {
      case "substep":
        this.add_substep.anatomies.push(this.anatomy);
        break;
      case "step":
        this.add_step.substep.anatomies.push(this.anatomy);
        break;
      case "phase":
        this.add_phase.step.substep.anatomies.push(this.anatomy);
        break;
    }
    this.anatomy = "none";
  }

  onAddAnatomyEdit(type: string) {
    switch (type) {
      case "substep":
        this.edit_substep.anatomies.push(this.anatomy);
        break;
    }
    this.anatomy = "none";
  }

  onDelete(type: string, name: string, id: string) {

    var outer_scope = this;

    bootbox.confirm("Are you sure you want to delete "+type+" "+name.replace(/([A-Z])/g, ' $1').trim()+"?", function(response) {
      if (response) {
        outer_scope.procedure_service.delete("{type: "+type+", id: "+id+", name: "+name+"}")
          .subscribe((response: SuccessResponse) => {
                if (response.success) {
                  bootbox.alert(response.name+" deleted!");
                  outer_scope.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
                    outer_scope.procedure = response;
                  },
                  (error) => console.log(error));
                }
                else {
                  bootbox.alert(response.name.replace(/([A-Z])/g, ' $1').trim()+" cannot be deleted!");
                }
              },
              (error) => bootbox.alert("There was an error while deleting, try again later."))
      }
    });
  }

  onEdit(type: string, name: string, index: number) {
    this.editMode = type;
    this.addMode = 'no';
    this.edit_substep = this.procedure.phases[this.selected_phase].steps[this.selected_step].substeps[index];
    this.selectedImage = this.edit_substep.image;
    this.onActionChange(this.edit_substep.action);
  }

  disableAssignOption(option: string): boolean{
    for (let instrument of this.edit_substep.instruments) {
      if (option==instrument.assigned) {
        return true;
      }
    }
    return false;
  }

  disableAssignOptionAdd(option: string, type: string): boolean{
    switch (type) {
      case 'substep':
        if (this.add_substep.instruments) {
          for (let instrument of this.add_substep.instruments) {
            if (option==instrument.assigned) {
              return true;
            }
          }
          return false;
        }
        break;
      case 'step':
        if (this.add_step.substep.instruments) {
          for (let instrument of this.add_step.substep.instruments) {
            if (option==instrument.assigned) {
              return true;
            }
          }
          return false;
        }
        break;
      case 'phase':
        if (this.add_phase.step.substep.instruments) {
          for (let instrument of this.add_phase.step.substep.instruments) {
            if (option==instrument.assigned) {
              return true;
            }
          }
          return false;
        }
        break;
    }
  }

  onSaveEditSubstep() {
    
    if (this.selectedImage!="") {
      this.add_substep.image = this.selectedImage;
      this.selectedImage = "";
    }

    this.procedure_service.editSubstep(this.edit_substep)
      .subscribe((response: SuccessResponse) => {
        if (response.success) {
          bootbox.alert("Substep "+response.name+" has been updated!");
          this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
            this.procedure = response;
          },
          (error) => console.log(error));
        }
        else {
          bootbox.alert("An error has occured, please try again later!");
        }
      },
      (error)=> console.log(error)
    );

    this.editMode = "no";
    this.addMode = "no";
  }

  onActionChange(action: string) {
    this.procedure_service.getInstrumentPerAction("{action: '"+action+"'}").subscribe((response: InstrumentList) => {
      this.instruments = response.instruments;
    },
    (error) => console.log(error));
  }

  onSaveSubstep() {
    //Step name
    this.add_substep.step = this.procedure.phases[this.selected_phase].steps[this.selected_step].id;

    if (this.placement=="parallel") {
      this.add_substep.parallel = true;
    }
    else if (this.placement=="before") {
      this.add_substep.order -= 1;
    }

    this.add_substep.image = this.selectedImage;
    this.selectedImage = "";

    this.procedure_service.addSubstep(this.add_substep).subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("Substep "+response.name+" was added!");
        this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
          this.procedure = response;
        },
        (error) => {
          console.log(error); 
          bootbox.alert("An error has occured, please try again later.");});
        this.addMode = "no";
        this.editMode = "no";

        this.add_substep = {
          name: "",
          action: "none",
          instruments: [{
            id: "",
            assigned: ""
          }],
          anatomies: [],
          extras: [],
          order: 0,
          image: "",
          id: "",
          step: "",
          parallel: false
        };
      }
      else {
        bootbox.alert("An error has occured!");
      }
    },
    (error) => console.log(error));
  }

  onSaveStep() {
    //Phase name
    this.add_step.phase = this.procedure.phases[this.selected_phase].id;

    if (this.placement=="before") {
      this.add_step.order -= 1;
    }

    this.add_step.substep.image = this.selectedImage;
    this.selectedImage = "";

    this.procedure_service.addStep(this.add_step).subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("Step "+response.name+" was added!");
        this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
          this.procedure = response;
        },
        (error) => {
          console.log(error); 
          bootbox.alert("An error has occured, please try again later.");});
        this.addMode = "no";
        this.editMode = "no";

        this.add_step = {    
          name:"",
          phase: "",
          id: "",
          order: 0,
          substep: {
            name: "",
            action: "none",
            instruments: [{
              id: "",
              assigned: ""
            }],
            anatomies: [],
            extras: [],
            order: 1,
            image: "",
            id: "",
            parallel: false
          }
        }
      }
      else {
        bootbox.alert("An error has occured!");
      }
    },
    (error) => console.log(error));
  }

  onSavePhase() {

    if (this.placement=="before") {
      this.add_phase.order -= 1;
    }

    this.add_phase.step.substep.image = this.selectedImage;
    this.selectedImage = "";

    this.procedure_service.addPhase(this.add_phase).subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("Phase "+response.name+" was added!");
        this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
          this.procedure = response;
        },
        (error) => {
          console.log(error); 
          bootbox.alert("An error has occured, please try again later.");});
        
        this.addMode = "no";
        this.editMode = "no";

        this.add_phase = {
          name: "",
          order: 1,
          id: "",
          step: {
            name: "",
            id: "",
            substep: {
              name: "",
              action: "none",
              instruments: [{
                id: "",
                assigned: ""
              }],
              anatomies: [],
              extras: [],
              order: 1,
              image: "",
              id: "",
              parallel: false
            }
          }
        }
      }
      else {
        bootbox.alert("An error has occured!");
      }
    },
    (error) => console.log(error));
  }

  imageFileEvent(file: any) {
    let fileName = file.target.files[0];
    this.selectedImage = "/smartsurg_images/surgery.jpg"; //fileName.name;
  }

  onSaveNamePhase(phase_id: string) {
    let new_phase_name = (<HTMLInputElement>document.getElementById(phase_id)).value;
    this.procedure_service.editNamePhase("{name: "+new_phase_name+", id: "+phase_id+"}").subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("Phase "+response.name+" was updated!");
        this.editPhase = 0;
        this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
          this.procedure = response;
        },
        (error) => {
          console.log(error); 
          bootbox.alert("An error has occured, please try again later.");});
      }
      else {
        bootbox.alert("An error has occured!");
      }
    },
    (error) => {
      console.log(error);
      bootbox.alert("An error has occured, please try again later.");
    });
  }

  onSaveNameStep(step_id: string) {
    let new_step_name = (<HTMLInputElement>document.getElementById(step_id)).value;
    this.procedure_service.editNameStep("{name: "+new_step_name+", id: "+step_id+"}").subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("Step "+response.name+" was updated!");
        this.editStep = 0;
        this.procedure_service.getCurrentProcedure().subscribe((response: Procedure) => {
          this.procedure = response;
        },
        (error) => {
          console.log(error); 
          bootbox.alert("An error has occured, please try again later.");});
      }
      else {
        bootbox.alert("An error has occured!");
      }
    },
    (error) => {
      console.log(error);
      bootbox.alert("An error has occured, please try again later.");
    });
  }

  isParallel(substep: Substep, index: number): Boolean{
    if (index>0) {
      if (substep.order==this.procedure.phases[this.selected_phase].steps[this.selected_step].substeps[index-1].order) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
}
