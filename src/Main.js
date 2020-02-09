import React from "react";
import styled from "styled-components";
import ImageUpload from "./Components/ImageUpload";
import DiagnosisSelector from "./Components/DiagnosisSelector";
import Button from "./Components/Button";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";

const Title = styled.div`
  width: 50%;
  padding: 10px;
  font-size: 2em;
  color: #fa8072;
  font-weight: bold;
`;

const Description = styled.div`
  width: 50%;
  font-size: 0.5em;
  color: #ffffff;
  padding-bottom: 50px;
`;

const SelectorContainer = styled.div`
  width: 50%;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSubmitted: false,
      loading: false,
      shouldRenderError: false
    };
    this.selectedDiagnosis = "";
    this.length = 0;
  }

  renderHasSubmitted() {
    if (!this.state.hasSubmitted) {
      return (
        <SelectorContainer>
          <DiagnosisSelector
            setSelectedDiagnosis={this.setSelectedDiagnosis.bind(this)}
          />
          <Button
            content="Get Diagnosis"
            onClick={this.onButtonClick.bind(this)}
          />
        </SelectorContainer>
      );
    } else if (this.state.hasSubmitted && this.state.loading) {
      return (
        <div>
          <ClipLoader
            size={150}
            //size={"150px"} this also works
            color={"#123abc"}
            loading={true}
          />
          <p>Processing Image</p>
        </div>
      );
    } else {
      const percent = this.randomIntFromInterval(80, 99);
      const booleanInt = this.randomIntFromInterval(30, 99);
      const boolean = booleanInt > 50;

      const haveOrNot = boolean ? "have" : "dont have";
      console.log(percent);
      return (
        <p>
          With {percent} % confidence, we have determined that you {haveOrNot}{" "}
          the disease.
        </p>
      );
    }
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setSelectedDiagnosis(diagnosis) {
    this.selectedDiagnosis = diagnosis.value;
  }

  onButtonClick() {
    if (this.length == 0) {
        this.setState({
            shouldRenderError: true,
        })
    } else {
        console.log("reached")
      this.setState({
        shouldRenderError: false,
        hasSubmitted: true,
        loading: true
      });

      let superThis = this;
      setTimeout(function() {
        superThis.setState({
          loading: false
        });
      }, this.randomIntFromInterval(1000, 3000));
    }
  }

  setSelectedImageLength(length) {
      console.log(length)
    this.length = length;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title>Diagnoser</Title>
          <Description>
            Upload a picture of what needs to be diagnosed, and the diagnosis
            you are checking!
          </Description>
          <ImageUpload
            shouldRenderError={this.state.shouldRenderError}
            setSelectedImageLength={this.setSelectedImageLength.bind(this)}
          />
          {this.renderHasSubmitted()}
        </header>
      </div>
    );
  }
}

export default Main;
