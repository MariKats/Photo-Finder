import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Grid, Modal, Button, Header } from "semantic-ui-react";

class PhotoList extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      activePage: 1
    };
  }

  handleSelect(event) {
    this.setState({
      activePage: Number(event.target.id)
    });
  }

  onLeftArrowClick(event) {
    if (this.state.activePage>=2){
      this.setState({
        activePage: Number(this.state.activePage)-1
      });
    }
  }

  onRightArrowClick(event) {
    if (this.state.activePage<10){
      this.setState({
        activePage: Number(this.state.activePage)+1
      });
    }
  }


  renderPhoto(photo){
    let {farm, server, id, secret, title, owner} = photo
    if (title===""){
      title = "No title for this photo!"
    }
    const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    return (
      <Grid.Column key={id} style={{paddingTop:30}}>
        <Card color="teal" style={{width:200}}>
          <Image style={{width:200, height:200}} src={imageUrl}/>
          <Card.Content>
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
      </Grid.Column>

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
        for (let i = 1; i <= Math.ceil(photos.length/10); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <a
              key={number}
              className={this.state.activePage===number?"active":"normal"}
              id={number}
              onClick={this.handleSelect.bind(this)}>
              {number}
            </a>
          );
        });

        return (
          <Grid className="centered" container columns='five'>
            <Grid.Row>
              {displayedPhotos.map(this.renderPhoto.bind(this))}
            </Grid.Row>
            <Grid.Row>
              <div className="pagination">
                <a onClick={this.onLeftArrowClick.bind(this)}>&laquo;</a>
                  {renderPageNumbers}
                <a onClick={this.onRightArrowClick.bind(this)}>&raquo;</a>
              </div>
            </Grid.Row>
          </Grid>
        );
    }
}

function mapStateToProps({ photolist }) {
  return { photolist };
}

export default connect(mapStateToProps)(PhotoList);
