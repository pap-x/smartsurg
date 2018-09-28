import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedureService } from '../procedure.service';
import { ProcedureList} from '../models/procedure';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

declare var bootbox: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  procedure_list: any[];
  procedure_request: any = {procedure:"none", type: "none", name: ""};
  types: string[] = [];
  names: string[] = [];
  create: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private procedure_service: ProcedureService
  ) { }

  ngOnInit() {
    this.procedure_service.getProcedureList().subscribe(
      (response: ProcedureList) => {
        const data = response;
        this.procedure_list = data.procedures;
        const all_types = this.procedure_list.map(data => data.type);
        this.types = all_types.filter((x, i, a) => x && a.indexOf(x) === i);
      },
      (error) => console.log(error)
    );
  }

  onCreate() {
    this.create = true;
  }

  onEdit() {
    if (this.procedure_request.procedure=="Prototype"&&this.procedure_request.name=="") {
      bootbox.alert("You have to create a procedure first with a new name!");
    }
    else {
      this.procedure_service.setProcedureRequest(this.procedure_request);
      this.router.navigate(['/edit']);
    }
  }

  onTypeSelect(type: string) {
    const all_names = this.procedure_list.filter(entry => entry.type==type);
    this.names = all_names.map(data => data.name);
    this.procedure_request.procedure = "none";
  }
}
