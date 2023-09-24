import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {
  useMediaQuery,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import Loading from "../../../providers/Loading";
import PropertyDetailsSchema from "./PropertyDetailsSchema";
import LocationComponent from "./LocationComponent";
import ImgUploadComponent from "./ImgUploadComponent";
import FormComponent from "./FormComponent";
import FinalDetailsComponent from "./FinalDetailsComponent";
import { addResidence } from "../../../services/api";

const ModelContext = React.createContext(null);

export const AddResidenceModal = ({ children }) => {
  //user checked and geting email

  // geting the refreshing functions

  //model control
  const [size, setSize] = React.useState(undefined);

  const handleOpen = () => {
    setSize("lg");
  };
  const handlClose = () => {
    setSize(undefined);
  };

  // check  is phone size
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // stepper control
  const steps = [
    "Get Your Location",
    "Get Some Images",
    "Property Details",
    "Lets Talk Mony",
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  /// / !importent this is the detils that will be handel to the server

  const [PropertyDetails, setPropertyDetails] = React.useState(
    PropertyDetailsSchema
  );

  ///caliing the serves to finsh the jop

   async function SendTObackEnd() {
   await addResidence(PropertyDetails);
    handleReset();
    handlClose();
  }

  // render the compenets
  const RenderComponents = () => {
    switch (activeStep) {
      case 0:
        return (
          <LocationComponent
            PropertyDetails={PropertyDetails}
            setPropertyDetails={setPropertyDetails}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 1:
        return (
          <ImgUploadComponent
            PropertyDetails={PropertyDetails}
            setPropertyDetails={setPropertyDetails}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <FormComponent
            PropertyDetails={PropertyDetails}
            setPropertyDetails={setPropertyDetails}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <FinalDetailsComponent
            PropertyDetails={PropertyDetails}
            setPropertyDetails={setPropertyDetails}
            handleBack={handleBack}
            handlClose={handlClose}
            handleReset={handleReset}
            SendTObackEnd={SendTObackEnd}
          />
        );
      default:
        return (
          <LocationComponent
            PropertyDetails={PropertyDetails}
            setPropertyDetails={setPropertyDetails}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
    }
  };

  return (
    <>
      <Modal open={!!size}>
        <ModalDialog
          aria-labelledby="size-modal-title"
          aria-describedby="size-modal-description"
          size={size}
        >
          <Box onClick={handlClose}>
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(-1/4 * var(--IconButton-size))",
                right: "calc(-1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
                bgcolor: "background.surface",
              }}
            />
          </Box>

          <Box
            sx={{
              width: "60vw",
              height: isSmallScreen ? "80vh" : "60vh",
              overflow: "auto",
            }}
          >
            <Stepper
              activeStep={activeStep}
              orientation={isSmallScreen ? "vertical" : "horizontal"}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>{RenderComponents()}</React.Fragment>
            )}
          </Box>
        </ModalDialog>
      </Modal>

      <ModelContext.Provider value={{ handleOpen }}>
        {children}
      </ModelContext.Provider>
    </>
  );
};

export const useModel = () => {
  const Context = React.useContext(ModelContext);
  return Context;
};
