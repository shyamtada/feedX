import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Comment } from "./Comment";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import InfiniteScroll from 'react-infinite-scroll-component'

const GET_REVIEWS = gql`
query Review($first: Int, $offset: Int) {
  Review(first: $first, offset: $offset) {
    id
   text
   user{
     id
     name
   }
   stars
   date {
     day
     year
     month
   }
 }
}
`;

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
    // console.log('ID, Name => ', id, name);
    
    let result = this.state.likes.filter(function (like) {
      return like.feedId === id;
    });
    let results = result[0];
    let likes = this.state.likes;
    if ((results && results.likeStatus) || (results && id === results.feedId)) {
      this.state.likes.map((like) => {
        if (!like.likeStatus && like.type !== name) {
          like.likeStatus = true;
        }
        if (like.feedId === id) {
          if (like.type === name) {
            like.likeStatus = !like.likeStatus;
          }
          like.type = name;
        }
        return null;
      })
    }
    else {
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
    console.log('Hello Moto =>', this.state.likes);
    
    this.setState({ showPopup: !this.state.showPopup, elementIdPopup: id })
  }

  renderPopup = (id) => {
    this.setState({ showPopup: true, elementIdPopup: id })
  }

  renderComment = (id) => {
    if (this.state.elementIdComment !== id) {
      this.setState({ showComments: true, elementIdComment: id })
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
    // this.props.getData();    
  }

  render() {
    return (
      <Query
        query={GET_REVIEWS}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          first: 10,
          offset: 0
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30 }}><p>{`Error! ${error.message}`}</p></div>;

  

          const { Review } = data || [];
          const listFeed = Review && Review.map(({ id, text, user, date, stars }) => {
            let count = 0;
            let myLists = this.state.commentList;
            let listComments = myLists.map((myList) => {
              if (myList.feedId === id) {
                return (
                  <div key={myList.id} className="commentdiv"><div className="addcomment">
                    <div className='profileholder'>
                      <div className="profilepic">
                        <img src="https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg" alt="profilePicture" className="img" />
                      </div>
                    </div><span className="comment"><span className="profilename">{user && user.id} </span>{myList.value}</span></div></div>)
              }
              else {
                return null
              }

            });
            let likeLists = this.state.likes;


            let listLikes = likeLists.map((likeList) => {
              // {console.log('LikeList => ', likeList)}

              if (likeList.feedId === id && likeList.likeStatus) {
                count = likeList.totalLikes + 1;

              }
              return (<p key={likeList.id} className="like">{count} Likes</p>)
            });


            return (
              <div key={id} className='wrapper'>
                <div className="user">
                  <div className='picholder'>
                    <div className="pic">
                      <img src='https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg' alt="profilePicture" className="img" />
                    </div>
                  </div>

                  <div className="name">
                    <span>{user && user.name}</span>
                    <span className="timestamp">{user && user.id}</span>
                  </div>
                </div>

                <div className="post">
                  {text ?
                    <div className="post-text">
                      <p>{text}</p>
                    </div> : null}
                </div>

                <div className='like'>
                  {count !== 0 ? listLikes.slice(-1) : null}
                </div>

                <div className="group">
                  <Popup trigger={<a className="btn" onClick={() => this.handleClick(id, "like")}>
                    <img src="https://image.flaticon.com/icons/svg/1067/1067346.svg" className="icons" alt="likeicon" /></a>
                  } position="top left" on={"hover"} className="popup"
                    open={this.state.showPopup && this.state.elementIdPopup === id} onOpen={() => this.renderPopup(id)}>
                    <div className="popupcontent">
                      <button onClick={() => this.handleClick(id, "like")} className="emoticons"><span role="img" aria-label="like">👍</span></button>
                      <button onClick={() => this.handleClick(id, "heart")} className="emoticons"><span role="img" aria-label="heart">💙</span></button>
                      <button onClick={() => this.handleClick(id, "haha")} className="emoticons"><span role="img" aria-label="haha">🤣</span></button>
                      <button onClick={() => this.handleClick(id, "wow")} className="emoticons"><span role="img" aria-label="wow">😮</span></button>
                      <button onClick={() => this.handleClick(id, "sad")} className="emoticons"><span role="img" aria-label="sad">😢</span></button>
                      <button onClick={() => this.handleClick(id, "angry")} className="emoticons"><span role="img" aria-label="angry">😡</span></button>
                    </div>
                  </Popup>
                  <a onClick={() => this.renderComment(id)} className="btn"><img src="https://image.flaticon.com/icons/svg/2462/2462719.svg" className="icons" alt="commenticon"></img></a>
                  <a className="btn"><img src="https://image.flaticon.com/icons/svg/1059/1059106.svg" className="icons" alt="shareicon"></img></a>
                </div>
                {this.state.showComments && this.state.elementIdComment === id ?
                  <div ref={node => { this.node = node; }} className="grpcomment">
                    {listComments}
                    <Comment id={id} addToList={this.addToList} />
                  </div> : null}
              </div>
            );
          })

          return (
            <InfiniteScroll
              dataLength={Review && Review.length || 20} //This is important field to render the next data
              next={() => fetchMore({
                variables: {
                  offset: Review.length,
                  first: 10
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    Review: [...prev.Review, ...fetchMoreResult.Review]
                  })
                }
              })}
              hasMore={true}
              loader={<div class="lds-ripple"><div></div><div></div></div>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
              <div>
                {listFeed}
                {/* {listFeed && console.log('Hello', listFeed[listFeed.length - 1].key)} */}
              </div>
            </InfiniteScroll>
          );
        }}
      </Query>
    )
  }
}