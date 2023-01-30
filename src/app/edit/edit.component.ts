import { Component, OnInit } from '@angular/core';
import { PROCEDURE, Procedure, Substep, Step, Phase, SuccessResponse, InstrumentList, TypeList, AnatomyList, ActionList, DescriptionList } from '../models/procedure';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedureService } from '../procedure.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ViewChild, ElementRef} from '@angular/core';

declare var bootbox: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  procedure: any;

  add_substep: any = {
    name: "",
    action: "none",
    instruments: [{
      id: "",
      assigned: ""
    }],
    anatomies: [],
    extras: "",
    order: 0,
    image: "",
    id: "",
    step: "",
    parallel: false,
    actionDescriptions: []
  };

  add_step: any = {
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
      extras: "",
      order: 1,
      image: "",
      id: "",
      parallel: false,
      actionDescriptions: []
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
        extras: "",
        order: 1,
        image: "",
        id: "",
        parallel: false,
        actionDescriptions: []
      }
    }
  }

  edit_substep: Substep;

  @ViewChild('selectedAction') selectedAction: ElementRef;
  instruments: any[] = ["Loading from Server"];
  instrument_names: any[] = [];
  all_instruments: any[] = [];
  all_instrument_types: any[] = [];
  anatomies: string[] = ["Loading from Server"];
  actions: string[] = ["Loading from Server"];
  instrument: string = "none";
  anatomy: string = "none";
  action_description: string = "none";
  selected_phase: number = 0;
  selected_step: number = 0;
  editMode: string = "no";
  addMode: string = "no";
  placement: string = "none";
  selectedImage: string = "";
  editPhase: number = 0;
  editStep: number = 0;
  alphabet: string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  expand_view: boolean = true;
  action_desc: string[] = [];
  check_robot: boolean = false; check_human: boolean = false;
  selected_image: File;
  uploaded_image: boolean = false;
  uploading_now: boolean = false;
  loading: boolean = true;
  small_loading: boolean = false;

  constructor(
    private procedure_service: ProcedureService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.procedure_service.setParameters();

    this.procedure_service.getProcedure("{procedure:'"+localStorage.getItem("procedure")+"', type: '"+localStorage.getItem("procedure_type")+"', name: '"+localStorage.getItem("procedure_name")+"'}")
    .subscribe((response: Procedure) => {
        this.procedure = response;

        this.procedure_service.getInstrumentList().subscribe((response: InstrumentList) => {
          console.log("Got the instruments!");
          this.all_instruments = response.instruments;
          this.loading = false;
        },
        (error) => console.log(error));

        this.procedure_service.getAnatomyList().subscribe((response: AnatomyList) => {
          console.log("Got the anatomies!");
          this.anatomies = response.anatomies.sort();
        },
        (error) => console.log(error));

        this.procedure_service.getActionList().subscribe((response: ActionList) => {
          console.log("Got the actions!");
          this.actions = response.actions.sort();
        },
        (error) => console.log(error));

        this.procedure_service.getInstrumentTypes().subscribe((response: TypeList) => {
          console.log("Got the instruments types!");
          this.all_instrument_types = response.types;
        },
        (error) => console.log(error));
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
    if (this.instrument!="none") {
      switch (type) {
        case "substep":
          if (this.add_substep.instruments[0]&&this.add_substep.instruments[0].id=="") {
            this.add_substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
          }
          else {
            this.add_substep.instruments.push({id: this.instrument, assigned: "none"});
          }
          break;
        case "step":
          if (this.add_step.substep.instruments[0]&&this.add_step.substep.instruments[0].id=="") {
            this.add_step.substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
          }
          else {
            this.add_step.substep.instruments.push({id: this.instrument, assigned: "none"});
          }
          break;
        case "phase":
          if (this.add_phase.step.substep.instruments[0]&&this.add_phase.step.substep.instruments[0].id=="") {
            this.add_phase.step.substep.instruments.splice(0,1,{id: this.instrument, assigned: "none"});
          }
          else {
            this.add_phase.step.substep.instruments.push({id: this.instrument, assigned: "none"});
          }
          break;
      }
      this.instrument = "none";
    }
    console.log(this.add_substep.instruments);
  }

  onRemoveInstrument(type: string, instrument: string) {
    switch (type) {
      case "substep":
        this.add_substep.instruments = this.add_substep.instruments.filter(function( obj ) {
          return obj.id !== instrument;
        });
        break;
      case "step":
        this.add_step.substep.instruments = this.add_step.substep.instruments.filter(function( obj ) {
          return obj.id !== instrument;
        });
        break;
      case "phase":
        this.add_phase.step.substep.instruments = this.add_phase.step.substep.instruments.filter(function( obj ) {
          return obj.id !== instrument;
        });
        break;
    }
  }

  onAddInstrumentEdit() {
    this.edit_substep.instruments.push({id: this.instrument, assigned: "none"});
    this.instrument = "none";
  }

  onRemoveInstrumentEdit(instrument: string) {
    this.edit_substep.instruments = this.edit_substep.instruments.filter(function( obj ) {
      return obj.id !== instrument;
    });
  }


  onAddAnatomy(type: string) {
    if (this.anatomy!="none") {
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
  }

  onRemoveAnatomy(type: string, anatomy: string) {
    switch (type) {
      case "substep":
        this.add_substep.anatomies = this.add_substep.anatomies.filter(function( obj ) {
          return obj !== anatomy;
        });
        break;
      case "step":
        this.add_step.substep.anatomies = this.add_step.substep.anatomies.filter(function( obj ) {
          return obj !== anatomy;
        });
        break;
      case "phase":
        this.add_phase.step.substep.anatomies = this.add_phase.step.substep.anatomies.filter(function( obj ) {
          return obj !== anatomy;
        });
        break;
    }
  }

  onAddAnatomyEdit() {
    this.edit_substep.anatomies.push(this.anatomy);
    this.anatomy = "none";
  }

  onRemoveAnatomyEdit(anatomy: string) {
    this.edit_substep.anatomies = this.edit_substep.anatomies.filter(function( obj ) {
      return obj !== anatomy;
    });
  }

  onAddDesc(type: string) {
    if (this.action_description!="none") {
      switch (type) {
        case "substep":
          this.add_substep.actionDescriptions.push(this.action_description);
          break;
        case "step":
          this.add_step.substep.actionDescriptions.push(this.action_description);
          break;
        case "phase":
          this.add_phase.step.substep.actionDescriptions.push(this.action_description);
          break;
      }
      this.action_description = "none";
    }
  }

  onRemoveDesc(type: string) {

    switch (type) {
      case "substep":
        this.add_substep.actionDescriptions.pop();
        break;
      case "step":
        this.add_step.substep.actionDescriptions.pop();
        break;
      case "phase":
        this.add_phase.step.substep.actionDescriptions.pop();
        break;
    }
  }

  onAddDescEdit(type: string) {
    if (this.action_description!="none") {
      switch (type) {
        case "substep":
          this.edit_substep.actionDescriptions.push(this.action_description);
          break;
      }
      this.action_description = "none"
    }
  }

  onRemoveDescEdit(type: string) {
    switch (type) {
      case "substep":
        this.edit_substep.actionDescriptions.pop();
        break;
    }
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
    this.edit_substep = JSON.parse(JSON.stringify(this.procedure.phases[this.selected_phase].steps[this.selected_step].substeps[index])); //Pass a copy of the object and not the object itself
    this.selectedImage = this.edit_substep.image;


    //load instrument list and descriptions
    this.procedure_service.getInstrumentPerAction("{action: '"+this.edit_substep.action+"'}").subscribe((response: InstrumentList) => {
      this.instruments = response.instruments;
      this.instrument_names = [...Array.from(new Set(this.instruments.map(it => it.id)))];
    },
    (error) => console.log(error));

    this.procedure_service.getDescriptions("{action: '"+this.edit_substep.action+"'}").subscribe((response: DescriptionList) => {
      this.action_desc = response.actionDescriptions.sort();
    },
    (error) => console.log(error));
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
    this.loading = true;
    if (this.uploaded_image) {
      this.edit_substep.image = this.selectedImage;
      this.selectedImage = "";
      this.uploaded_image = false;
    }

    this.procedure_service.editSubstep(this.edit_substep)
      .subscribe((response: SuccessResponse) => {
        if (response.success) {
          this.loading = false;
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
    this.instrument = "none";
    this.small_loading = true;
    if (this.editMode=='substep'&&this.addMode=='no') {
      this.edit_substep.instruments.splice(0,this.edit_substep.instruments.length);
    }
    else if (this.addMode=='substep') {
      this.add_substep.instruments.splice(0,this.add_substep.instruments.length);
    }
    else if (this.addMode=='step') {
      this.add_step.substep.instruments.splice(0,this.add_step.substep.instruments.length);
    }
    else if (this.addMode=='phase') {
      this.add_phase.step.substep.instruments.splice(0,this.add_phase.step.substep.instruments.length);
    }
    this.procedure_service.getInstrumentPerAction("{action: '"+action+"'}").subscribe((response: InstrumentList) => {
      this.instruments = response.instruments;
      this.instrument_names = [...Array.from(new Set(this.instruments.map(it => it.id)))];
      this.small_loading = false;
    },
    (error) => console.log(error));

    this.procedure_service.getDescriptions("{action: '"+action+"'}").subscribe((response: DescriptionList) => {
      this.action_desc = response.actionDescriptions.sort();
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

    if (this.uploaded_image) {
      this.edit_substep.image = this.selectedImage;
      this.selectedImage = "";
      this.uploaded_image = false;
    }

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
          extras: "",
          order: 0,
          image: "",
          id: "",
          step: "",
          parallel: false,
          actionDescriptions: []
        };
      }
      else {
        bootbox.alert("Error Occured! Please try again.");
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

    if (this.uploaded_image) {
      this.add_step.substep.image = this.selectedImage;
      this.selectedImage = "";
      this.uploaded_image = false;
    }

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
            extras: "",
            order: 1,
            image: "",
            id: "",
            parallel: false,
            actionDescriptions: []
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

    if (this.uploaded_image) {
      this.add_phase.step.substep.image = this.selectedImage;
      this.selectedImage = "";
      this.uploaded_image = false;
    }

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
              extras: "",
              order: 1,
              image: "",
              id: "",
              parallel: false,
              actionDescriptions: []
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
    this.selected_image = file.target.files[0];
    this.selectedImage = this.selected_image.name;
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

  onOpenSubstep(i: number) {
    document.getElementById(this.selected_phase+'_'+this.selected_step+'_'+i).style.display = 'block';
    document.getElementById('angle_down_'+i).style.display = 'none';
    document.getElementById('angle_up_'+i).style.display = 'inline';
  }

  onCloseSubstep(i: number) {
    document.getElementById(this.selected_phase+'_'+this.selected_step+'_'+i).style.display = 'none';
    document.getElementById('angle_up_'+i).style.display = 'none';
    document.getElementById('angle_down_'+i).style.display = 'inline';
  }

  onClose() {
    for (var i=0; i<this.procedure.phases[this.selected_phase].steps[this.selected_step].substeps.length; i++) {
      document.getElementById(this.selected_phase+'_'+this.selected_step+'_'+i).style.display = 'none';
      document.getElementById('angle_up_'+i).style.display = 'none';
      document.getElementById('angle_down_'+i).style.display = 'inline';
    }
    this.expand_view = false;
  }

  onExpand() {
    for (var i=0; i<this.procedure.phases[this.selected_phase].steps[this.selected_step].substeps.length; i++) {
      document.getElementById(this.selected_phase+'_'+this.selected_step+'_'+i).style.display = 'block';
      document.getElementById('angle_down_'+i).style.display = 'none';
      document.getElementById('angle_up_'+i).style.display = 'inline';
    }
    this.expand_view = true;
  }

  isAssignable(type: string, instrument_name: string) {
    let instrument = this.all_instruments.find(instr => instr.id === instrument_name);
    if (type==='robot') {
      return instrument.robotic;
    }
    else if (type==='human') {
      return instrument.forHuman;
    }
  }

  ShowSubstep(type: string = '') {
    if (type==''||type=='angle-up') {
      if (this.expand_view) {
        return 'block';
      }
      else {
        return 'none';
      }
    }
    else if (type=='angle-down') {
      if (this.expand_view) {
        return 'none';
      }
      else {
        return 'block';
      }
    }
  }

  OpenModal(modal) {
    this.modalService.open(modal);
  }

  NewAnatomy(name: string, modal) {
    this.procedure_service.addAnatomy("{name: '"+name+"'}").subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("New anatomy saved!");

        //Reload the anatomies list
        this.procedure_service.getAnatomyList().subscribe((response: AnatomyList) => {
          console.log("Got the anatomies!");
          this.anatomies = response.anatomies.sort();
        },
        (error) => console.log(error));
      }
      else {
        bootbox.alert("There was an error, please try again later");
      }
    },
    (error) => {
      bootbox.alert("There was a problem with the server")
    });
    this.modalService.dismissAll(modal);

  }

  NewInstrument(name: string, type: string, modal) {

    this.procedure_service.addInstrument("{name: "+name+", type: "+type+", robotic: "+this.check_robot+", forHuman:"+this.check_human+", actions: []}").subscribe((response: SuccessResponse) => {
      if (response.success) {
        bootbox.alert("New instrument saved!");
        this.check_robot = false;
        this.check_human = false;

        //Reload the instrument list
        this.procedure_service.getInstrumentList().subscribe((response: InstrumentList) => {
          console.log("Got the instruments!");
          this.all_instruments = response.instruments;
        },
        (error) => console.log(error));

        //Reload the instruments for the action
        this.procedure_service.getInstrumentPerAction("{action: '"+this.selectedAction.nativeElement.value+"'}").subscribe((response: InstrumentList) => {
          this.instruments = response.instruments;
          this.instrument_names = [...Array.from(new Set(this.instruments.map(it => it.id)))];
        },
        (error) => console.log(error));
      }
      else {
        bootbox.alert("There was an error, please try again later");
        this.check_robot = false;
        this.check_human = false;
      }
    },
    (error) => {
      bootbox.alert("There was a problem with the server")
      this.check_robot = false;
      this.check_human = false;
    });
    this.modalService.dismissAll(modal);
  }

  onUpload() {
    this.uploading_now = true;
    const uploadData = new FormData();
    uploadData.append("file", this.selected_image, this.selected_image.name);
    this.procedure_service.uploadImage(uploadData).subscribe((response: SuccessResponse) => {
      if (response.success) {
        this.uploading_now = false;
        this.uploaded_image = true;
      }
      else {
        bootbox.alert("There was an error while uploading your image!");
      }
    });
  }

  isInstrumentAvailable(instrument: string) {

    var selected_instruments = [];

    if (this.editMode=='substep'&&this.addMode=='no') {
      selected_instruments = [...Array.from(new Set(this.edit_substep.instruments.map(it=>it.id)))];
    }
    else if (this.addMode=='substep') {
      selected_instruments = [...Array.from(new Set(this.add_substep.instruments.map(it=>it.id)))];
    }
    else if (this.addMode=='step') {
      selected_instruments = [...Array.from(new Set(this.add_step.substep.instruments.map(it=>it.id)))];
    }
    else if (this.addMode=='phase') {
      selected_instruments = [...Array.from(new Set(this.add_phase.step.substep.instruments.map(it=>it.id)))];
    }

    if (selected_instruments.includes(instrument)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkInstruments(substep: Substep) {
    if (substep.instruments.filter(obj=>obj.assigned!='none').length>0) {
      return true;
    }
    else {
      return false;
    }
  }
}
