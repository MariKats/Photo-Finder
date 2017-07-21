import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Container, Modal, Button, Header } from "semantic-ui-react";

class PhotoList extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      activePage: 1
    };
  }

  handleSelect(event) {
    console.log(process.env.API_KEY)
    this.setState({
      activePage: event.target.id
    });
  }


  renderPhoto(photo){
    let {farm, server, id, secret, title, owner} = photo
    if (title===""){
      title = "No title for this photo!"
    }
    const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    return (
      <Card key={id} style={{width:200}}>
        <Image style={{width:200, height:200}} src={imageUrl}/>
        <Card.Content extra>
          <Modal trigger={<Button icon="expand"></Button>} closeIcon='close'>
          <Modal.Header>Selected Photo:</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='large' src={imageUrl}/>
                  <Modal.Description>
                    <Header>Title</Header>
                    <p>{title}</p>
                    <Header>ID</Header>
                    <p>{id}</p>
                    <Header>Owner</Header>
                    <p>{owner}</p>
                  </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    )
  }

    render() {
      if (!this.props.photolist[0] || !this.props.photolist[0].photos){
        return null
      }
        const photos = this.props.photolist[0].photos.photo
        const endpoint = (this.state.activePage*10)
        const startpoint = endpoint-10
        const displayedPhotos = photos.slice(startpoint, endpoint)
        const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(photos.length / 10); i++) {
            pageNumbers.push(i);
          }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <div key={number} className="pagination">
            <a
              className="w3-button"
              id={number}
              onClick={this.handleSelect.bind(this)}>
              {number}
            </a>
            </div>
          );
        });

        return (
          <Container style={{paddingTop: 20}}>
            <Card.Group itemsPerRow={5}>
              {displayedPhotos.map(this.renderPhoto.bind(this))}
            </Card.Group>
              <div style={{paddingTop: 20}} className="w3-center">
                <div className="w3-bar">
                  {renderPageNumbers}
                </div>
              </div>
          </Container>
        );
    }
}

function mapStateToProps({ photolist }) {
  return { photolist };
}

export default connect(mapStateToProps)(PhotoList);
