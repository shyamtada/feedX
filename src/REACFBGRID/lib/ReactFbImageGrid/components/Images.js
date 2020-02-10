import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Modal from "./Modal";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import { Waypoint } from 'react-waypoint';

class VideoPlayer extends Component {
  render() {
    return (
      <Waypoint onEnter={(data) => console.log('Hello', data)} onLeave={() => console.log('World')}>
        <ReactPlayer
          url={this.props.src || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'}
          controls
          playing
          pip
          width={'100%'}
          height={'100%'}
          preload={'true'}
          muted={this.props.muted === 1 ? true : false}
          loop
          className={'experiment'}
          ref={this.props.innerRef}
        />
      </Waypoint>
    );
  }
}

const VideoPlayerWithRef = React.forwardRef((props, ref) => {
  return <VideoPlayer innerRef={ref} {...props} />
});

class Images extends Component {
  static defaultProps = {
    hideOverlay: false,
    renderOverlay: () => "Preview",
    overlayBackgroundColor: "#222222",
    onClickEach: null,
    countFrom: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      countFrom:
        props.countFrom > 0 && props.countFrom < 5 ? props.countFrom : 5,
      conditionalRender: false,
      imageUrls: [],
      selectedImage: {},
    };

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);

    if (props.countFrom <= 0 || props.countFrom > 5) {
      console.warn("countFrom is limited to 5!");
    }

  }

  sortImages = images => {
    const imageUrls = [];
    images.forEach((img, i) => {
      if (this.pureTypeOf(img) === "object") {
        if ("iFrame" in img && img.iFrame) {
          imageUrls.push(() => (
            <div className="flex-container-div">
              <iframe
                title="cats"
                className="iframe"
                src={img.url}
                {...img.props}
              />
            </div>
          ));
        } else if ("isVideo" in img && img.isVideo) {
          imageUrls.push(() => {
            return (
              <div className="flex-container-div">
                <div>
                  <VideoPlayerWithRef src={img.url} playing={this.state.modal ? 0: 1} />
                </div>
              </div>
            )
          });
        } else {
          imageUrls.push(img.url);
        }
      } else {
        imageUrls.push(img);
      }
    });
    this.setState({
      imageUrls,
    });
  };

  componentDidMount() {
    const { images } = this.props;
    if (!images.length) return;
    this.sortImages(images);
  }

  openModal(index) {
    const { onClickEach, images } = this.props;
    const { imageUrls } = this.state;

    if (onClickEach) {
      return onClickEach({ src: imageUrls[index], index });
    }

    this.setState({
      modal: true,
      url: imageUrls[index],
      index,
      selectedImage: images[index]
    });
  }

  onClose() {
    this.setState({ modal: false });
  }

  pureTypeOf = obj => {
    return Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase();
  };

  isIframe = temp => {
    return "iFrame" in temp && temp.iFrame;
  };

  renderIframe = (url, props = {}) => {
    return <VideoPlayerWithRef src={url} className='iframe' playing={this.state.modal? 0: 1} />
  };

  renderOne() {
    const { images } = this.props;
    const { countFrom } = this.state;
    const overlay =
      images.length > countFrom && countFrom === 1
        ? this.renderCountOverlay(true)
        : this.renderOverlay();
    const firstItem = images[0];
    const firstItemRender = this.isIframe(firstItem)
      ? this.renderIframe(firstItem.url, firstItem.props)
      : this.isVideoCheck(firstItem) ? this.renderVideo(firstItem)
      : this.isImageCheck(firstItem) ? this.renderImage(firstItem)
      : overlay;

    return (
      <Grid>
        <Row>
          <Col
            xs={12}
            md={12}
            className={`border height-one-demo background`}
            onClick={this.openModal.bind(this, 0)}
          >
            {firstItemRender}
            {this.renderOverlay()}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderTwo() {
    const { images } = this.props;
    const { countFrom } = this.state;
    const overlay =
      images.length > countFrom && [2, 3].includes(+countFrom)
        ? this.renderCountOverlay(true)
        : this.renderOverlay();
    const conditionalRender =
      [3, 4].includes(images.length) ||
      (images.length > +countFrom && [3, 4].includes(+countFrom));
    const firstItem = images[0];
    const secondItem = images[1];
    const firstItemRender = this.isIframe(firstItem)
      ? this.renderIframe(firstItem.url, firstItem.props)
      : this.isVideoCheck(firstItem) ? this.renderVideo(firstItem)
      : this.isImageCheck(firstItem) ? this.renderImage(firstItem)
      : this.renderOverlay();

    const secondItemRende = this.isIframe(secondItem)
      ? this.renderIframe(secondItem.url, secondItem.props)
      : this.isVideoCheck(secondItem) ? this.renderVideo(secondItem)
      : this.isImageCheck(secondItem) ? this.renderImage(secondItem)
      : overlay;

    return (
      <Grid>
        <Row>
          <Col
            xs={6}
            md={6}
            className="border height-two-demo background"
            onClick={this.openModal.bind(this, conditionalRender ? 1 : 0)}
            style={{ overflow: 'hidden' }}
          >
            {firstItemRender}
            {this.renderOverlay()}
          </Col>
          <Col
            xs={6}
            md={6}
            className="border height-two-demo background"
            onClick={this.openModal.bind(this, conditionalRender ? 2 : 1)}
          >
            {secondItemRende}
            {overlay}
          </Col>
        </Row>
      </Grid>
    );
  }

  isVideoCheck(temp) {
    return temp && temp.isVideo;
  }

  renderVideo(temp) {
    return <VideoPlayerWithRef src={temp.url} muted={1} playing={this.state.modal? 0: 1} />
  }

  isImageCheck(temp) {
    return temp && temp.isImage;
  }

  renderImage(temp) {
    return <img src={temp.url} alt='something' style={{ height: '100%', width: '100%' }} />
  }
  
  renderThree(more) {
    const { images } = this.props;
    const { countFrom } = this.state;
    const conditionalRender =
      images.length === 4 || (images.length > +countFrom && +countFrom === 4);
    const overlay =
      !countFrom ||
        countFrom > 5 ||
        (images.length > countFrom && [4, 5].includes(+countFrom))
        ? this.renderCountOverlay(true)
        : this.renderOverlay(
          conditionalRender ? 3 : 4,
          conditionalRender ? 3 : 4
        );
    
    const firstItem = images[conditionalRender ? 1 : 2];
    const secondItem = images[conditionalRender ? 2 : 3];
    const thirdItem = images[conditionalRender ? 3 : 4];

    const firstItemRende = this.isIframe(firstItem)
      ? this.renderIframe(firstItem.url, firstItem.props)
      : this.isVideoCheck(firstItem) ? this.renderVideo(firstItem)
      : this.isImageCheck(firstItem) ? this.renderImage(firstItem)
      : this.renderOverlay(conditionalRender ? 1 : 2);

    const secondItemRende = this.isIframe(secondItem)
      ? this.renderIframe(secondItem.url, secondItem.props)
      : this.isVideoCheck(secondItem) ? this.renderVideo(secondItem)
      : this.isImageCheck(secondItem) ? this.renderImage(secondItem)
      : this.renderOverlay(conditionalRender ? 2 : 3);


    const thirdItemRende = this.isIframe(thirdItem)
      ? this.renderIframe(thirdItem.url, thirdItem.props)
      : this.isVideoCheck(thirdItem) ? this.renderVideo(thirdItem)
      : this.isImageCheck(secondItem) ? this.renderImage(secondItem)
      : overlay;

    return (
      <Grid>
        <Row>
          <Col
            xs={6}
            md={4}
            className="border height-three-demo background"
            onClick={this.openModal.bind(this, conditionalRender ? 1 : 2)}
          >
            {firstItemRende}
            {this.renderOverlay()}
          </Col>
          <Col
            xs={6}
            md={4}
            className="border height-three-demo background"
            onClick={this.openModal.bind(this, conditionalRender ? 2 : 3)}
          >
            {secondItemRende}
            {this.renderOverlay()}
          </Col>
          <Col
            xs={6}
            md={4}
            className="border height-three-demo background"
            onClick={this.openModal.bind(this, conditionalRender ? 3 : 4)}
          >
            {overlay}
            {thirdItemRende}
          </Col>
        </Row>
      </Grid>
    );
  }

  renderOverlay(id) {
    const { hideOverlay, renderOverlay, overlayBackgroundColor } = this.props;

    if (hideOverlay) {
      return false;
    }

    return [
      <div
        key={`cover-${id}`}
        className="cover slide"
        style={{ backgroundColor: overlayBackgroundColor }}
      />,
      <div
        key={`cover-text-${id}`}
        className="cover-text slide animate-text"
        style={{ fontSize: "100%" }}
      >
        {renderOverlay()}
      </div>
    ];
  }

  renderCountOverlay(more) {
    const { images } = this.props;
    const { countFrom } = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

    return [
      more && <div key="count" className="cover" />,
      more && (
        <div
          key="count-sub"
          className="cover-text"
          style={{ fontSize: "200%" }}
        >
          <p>+{extra}</p>
        </div>
      )
    ];
  }

  render() {
    const { modal, index, countFrom, imageUrls, selectedImage } = this.state;
    const { images } = this.props;
    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    return (
      <div className="grid-container">
        {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
        {imagesToShow.length >= 2 &&
          imagesToShow.length !== 4 &&
          this.renderTwo()}
        {imagesToShow.length >= 4 && this.renderThree()}

        {modal && (
          <Modal
            onClose={this.onClose}
            index={index}
            images={imageUrls}
            allImages={this.props.images}
            selectedImage={selectedImage}
          />
        )}
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string.isRequired }))
  ]).isRequired,
  hideOverlay: PropTypes.bool,
  renderOverlay: PropTypes.func,
  overlayBackgroundColor: PropTypes.string,
  onClickEach: PropTypes.func,
  countFrom: PropTypes.number
};

export default Images;