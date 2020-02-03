import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Comment } from "./Comment";

let profileName = "Vladimir Burns";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      commentId: 0,
      likes: [],
      likeId: 0, 
      showComments: false,
      showPopup: true,
      elementIdComment: 0,
      elementIdPopup: 0,
      }
  }

  handleClick = (id, name) => {
    
    var result =  this.state.likes.filter(function(like) {
    return like.feedId === id;
    });
    let results = result[0];
    let likes = this.state.likes;
    if((results && results.likeStatus) || (results && id === results.feedId))
    {
      this.state.likes.map((like)=> {
        if(!like.likeStatus && like.type !== name)
        {
          like.likeStatus=true;
        }
        if(like.feedId===id)
        {
          if(like.type === name)
          {
            like.likeStatus=!like.likeStatus;
          }
          like.type=name;
        }
       return null; 
      })
    }
    else{
        this.setState({
          likes: likes.concat([{
            id: this.state.likeId + 1,
            feedId: id,
            type: name,
            likeStatus: true,
            totalLikes: 0
          }]),
          likeId: this.state.likeId + 1,
        })
      }
       this.setState({ showPopup: !this.state.showPopup, elementIdPopup: id })
  }

  renderPopup = (id) => {    
    this.setState({ showPopup: true, elementIdPopup: id })
  }

  renderComment = (id) => {
  if(this.state.elementIdComment!==id)  
  {
    this.setState({ showComments: true,elementIdComment: id})
  }
  else
    this.setState({ showComments: !this.state.showComments, elementIdComment: id })
  }
  addToList = (c, id) => {
    const commentList = this.state.commentList;
    this.setState({
      commentList: commentList.concat([{
        id: this.state.commentId + 1,
        feedId: id,
        value: c,
      }]),
      commentId: this.state.commentId + 1,
    });
  }


  componentDidMount() {
    this.props.getData();
  }

  render() {
    let feedList = this.props.data[0];
    const listFeed = feedList && feedList.posts.map(elem => {
      let id = elem.id;
      let count=0;
      let myLists = this.state.commentList;
      let listComments = myLists.map((myList) => {
        if (myList.feedId === id) {
          return (<div key={myList.id} className="commentdiv"><div className="addcomment">
          <div className='profileholder'>
            <div className="profilepic">
              <img src="https://m.media-amazon.com/images/M/MV5BNDg1NTU2OWEtM2UzYi00ZWRmLWEwMTktZWNjYWQ1NWM1OThjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" alt="profilePicture" className="img" />
            </div>
          </div><span className="comment"><span className="profilename">{profileName} </span>{myList.value}</span></div></div>)
        }
        else{
          return null
        }

      });
      let likeLists = this.state.likes;
      
      let listLikes = likeLists.map((likeList)=>{
        if(likeList.feedId === id && likeList.likeStatus){
          count = likeList.totalLikes + 1;
          
        }
        return(<p key={likeList.id} className="like">{count} Likes</p>)
 
      });    
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
                <img src={elem.image} alt='content' className='img-post' />
              </div> : null}

            {/* {elem.video ?
              <div className="post-text  ">
                <p>{elem.video}</p>
              </div> : null} */}
          </div>

          <div> 
            {count !== 0 ? listLikes.slice(-1): null}
          </div>

          <div className="group">
           <Popup trigger={<a className="btn" onClick={() => this.handleClick(elem.id, "like")}><img src="https://image.flaticon.com/icons/svg/1067/1067346.svg" className="icons" alt="likeicon"></img></a>} position="top left" on={"hover"} className="popup"
          open={this.state.showPopup && this.state.elementIdPopup === elem.id } onOpen={()=>this.renderPopup(elem.id)}>
              <div className="popupcontent">
                <button onClick={() => this.handleClick(elem.id, "like")} className="emoticons"><span role="img" aria-label="like">👍</span></button>
                <button onClick={() => this.handleClick(elem.id, "heart")} className="emoticons"><span role="img" aria-label="heart">💙</span></button>
                <button onClick={() => this.handleClick(elem.id, "haha")} className="emoticons"><span role="img" aria-label="haha">🤣</span></button>
                <button onClick={() => this.handleClick(elem.id, "wow")} className="emoticons"><span role="img" aria-label="wow">😮</span></button>
                <button onClick={() => this.handleClick(elem.id, "sad")} className="emoticons"><span role="img" aria-label="sad">😢</span></button>
                <button onClick={() => this.handleClick(elem.id, "angry")} className="emoticons"><span role="img" aria-label="angry">😡</span></button>
              </div>
            </Popup> 
            <a onClick={() => this.renderComment(elem.id)} className="btn"><img src="https://image.flaticon.com/icons/svg/2462/2462719.svg" className="icons" alt="commenticon"></img></a>
            <a className="btn"><img src="https://image.flaticon.com/icons/svg/1059/1059106.svg" className="icons" alt="shareicon"></img></a>
          </div>
          {this.state.showComments && this.state.elementIdComment === elem.id ?
           <div ref={node => { this.node = node; }} className="grpcomment">
            {listComments}
            <Comment id={elem.id} addToList={this.addToList} />
          </div> : null}
        </div>
        );
    })

    return (
      <div>
        {listFeed}
      </div>
    )
  }
}