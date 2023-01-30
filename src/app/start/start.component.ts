import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedureService } from '../procedure.service';
import { ProcedureList} from '../models/procedure';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { MatDialog } from '@angular/material';

declare var bootbox: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  procedure_list: any[];
  procedure_list_review: any[];
  procedure_request_review: any;
  procedure_request: any = {procedure:"none", type: "none", name: ""};
  types: string[] = [];
  names: string[] = [];
  create: boolean = false;
  choice: boolean = false;
  user_choice: string = "";

  @ViewChild('onreview') onReviewDialog: TemplateRef<any>;
  @ViewChild('onedit') onEditDialog: TemplateRef<any>;
  @ViewChild('newprocedure') onCreateDialog: TemplateRef<any>;
  @ViewChild('onperform') onPerformDialog: TemplateRef<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private procedure_service: ProcedureService,
    private modalService: NgbModal,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.procedure_service.setParameters();
    this.procedure_service.getProcedureList().subscribe(
      (response: ProcedureList) => {
        const data = response;
        this.procedure_list = data.procedures;
        const all_types = this.procedure_list.map(data => data.type);
        this.types = all_types.filter((x, i, a) => x && a.indexOf(x) === i);
      },
      (error) => console.log(error)
    );

    this.procedure_service.getReviewProcedureList().subscribe(
      (response: ProcedureList) => {
        const data = response;
        this.procedure_list_review = data.procedures;
      },
      (error) => console.log(error)
    );
  }

  onPerform(open_modal) {
    this.modalService.dismissAll(open_modal);
    localStorage.setItem("procedure", this.procedure_request.procedure);
    localStorage.setItem("procedure_type", this.procedure_request.type);
    localStorage.setItem("procedure_name", this.procedure_request.name);
    this.router.navigate(['/verify']);
  }

  OpenModal() {
    var dialogRef = this.dialog.open(this.onCreateDialog);
  }

  onEdit(type: string, open_modal, next_modal = 0) {
    if (type == "old_name") {
      this.modalService.dismissAll(open_modal);
      localStorage.setItem("procedure", this.procedure_request.procedure);
      localStorage.setItem("procedure_type", this.procedure_request.type);
      localStorage.setItem("procedure_name", this.procedure_request.procedure);
      this.router.navigate(['/edit']);
    }
    else {

      this.modalService.dismissAll(open_modal);
      if(this.procedure_request.name.indexOf(' ') >= 0){
        bootbox.alert("The procedure name should not have spaces!");
      }
      else {
        localStorage.setItem("procedure", this.procedure_request.procedure);
        localStorage.setItem("procedure_type", this.procedure_request.type);
        localStorage.setItem("procedure_name", this.procedure_request.name);
        this.router.navigate(['/edit']);
      }
    }
  }

  onTypeSelect(type: string) {
    const all_names = this.procedure_list.filter(entry => entry.type==type&&entry.name!=='Prototype');
    this.names = all_names.map(data => data.name);
    //this.procedure_request.procedure = this.names[0];
  }

  onReview() {
    let dialogRef = this.dialog.open(this.onReviewDialog);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'proceed') {
              localStorage.setItem("procedure", this.procedure_request_review.name);
              localStorage.setItem("procedure_type", this.procedure_request_review.type);
              localStorage.setItem("procedure_name", this.procedure_request_review.name);
              this.router.navigate(['/review']);
            }
        }
    });
  }

  onChoice(user_choice: string) {
    this.user_choice = user_choice;
    switch(user_choice)  {
      case 'create':
        this.choice = true;
        this.procedure_request.procedure = "Prototype";
        this.create = true;
        break;
      case 'edit':
	this.procedure_request.procedure = "none";
	this.procedure_request.type = "none";
        this.choice = true;
	this.create = false;
        break;
      case 'perform':
        this.choice = true;
	this.create = false;
        break;
      case 'review':
        this.onReview();
        break;
    }
  }

  onProceed() {
    switch(this.user_choice)  {
      case 'create':
        var dialogRef = this.dialog.open(this.onCreateDialog);
        break;
      case 'edit':
        dialogRef = this.dialog.open(this.onEditDialog);
        break;
      case 'perform':
        dialogRef = this.dialog.open(this.onPerformDialog);
        break;
    }
  }
}
