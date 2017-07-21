import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Icon, Segment, Modal, Button, Header } from "semantic-ui-react";
import { Pagination } from 'react-bootstrap';

class PhotoList extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      activePage: 1
    };
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }


  renderPhoto(photo){
    let {farm, server, id, secret, title, owner} = photo
    if (title===""){
      title = "No title for this photo!"
    }
    const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    return (
      <Card >
        <Image fluid style={{width:250, height:250, margin:8}} src={imageUrl}/>
        <Card.Content extra>
          <Modal size="medium" trigger={<Button icon="expand"></Button>} closeIcon='close'>
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
      if (!this.props.photolist[0]){
        return null
      }
        const photos = this.props.photolist[0].photos.photo
        const pages = Math.ceil(photos.length/10)
        const endpoint = (this.state.activePage*10)
        const startpoint = endpoint-10
        const displayedPhotos = photos.slice(startpoint, endpoint)

        return (
          <Segment padded >
            <Card.Group itemsPerRow={5}>
              {displayedPhotos.map(this.renderPhoto.bind(this))}
            </Card.Group>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={pages}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
          </Segment>
        );
    }
}

function mapStateToProps({ photolist }) {
  return { photolist };
}

export default connect(mapStateToProps)(PhotoList);
