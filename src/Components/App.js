import React, { Component } from "react";

export default class Feed extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    let feedList = this.props.data[0];
<<<<<<< HEAD
    const clicked=true;
    feedList && console.log("list", feedList.posts)
=======

    // feedList && console.log("list", feedList.posts)
>>>>>>> 7649a314d376d8b3ef3a938645b7893d4b1b4e4a

    const listFeed = feedList && feedList.posts.map(elem => {
      return (
        <div key={elem.id} className='wrapper helper'>
          <div className="user helper">
            <div className='picholder helper'>
              <div className="pic">
                <img src={elem.profilePicture} alt="profilePicture" className="img" />
              </div>
            </div>
<<<<<<< HEAD
            <div className="name-div">
              <span>{elem.userName}<br /></span><span className="timestamp">{elem.timeStamp}</span>
=======

            <div className="name helper">
              <span><name>{elem.userName}</name></span>
              <span>{elem.timeStamp}</span>
>>>>>>> 7649a314d376d8b3ef3a938645b7893d4b1b4e4a
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

<<<<<<< HEAD
          <div className="buttonDiv">
            <button>like</button>
            <button>Comments</button>
            <button>Share</button>
          </div>

          <div className="Form">
            <form>
              <input className="text" type="text"
                placeholder="write a comment.." />
              <input className="submit" type="submit"
                value="Submit" />
            </form>
          </div>
=======
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
>>>>>>> 7649a314d376d8b3ef3a938645b7893d4b1b4e4a
        </div>);

    })

    return (
      <div className='helper'>
        {listFeed}
      </div>
    )
  }
}