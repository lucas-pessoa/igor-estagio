import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class StepperComponent extends React.Component {
  state = {
    activeStep: 0,
    steps: [],
    stepsContent: []
  }

  constructor(props){
    super(props);
    this.setActiveStep.bind(this);
    this.handleBack.bind(this);
    this.handleNext.bind(this);
    this.handleReset.bind(this);

  }

  componentDidMount() {
    this.setState({
      steps: this.props.steps,
      stepsContent: this.props.content
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.content !== this.props.content) {
      this.setState({
        stepsContent: this.props.content
      })
    }
  }
  
  setActiveStep = (index) => {
    this.setState({
      activeStep: index
    })
  }
  
  handleNext = () => {
    const prev = this.state.activeStep;
    if(this.props.onNext(prev,this.props.state))
      this.setActiveStep(prev + 1);
  }

  handleBack = () => {
    const prev = this.state.activeStep;
    this.setActiveStep(prev - 1);
  }

  handleReset = () => {
    this.setActiveStep(0);
  }

  render() {
    const {steps, activeStep} = this.state;
    // console.log("propzera",this.props);
    // console.log("state",this.state);
    return (
      //<div className={classes.root}>
        <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              {/* <Typography className={classes.instructions}>All steps completed</Typography> */}
              <Typography>Envio finalizado!</Typography>
              <Button onClick={() => this.handleReset()}>Reiniciar</Button>
            </div>
          ) : (
            <div>
              {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
              <div>{this.state.stepsContent[activeStep]}</div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => this.handleBack()}
                  //className={classes.backButton}
                >
                  Anterior
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.handleNext()}>
                  {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
}

export default StepperComponent;