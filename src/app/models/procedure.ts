export interface Procedure {
    name: string;
    type: string;
    phases: [{
        name: string;
        order: number;
        id: string;
        steps: [{
            name: string;
            order: number;
            time_completed: number;
            id: string;
            comments: string;
            skipped: boolean;
            bg: string;
            time_start: string;
            time_end: string;
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
                actionDescriptions: string[];
            }];
        }];
    }];
}

export interface Substep {
    name: string;
    action: string;
    instruments: {
        id: string;
        assigned: string;
    }[];
    anatomies: string[];
    extras: string;
    order: number;
    image: string;
    id: string;
    step: string;
    parallel: boolean;
    actionDescriptions: string[];
}

export interface Step {
    name: string;
    order: number;
    phase: string;
    id: string;
    substep: {
        name: string;
        action: string;
        instruments: {
            id: string;
            assigned: string;
        }[];
        anatomies: string[];
        extras: string;
        order: number;
        image: string;
        id: string;
        parallel: boolean;
        actionDescriptions: string[];
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
            instruments: {
                id: string;
                assigned: string;
            }[];
            anatomies: string[];
            extras: string;
            order: number;
            image: string;
            id: string;
            parallel: boolean;
            actionDescriptions: string[];
        };
    }
}

export interface SuccessResponse {
    success: string;
    name: string;
}

export interface Anatomy {
    name: string;
}

export interface ProcedureList {
    procedures: [{
        name: string;
        type: string;}];
}

export interface InstrumentList {
    instruments: [{
        id: string;
        forHuman: boolean;
        robotic: boolean;
    }];
}

export interface TypeList {
    types: string[];
}

export interface AnatomyList {
    anatomies: string[];
}

export interface ActionList {
    actions: string[];
}

export interface DescriptionList {
    actionDescriptions: string[];
}

export interface EditName {
    name: string;
    id: string;
}

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

export const test_procedure: Procedure = JSON.parse(`{
  "name": "Test",
  "type": "Robot-Assisted Partial Nephrectomy",
  "phases": [
      {
          "name": "Kidney Preparation",
          "id": "KidneyPreparation",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/peritoneum_traction.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "ParietalPeritoneum"
                          ],
                          "name": "Parietal Peritoneum Traction",
                          "action": "Traction",
                          "extras": "",
                          "id": "ParietalPeritoneumTraction",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/peritoneum_dissection.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "ParietalPeritoneum"
                          ],
                          "name": "Parietal Peritoneum Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "ParietalPeritoneumSubDissection",
                          "order": 1
                      }
                  ],
                  "name": "Parietal Peritoneum Dissection",
                  "id": "ParietalPeritoneumDissection",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_preparation_exposure_1.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "KidneyAdipose"
                          ],
                          "name": "Kidney Adipose Exposure",
                          "action": "Exposure",
                          "extras": "",
                          "id": "KidneyAdiposeSubExposure",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [
                              "Gently"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_preparation_exposure_4.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "Colon"
                          ],
                          "name": "Colon Lowering",
                          "action": "Lowering",
                          "extras": "",
                          "id": "ColonLowering",
                          "order": 1
                      }
                  ],
                  "name": "Kidney Adipose Exposure",
                  "id": "KidneyAdiposeExposure",
                  "order": 2
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_prep_mes_diss_6.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "Mesocolon"
                          ],
                          "name": "Mesocolon Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "MesoColonDissection",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_prep_mes_diss_10.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "11Blade"
                              },
                              {
                                  "assigned": "none",
                                  "id": "ElectrocauteryDevice"
                              }
                          ],
                          "anatomies": [
                              "Mesocolon"
                          ],
                          "name": "Mesocolon Incision",
                          "action": "Incision",
                          "extras": "",
                          "id": "MesoColonIncision",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/gonadic_vein_isolation.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "VesselLoops"
                              }
                          ],
                          "anatomies": [
                              "Uterer",
                              "GonadicVein"
                          ],
                          "name": "Uterer Gonadic Vein Isolation",
                          "action": "Isolation",
                          "extras": "",
                          "id": "UtererGonadicVeinIsolation",
                          "order": 2
                      }
                  ],
                  "name": "Mesocolon Incision and Dissection",
                  "id": "MesoColonIncisionDissection",
                  "order": 3
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_prep_dissection_gerotas_2.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "Kidney"
                          ],
                          "name": "Kidney Manipulation",
                          "action": "Manipulation",
                          "extras": "",
                          "id": "KidneyManipulation",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [
                              "Bluntly"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_prep_dissection_gerotas_7.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "Kidney",
                              "VenaCava",
                              "Aorta"
                          ],
                          "name": "Kidney Blunt Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "KidneyBluntDissection",
                          "order": 1
                      }
                  ],
                  "name": "Kidney Dissection",
                  "id": "KidneyDissection",
                  "order": 4
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_preparation_ligaments_cut_3.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "11Blade"
                              }
                          ],
                          "anatomies": [
                              "Kidney",
                              "Spleen",
                              "Liver"
                          ],
                          "name": "Cut Ligaments Between Kidney and Liver/Spleen",
                          "action": "Cut",
                          "extras": "",
                          "id": "LigamenstsCutSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Cut Ligaments",
                  "id": "LigamentsCutStep",
                  "order": 5
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [
                              "Away",
                              "Gently"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/kidney_prep_liver_away_7.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "Kidney",
                              "Spleen",
                              "Liver"
                          ],
                          "name": "Push Liver/Spleen away from Kidney",
                          "action": "Push",
                          "extras": "",
                          "id": "PushAwayLiver/SpleenSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Push Liver/Spleen Away",
                  "id": "PushAwayLiver/SpleenStep",
                  "order": 6
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/free_upper_pole.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "Spleen",
                              "KidneyUpperPole",
                              "Liver"
                          ],
                          "name": "Free  Kidney Upper Pole",
                          "action": "Free",
                          "extras": "",
                          "id": "FreeKidneysubstep",
                          "order": 1
                      }
                  ],
                  "name": "Free Kidney Upper Pole",
                  "id": "FreeKidneyUpperPolestep",
                  "order": 7
              }
          ],
          "order": 1
      },
      {
          "name": "Upper Pole Preparation",
          "id": "UpperPolePreparation",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "Kidney"
                          ],
                          "name": "Kidney Mobilization",
                          "action": "Manipulation",
                          "extras": "",
                          "id": "KidneyMobilizationSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Kindey Mobilization",
                  "id": "KidneyMobilizationStep",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [],
                          "anatomies": [
                              "Spleen",
                              "Liver"
                          ],
                          "name": "Liver/Spleen Retraction",
                          "action": "Retraction",
                          "extras": "",
                          "id": "LiverSpleenRetraction",
                          "order": 1
                      }
                  ],
                  "name": "Liver/Spleen Retraction",
                  "id": "UpperPoleDissectionStep",
                  "order": 2
              }
          ],
          "order": 2
      },
      {
          "name": "Hilum Isolation",
          "id": "HilumIsolation",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/hilum_isolation_renal_pedicle_5.png",
                          "instruments": [],
                          "anatomies": [
                              "renalPedicle"
                          ],
                          "name": "Reach Renal Pedicle",
                          "action": "Reach",
                          "extras": "indocyanine green",
                          "id": "ReachRenalPedicleSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Reach Renal Pedicle",
                  "id": "ReachRenalPedicleStep",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [
                              "Gently"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/hilum_isolation_vessel_dissection_4.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "Vessels"
                          ],
                          "name": "Vessel Manipulation",
                          "action": "Manipulation",
                          "extras": "",
                          "id": "VesselManipulation",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [
                              "Bluntly",
                              "Circumferentially"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/hilum_isolation_vessel_dissection_13.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "Vessels"
                          ],
                          "name": "Circumferential Vessel Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "CircumferentialVesselDissection",
                          "order": 1
                      }
                  ],
                  "name": "Vessel Dissection and Manipulation",
                  "id": "VesselDissectionAndManipulation",
                  "order": 2
              }
          ],
          "order": 3
      },
      {
          "name": "Tumor Preparation",
          "id": "TumorPreparation",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/adipose_capsule_manipulation.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "KidneyAdipose"
                          ],
                          "name": "Pull of Adipose Capsule",
                          "action": "Pull",
                          "extras": "",
                          "id": "PullOfAdiposeCapsule",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/adipose_capsule_manipulation.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "KidneyAdipose"
                          ],
                          "name": "Adipose Capsule Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "AdiposeCapsuleDissection",
                          "order": 2
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/adipose_capsule_mass_recognition.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "KidneyAdipose"
                          ],
                          "name": "Tumor Mass Recognition",
                          "action": "Exposure",
                          "extras": "",
                          "id": "TumorMassRecognition",
                          "order": 2
                      }
                  ],
                  "name": "Adipose Capsule Manipulation and Dissection",
                  "id": "AdiposeCapsuleManipulationAndDissection",
                  "order": 1
              }
          ],
          "order": 4
      },
      {
          "name": "Tumor Excision",
          "id": "TumorExcision",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [
                              "Hemi-circumferentially",
                              "Sharply",
                              "Circumferentially"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_incision_3.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "11Blade"
                              },
                              {
                                  "assigned": "none",
                                  "id": "ElectrocauteryDevice"
                              }
                          ],
                          "anatomies": [
                              "RenalCapsule"
                          ],
                          "name": "Renal Capsule Incision",
                          "action": "Incision",
                          "extras": "",
                          "id": "RenalCapsuleIncision",
                          "order": 1
                      }
                  ],
                  "name": "Circumferential Renal Capsule Incision",
                  "id": "CircumferentialRenalCapsuleIncision",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_clamping_4.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "renalPedicle"
                          ],
                          "name": "Renal Pedicle Exposure",
                          "action": "Exposure",
                          "extras": "",
                          "id": "RenalPedicleExposure",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_clamping_9.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "RenalArteries"
                          ],
                          "name": "Renal Artery Clamping",
                          "action": "Clamping",
                          "extras": "",
                          "id": "RenalArteryClamping",
                          "order": 2
                      }
                  ],
                  "name": "Renal Pedicle Exposure and Clamping",
                  "id": "renalPedicleExposureAndClamping",
                  "order": 2
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_dissecxtion_5.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "PseudoCapsule",
                              "Tumor"
                          ],
                          "name": "Tumor Traction",
                          "action": "Traction",
                          "extras": "",
                          "id": "TumorTraction",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [
                              "Bluntly"
                          ],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_dissection.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "MonopolarCurvedScissors"
                              }
                          ],
                          "anatomies": [
                              "PseudoCapsule",
                              "Tumor"
                          ],
                          "name": "Tumor Blunt Dissection",
                          "action": "Dissection",
                          "extras": "",
                          "id": "TumorBluntDissection",
                          "order": 1
                      }
                  ],
                  "name": "Tumor Dissection",
                  "id": "TumorDissection",
                  "order": 3
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_excision_8.png",
                          "instruments": [],
                          "anatomies": [
                              "Tumor"
                          ],
                          "name": "Tumor Excision",
                          "action": "Excision",
                          "extras": "",
                          "id": "TumorExcisionSubstep",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/tumor_exc_excision_19.png",
                          "instruments": [],
                          "anatomies": [
                              "Tumor"
                          ],
                          "name": "Put Tumor Inside Endobag",
                          "action": "Put",
                          "extras": "endobag",
                          "id": "PutTumorInEndobagSubstep",
                          "order": 2
                      }
                  ],
                  "name": "Tumor Excision",
                  "id": "TumorExcisionStep",
                  "order": 4
              }
          ],
          "order": 5
      },
      {
          "name": "Renal Breach Closure",
          "id": "RenalBreachClosure",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_medullary_suture_2.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "LargeSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MediumSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "SmallSucker"
                              }
                          ],
                          "anatomies": [
                              "RenalCapsule"
                          ],
                          "name": "Suture Cleaning",
                          "action": "Cleaning",
                          "extras": "",
                          "id": "SutureCleaning",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_medullary_suture_14.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "LargeNeedleDriver"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoNeedleHolder"
                              }
                          ],
                          "anatomies": [
                              "RenalCapsule"
                          ],
                          "name": "Medullary Suture",
                          "action": "Suture",
                          "extras": "3/0 monocryl sutures, fibrin sealant patches hem-o-loc clips, lapra-ty clips",
                          "id": "MedullarySuture",
                          "order": 1
                      }
                  ],
                  "name": "Medullary Suture",
                  "id": "MedullarySutureStep",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_renal_medulla_3.png",
                          "instruments": [],
                          "anatomies": [
                              "RenalMedulla"
                          ],
                          "name": "Renal Medulla Closure",
                          "action": "Secure",
                          "extras": "fibrin sealant patches, hem-o-loc clips, lapra-ty clips",
                          "id": "RenalMedullaClosureSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Renal Medulla Closure",
                  "id": "RenalMedullaClosureStep",
                  "order": 2
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_renal_suture_8.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "LargeNeedleDriver"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoNeedleHolder"
                              }
                          ],
                          "anatomies": [
                              "RenalCortical"
                          ],
                          "name": "Cortical Suture",
                          "action": "Suture",
                          "extras": "3/0 monocryl sutures, fibrin sealant patches, lapra-ty clips, hem-o-lok clips",
                          "id": "CorticalSuture",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/suture_cleaning.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "LargeSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MediumSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "SmallSucker"
                              }
                          ],
                          "anatomies": [
                              "RenalCortical"
                          ],
                          "name": "Cortical Suture Cleaning",
                          "action": "Cleaning",
                          "extras": "",
                          "id": "CorticalSutureCleaning",
                          "order": 1
                      }
                  ],
                  "name": "Renal Cortical Suture",
                  "id": "RenalCorticalSutureStep",
                  "order": 3
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_parenchyma_approx_5.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "Johann"
                              }
                          ],
                          "anatomies": [
                              "RenalCortical"
                          ],
                          "name": "Parenchyma Re-approximation",
                          "action": "Manipulation",
                          "extras": "2/0 vicryl sutures, hem-o-loc clips, lapra-ty clips",
                          "id": "ParenchymaReapproximation",
                          "order": 1
                      }
                  ],
                  "name": "Cortical Parenchyma Re-approximation",
                  "id": "CorticalParenchymaReApproximation",
                  "order": 4
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_pedicle_unclamped_4.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "renalPedicle"
                          ],
                          "name": "Unclamp Renal Pedicle",
                          "action": "Unclamping",
                          "extras": "",
                          "id": "UnclampRenalPedicle",
                          "order": 1
                      }
                  ],
                  "name": "Renal Pedicle Unclamped",
                  "id": "RenalPedicleUnclamped",
                  "order": 5
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/hemostasis_check.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              }
                          ],
                          "anatomies": [
                              "RenalArteries",
                              "renalPedicle",
                              "RenalMedulla",
                              "RenalCapsule"
                          ],
                          "name": "Renal Hemostasis Inspection",
                          "action": "Inspection",
                          "extras": "",
                          "id": "RenalHemostasisInspection",
                          "order": 1
                      },
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/hemostasis_check.png",
                          "instruments": [],
                          "anatomies": [
                              "renalPedicle",
                              "RenalCapsule"
                          ],
                          "name": "Hemostasis Apply Pressure",
                          "action": "ApplyPressure",
                          "extras": "",
                          "id": "HemostasisApplyPressure",
                          "order": 1
                      }
                  ],
                  "name": "Hemostasis Check",
                  "id": "Hemostasischeck",
                  "order": 6
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/rbclosure_gerotas_recon_8.png",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "LargeSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MediumSucker"
                              },
                              {
                                  "assigned": "none",
                                  "id": "SmallSucker"
                              }
                          ],
                          "anatomies": [
                              "GerotasFascia"
                          ],
                          "name": "Fascia Reconstruction",
                          "action": "Reconstruction",
                          "extras": "",
                          "id": "FasciaReconstruction",
                          "order": 1
                      }
                  ],
                  "name": "Gerotas Fascia Reconstruction",
                  "id": "GerotasFasciaReconstruction",
                  "order": 7
              }
          ],
          "order": 6
      },
      {
          "name": "Closure",
          "id": "Closure",
          "steps": [
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [],
                          "anatomies": [
                              "Kidney"
                          ],
                          "name": "Insertion of Drains",
                          "action": "Insertion",
                          "extras": "10 inch Jackson-Pratt drain, 15 inch blake drain",
                          "id": "InsertionOfDrains",
                          "order": 1
                      }
                  ],
                  "name": "Drain Insertion",
                  "id": "DrainInsertion",
                  "order": 1
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [],
                          "anatomies": [],
                          "name": "Trocar Removal",
                          "action": "Removal",
                          "extras": "trocar",
                          "id": "TrocarRemovalSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Trocar Removal",
                  "id": "TrocarRemovalStep",
                  "order": 2
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [],
                          "anatomies": [],
                          "name": "Specimen Extraction",
                          "action": "Extraction",
                          "extras": "endobag",
                          "id": "SpecimenExtractionSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Specimen Extraction",
                  "id": "SpecimenExtractionStep",
                  "order": 3
              },
              {
                  "substeps": [
                      {
                          "actionDescriptions": [],
                          "image": "http://160.40.51.194/smartsurg_images/RAPN/surgery.jpg",
                          "instruments": [
                              {
                                  "assigned": "none",
                                  "id": "BulldogClamps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "BipolarFenestratedForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "MonopolarForceps"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoForcep"
                              },
                              {
                                  "assigned": "none",
                                  "id": "LargeNeedleDriver"
                              },
                              {
                                  "assigned": "none",
                                  "id": "CastroviejoNeedleHolder"
                              }
                          ],
                          "anatomies": [],
                          "name": "Skin Closure",
                          "action": "Suture",
                          "extras": "4/0 monocryl subculticular suture",
                          "id": "SkinClosureSubstep",
                          "order": 1
                      }
                  ],
                  "name": "Skin Closure",
                  "id": "SkinClosureStep",
                  "order": 4
              }
          ],
          "order": 7
      }
  ]
}`);

export const PROCEDURE: Procedure = test_procedure;
