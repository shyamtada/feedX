import React, { Component } from "react";

export default class Feed extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    let feedList = this.props.data[0];

    // feedList && console.log("list", feedList.posts)

    const listFeed = feedList && feedList.posts.map(elem => {
      return (
        <div key={elem.id} className='wrapper'>
          <div className="user">
            <div className='picholder'>
              <div className="pic">
                <img src={elem.profilePicture} alt="profilePicture" className="img" />
              </div>
            </div>

            <div className="name">
              <span>{elem.userName}</span>
              <span className="timestamp">{elem.timeStamp}</span>
            </div>
          </div>

          <div className="post">
            {elem.text ?
              <div className="post-text">
                <p>{elem.text}</p>
              </div> : null}

            {elem.image ?
              <div className="post-img">
                <img src={elem.image} alt='content-image' className='img-post' />
              </div> : null}

            {/* {elem.video ?
              <div className="post-text  ">
                <p>{elem.video}</p>
              </div> : null} */}
          </div>

          <div className="group">
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>

          <form className="form">
            <input className="textInput" type="text"
              placeholder="Keep Commenting..." />
            <input className="submit" type="submit"
              value="Submit" />
          </form>
        </div>);

    })

    return (
      <div>
        {listFeed}
      </div>
    )
  }
}