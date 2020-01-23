import React, { Component } from "react";

export class App extends Component {
  componentDidMount() {

    this.props.getData();

  }

  render() {
    let feedList = this.props.data[0];
    const clicked=true;
    feedList && console.log("list", feedList.posts)

    const listFeed = feedList && feedList.posts.map(elem => {
      return (
        <div key={elem.id} className='Outer-div'>
          <div className="user-div">
            <div className="pic-div">
              <img src={elem.profilePicture} alt="profilePicture" className="img" />
            </div>
            <div className="name-div">
              <span>{elem.userName}<br /></span><span className="timestamp">{elem.timeStamp}</span>
            </div>
          </div>

          <div className="post-div">
            {elem.postType === 'Image' ? <img src={elem.postContent} alt="" className="img-post" /> : <span>{elem.postContent}</span>}
          </div>

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
        </div>);

    })

    return (
      <div>
        {listFeed}
      </div>
    )
  }
}

