export interface Procedure {
    name: string;
    type: string;
    phases: [{
        name: string;
        order: number;
        steps: [{
            name: string;
            order: number;
            substeps: [{
                name: string;
                action: string;
                instruments: [{
                    id: string;
                    assigned: string;
                }];
                anatomies: string[];
                extras: string[];
                order: number;
                image: string;
                id: string;
            }];
        }];
    }];
}

export interface Substep {
    name: string;
    action: string;
    instruments: [{
        id: string;
        assigned: string;
    }];
    anatomies: string[];
    extras: string[];
    order: number;
    image: string;
    id: string;
    step: string;
    parallel: boolean;
}

export interface Step {
    name: string;
    order: number;
    phase: string;
    id: string;
    substep: {
        name: string;
        action: string;
        instruments: [{
            id: string;
            assigned: string;
        }];
        anatomies: string[];
        extras: string[];
        order: number;
        image: string;
        id: string;
        parallel: boolean;
    };
}

export interface Phase {
    name: string;
    order: number;
    id: string;
    step: {
        name: string;
        id: string;
        substep: {
            name: string;
            action: string;
            instruments: [{
                id: string;
                assigned: string;
            }];
            anatomies: string[];
            extras: string[];
            order: number;
            image: string;
            id: string;
            parallel: boolean;
        };
    }
}

export interface SuccessResponse {
    success: string;
    name: string;
}

export interface ProcedureList {
    procedures: [{
        name: string;
        type: string;}];
}

export interface InstrumentList {
    instruments: string[];
}

export interface AnatomyList {
    anatomies: string[];
}

export interface ActionList {
    actions: string[];
}

export interface EditName {
    name: string;
    id: string;
}

export const PROCEDURE: any = {
    name: "Arthroscopy",
    phases: [{
        name: "Initial",
        steps: [{
            name: "Incision",
            substeps: [{
                name: "Test Name",
                action: "Cut Flesh",
                instruments: ["Knife"],
                anatomies: ["Leg"],
                order: 1
            },
            {
                name: "Test Name",
                action: "Grab Drainer",
                instruments: ["Drainer"],
                anatomies: ["Leg"],
                order: 2
            }]
        },
        {
            name: "Second Step",
            substeps: [{
                name: "Test Name",
                action: "Test Action",
                instruments: ["Knife"],
                anatomies: ["Leg"],
                order: 1
            },
            {
                name: "Test Name",
                action: "Test Action",
                instruments: ["Drainer"],
                anatomies: ["Leg"],
                order: 1
            }]
        }]
    },
    {
        name: "Main",
        steps: [{
            name: "Extraction",
            substeps: [{
                name: "Test Name",
                action: "Cut Flesh",
                instruments: ["Knife"],
                anatomies: ["Leg"],
                order: 1
            },
            {
                name: "Test Name",
                action: "Grab Drainer",
                instruments: ["Drainer"],
                anatomies: ["Leg"],
                order: 2
            }]
        },
        {
            name: "Stiching",
            substeps: [{
                name: "Test Name",
                action: "Test Action",
                instruments: ["Knife"],
                anatomies: ["Leg"],
                order: 1
            },
            {
                name: "Test Name",
                action: "Test Action",
                instruments: ["Drainer"],
                anatomies: ["Leg"],
                order: 1
            }]
        }]
    }]
};

export const NEW_PHASE: any = {
    name: "NewPhase",
    steps: [{
        name: "NewStep",
        seq: 0,
        substeps: [{
            name: "NewSubstep",
            action: "NewAction",
            instruments: [],
            anatomies: [],
            extras: [],
            order: 0,
        }]
    }]
};