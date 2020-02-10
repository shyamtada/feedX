import React from 'react';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import Listfeed from './Listfeed';

export default class InfiniteScrollFeed extends React.Component {
    state = {
        Review: [],
        fetchMore: () => { },
        flag: 0,
        topOffset: 0,
        bottomOffset: 10,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { Review, fetchMore } = nextProps;
        return { Review, fetchMore }
    }

    _onReachBottom(Review, fetchMore) {
        const { bottomOffset, topOffset } = this.state;

        if ((bottomOffset - topOffset) >= 30) {
            Review.splice(0, 10);

            this.setState(prevState => ({
                topOffset: prevState.topOffset + 10,
                bottomOffset: prevState.bottomOffset + 10,
            }), () => {
                fetchMore({
                    variables: {
                        offset: bottomOffset,
                        first: 10
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        return Object.assign({}, prev, {
                            Review: [...prev.Review, ...fetchMoreResult.Review]
                        })
                    }
                })
            });
        } else {
            this.setState(prevState => ({
                bottomOffset: prevState.bottomOffset + 10
            }), () => {
                fetchMore({
                    variables: {
                        offset: bottomOffset,
                        first: 10
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        return Object.assign({}, prev, {
                            Review: [...prev.Review, ...fetchMoreResult.Review]
                        })
                    }
                })
            });
        }
    }

    _onReachTop(Review, fetchMore) {
        const { bottomOffset, topOffset } = this.state;

        if (topOffset > 0) {
            Review.splice(bottomOffset - 10, 10);

            this.setState(prevState => ({
                topOffset: prevState.topOffset - 10,
                bottomOffset: prevState.bottomOffset - 10,
            }), () => {
                fetchMore({
                    variables: {
                        offset: topOffset - 10,
                        first: 10
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        return Object.assign({}, prev, {
                            Review: [...fetchMoreResult.Review, ...prev.Review]
                        })
                    }
                })
            });
        }
    }

    render() {
        const { Review, fetchMore } = this.state;
        return (
            <div
                style={{ height: '100vh', width: '100vw', WebkitOverflowScrolling: 'touch' }}>
                <InfiniteScroll
                    onReachBottom={() => this._onReachBottom(Review, fetchMore)}
                    onReachTop={() => this._onReachTop(Review, fetchMore)}
                >
                    <Listfeed Review={Review} />
                </InfiniteScroll>
            </div>
        )
    }
}