import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
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

                    return (
                        <div>
                            <InfiniteScroll Review={Review} fetchMore={fetchMore} />
                        </div>
                    );
                }}
            </Query>
        )
    }
}