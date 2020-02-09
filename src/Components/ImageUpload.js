import React from "react";
import ImageUploader from "react-images-upload";
import styled from "styled-components";

const ImageUploadContainer = styled.div`
  width: 50%;
  max-height: 30%;
`;

const RedText = styled.div`
  color: red;
`;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    this.props.setSelectedImageLength(1)
  }

  renderError() {
    if (this.props.shouldRenderError) {
      return <RedText>Please put in an image</RedText>;
    }
  }

  renderBody() {
    if (this.state.pictures.length == 0) {
      return (
        <ImageUploadContainer>
          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          {this.renderError()}
        </ImageUploadContainer>
      );
    } else {
      return (
        <ImageUploadContainer>
          <img src={URL.createObjectURL(this.state.pictures[0])} width="50%" />
        </ImageUploadContainer>
      );
    }
  }

  render() {
    console.log(this.state.pictures);
    return this.renderBody();
  }
}

export default ImageUpload;
