import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import InfiniteScroll from 'react-infinite-scroll-component';
import ReactPlayer from 'react-player';
import { Waypoint } from 'react-waypoint';
// import InfiniteScroll from 'react-bidirectional-infinite-scroll'
// import Listfeed from './Listfeed';
import InfiniteScroll from './InfiniteScroll'

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

// const images = ['https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350',
//   'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
//   'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg',
//   'https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg',
//   'https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&h=350',
//   "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350",
//   "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg"];

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
            noOfDeleted: 0
        }
    }

    handleClick = (id, name) => {
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

    logger = () => {
        this.wrapper && console.log('Save Me =>', this.wrapper.getBoundingClientRect())
    }

    componentDidMount() {
        // this.props.getData();    
        // window.addEventListener("scroll", this.logger);
    }

    handleOnScroll = (position, previousPosition) => {
        const diffScroll = position - previousPosition
        const direction = diffScroll > 0
            ? 'down'
            : 'up'

        console.log(`Scroll ${direction} to ${position}`)
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

                    const { Review = [] } = data || [];

                    // console.log("Review in App =>", Review);

                    return (
                        // <InfiniteScroll
                        //   dataLength={Review && Review.length || 20} //This is important field to render the next data
                        //   next={() => fetchMore({
                        //     variables: {
                        //       offset: Review.length,
                        //       first: 10
                        //     },
                        //     updateQuery: (prev, { fetchMoreResult }) => {
                        //       if (!fetchMoreResult) return prev;
                        //       return Object.assign({}, prev, {
                        //         Review: [...prev.Review, ...fetchMoreResult.Review]
                        //       })
                        //     }
                        //   })}
                        //   hasMore={true}
                        //   loader={<div className="lds-ripple"><div></div><div></div></div>}
                        //   endMessage={
                        //     <p style={{ textAlign: 'center' }}>
                        //       <b>Yay! You have seen it all</b>
                        //     </p>
                        //   }>
                        <div>
                            {/* {loading && <div className="lds-ripple"><div></div><div></div></div>} */}

                            <InfiniteScroll Review={Review} fetchMore={fetchMore} />

                            {/* {loading && <div className="lds-ripple"><div></div><div></div></div>} */}
                        </div>
                    );
                }}
            </Query>
        )
    }
}