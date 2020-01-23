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
        <div key={elem.id} className='wrapper helper'>
          <div className="user helper">
            <div className='picholder helper'>
              <div className="pic">
                <img src={elem.profilePicture} alt="profilePicture" className="img" />
              </div>
            </div>

            <div className="name helper">
              <span><name>{elem.userName}</name></span>
              <span>{elem.timeStamp}</span>
            </div>
          </div>

          <div className="post helper">
            {elem.text ?
              <div className="post-text">
                <p>{elem.text}</p>
              </div> : null}

            {elem.image ?
              <div className="post-img">
                <img src={elem.image} alt='content-image' className='img' />
              </div> : null}

            {/* {elem.video ?
              <div className="post-text helper">
                <p>{elem.video}</p>
              </div> : null} */}
          </div>

          <div className="group helper">
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
          </div>

          <form className="form helper">
            <input className="textInput helper" type="text"
              placeholder="Keep Commenting..." />
            <input className="submit helper" type="submit"
              value="Submit" />
          </form>
        </div>);

    })

    return (
      <div className='helper'>
        {listFeed}
      </div>
    )
  }
}