import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

const options = ["Pneumonia", "Skin Cancer", "Cataract"];
const defaultOption = options[0];

const DropdownContainer = styled.div`
  display: flex;
  width: 50%;
  padding: 50px;
  margin-left: 10%;
  @media (min-width: 768px) {
    margin-left: 20%;
  }  
  justify-content: center;
`;
const DropdownText = styled.div`
  padding-right: 20px;
`;

class DiagnosisSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSelect(selected) {
    this.props.setSelectedDiagnosis(selected);
    //this.props.setSelectedDiagnosis(selected);
  }

  render() {
    return (
      <DropdownContainer>
        <DropdownText>Select your diagnosis: </DropdownText>
        <Dropdown
          options={options}
          onChange={this._onSelect.bind(this)}
          value={defaultOption}
          placeholder="Select an option"
        />
      </DropdownContainer>
    );
  }
}
export default DiagnosisSelector;
