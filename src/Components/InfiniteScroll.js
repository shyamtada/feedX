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
        topOffset: 0,
    }

    // componentDidMount() {
    //     const { Review, fetchMore } = this.props;
    //     console.log('Reached Here: componentDidMount');
    //     this.setState({ Review, fetchMore })
    // }

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
                // console.log('topOffset', topOffset, 'bottomOffset', bottomOffset, 'difference', bottomOffset - topOffset)

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
                // console.log('topOffset', topOffset, 'bottomOffset', bottomOffset, 'difference', bottomOffset - topOffset)

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

        if (topOffset !== 0) {
            Review.splice(bottomOffset - 10, 10);

            this.setState(prevState => ({
                topOffset: prevState.topOffset - 10,
                bottomOffset: prevState.bottomOffset - 10,
            }), () => {
                // console.log('topOffset', topOffset, 'bottomOffset', bottomOffset, 'difference', bottomOffset - topOffset)

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

        // console.log("Review in InfinteScroll =>", Review.length);

        return (
            <div
                style={{ height: '100vh', width: '100vh', WebkitOverflowScrolling: 'touch' }}>
                <InfiniteScroll
                    onReachBottom={() => this._onReachBottom(Review, fetchMore)}
                    onReachTop={() => this._onReachTop(Review, fetchMore)}
                >
                    {/* {listFeed} */}
                    <Listfeed Review={Review} />
                    {/* {listFeed && console.log('Hello', listFeed[listFeed.length - 1].key)} */}
                </InfiniteScroll>
            </div>
        )
    }
}