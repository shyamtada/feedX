import React from 'react';
import './style.css';
// import ReactDOM from 'react-dom';
import { renderReactCell, MemoizedReactDomContainers } from 'react-lru';
import { HotTable } from '@handsontable/react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Infinite from 'react-infinite';
import FbVideoLibrary from '../REACFBGRID/lib/ReactFbImageGrid';
import FbImageLibrary from 'react-fb-image-grid';
import Popup from "reactjs-popup";
import { Comment } from "./Comment";


const memoizedContainers = new MemoizedReactDomContainers(20);

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


const images = {
    3: [
        'https://netstorage-rumourjuice.akamaized.net/images/b6b47055723b6972.jpg',
        'https://www.askideas.com/media/48/With-This-Technology-We-Will-Bring-The-United-States-To-Its-Knees-Funny-Technology-Meme-Image.jpg',
        'https://www.askideas.com/media/48/Reboots-Computer-Computer-Tech-Prodigy-Funny-Technology-Meme-Image.jpg',
    ],
    5: [
        'https://thechive.com/wp-content/uploads/2018/06/technology-25-photos-4.jpg?quality=85&strip=info&w=600',
        'https://1.bp.blogspot.com/-HpPBrnUWkH0/VmFWEq65v_I/AAAAAAAAAz8/MIFv9fByYCk/s1600/using-your-own-data-instead-of-free-wifi.jpg',
        'https://www.freecodecamp.org/news/content/images/2019/10/o60oxupyz8cfce0cknvz.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiTJksdtZvbU6PIXswuLjUapyNHXzy0xVe2HpOw7BSLOcw0FVN',
        'https://i.imgflip.com/20jr7l.jpg',
    ],
    7: [
        'https://pics.me.me/frontend-backend-57053831.png',
        'https://media.makeameme.org/created/frontend-guys-we-mlthhj.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShVdloobcTIG1CT-7EsMbqZ86okwwtnKTLU_6az4qcDkjsycVP',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIjU1OWZV__HArKbz0RlaQeO-UZRaF046gvV9JuCTfq-_BKN7i',
        'https://pics.awwmemes.com/backend-frontend-ops-tmikent-farson-2019-how-i-think-some-58744781.png',
        'https://lh3.googleusercontent.com/proxy/H3u85mPyWB9hQR-caCziKbyne6hXXr1o5bIffeMP9ONkxc8eLwx_uRKOXk5v7nM6mrRUn9grp2CzZ1wFOUB_AiD37kz-ukcwIL-3YrJc-Z1wOGVqZs_Fbd5jYilc3i9VL_w0JNqw4ekPBNKVm9PHdW1wcXUXHuJk3Gk',
        'https://img.devrant.com/devrant/rant/r_403948_ikGUk.jpg',
    ]
}

const content = [
    {
        url:
            "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg",
        thumbnail:
            "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    },
    {
        isVideo: true,
        url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        props: {},
        thumbnail:
            "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
    },
    {
        isVideo: true,
        url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        props: {},
        thumbnail:
            "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        thumbnail:
            "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        thumbnail:
            "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        iFrame: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    }
];

const ErrorJSX = ({ error }) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30 }}><p>{`Error! ${error.message}`}</p></div>;

// class ReactCell extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { counter: 0 };
//     }

//     componentDidMount() {
//         const { row } = this.props;
//         this.interval = setInterval(() => this.setState({
//             counter: this.state.counter + 1,
//         }), 500);
//         console.log('mounting', row);
//     }

//     componentWillUnmount() {
//         const { row } = this.props;
//         clearInterval(this.interval);
//         console.log('unmounting', row);
//     }

//     render() {
//         return (<span>
//             ROW: {this.props.row}, counter: {this.state.counter}
//         </span>);
//     }
// }

// function makeData(rows) {
//   const data = [];
//   for (let i = 0; i < rows; i++) {
//     const newPoint = { row: i, jsx: 'REACT' }
//     data.push(newPoint);
//   }
//   return data;
// }

// function reactRenderer(instance, td, row, col, prop, value) {
//     renderReactCell({
//         memoizedContainers: memoizedContainers,
//         td: ,
//         row,
//         col,
//         jsx: <ReactCell row={row} />,
//     });

//     return td;
// }

export default class ExampleComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.handsontableData = makeData(50);
        // this.columns = [{
        //   data: 'row',
        //   header: 'row',
        // }, {
        //   data: 'jsx',
        //   header: 'React',
        //   width: 200,
        //   renderer: reactRenderer,
        // }];

        this.state = {
            elements: <p>Hello</p>,
            likes: [],
        }
    }

    render() {
        return (
            <Query
                query={GET_REVIEWS}
                notifyOnNetworkStatusChange
                fetchPolicy="no-cache"
                variables={{
                    first: 10,
                    offset: 0
                }}
            >
                {({ error, data, fetchMore }) => {
                    if (error) return <ErrorJSX error={error} />

                    data && console.log(data.Review);

                    const { Review } = data || [];
                    const listFeed = Review && Review.map(({ id, text, user, date, stars, }, ) => {
                        let count = 0;
                        // let myLists = this.state.commentList;
                        // let listComments = myLists.map((myList) => {
                        //     if (myList.feedId === id) {
                        //         return (
                        //             <div key={myList.id} className="commentdiv"><div className="addcomment">
                        //                 <div className='profileholder'>
                        //                     <div className="profilepic">
                        //                         <img src="https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg" alt="profilePicture" className="img" />
                        //                     </div>
                        //                 </div><span className="comment"><span className="profilename">{user && user.id} </span>{myList.value}</span></div></div>)
                        //     }
                        //     else {
                        //         return null
                        //     }

                        // });

                        let likeLists = this.state.likes;
                        let listLikes = likeLists.map((likeList) => {
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

                                    {
                                        105 % id[1] === 0 ?
                                            <div className='post-img'>
                                                <div className='img'>
                                                    {
                                                        id[1] % 3 === 0 ?
                                                            <FbImageLibrary images={images[3]} countFrom={4} />
                                                            : id[1] % 5 === 0 ?
                                                                <FbImageLibrary images={images[5]} countFrom={4} />
                                                                : id[1] % 7 === 0 ?
                                                                    <FbVideoLibrary images={content} />
                                                                    : <FbImageLibrary images={images[7]} countFrom={4} />

                                                    }
                                                </div>
                                            </div>
                                            : null
                                    }
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
                                        {/* {listComments} */}
                                        {/* <Comment id={id} addToList={this.addToList} /> */}
                                    </div> : null}
                            </div>
                        );
                    })

                    const _fetchmore = () => fetchMore({
                        variables: {
                            offset: Review && Review.length || 0,
                            first: 10
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                                Review: [...prev.Review, ...fetchMoreResult.Review]
                            })
                        }
                    });

                    return <Infinite
                        elementHeight={40}
                        // containerHeight={250}
                        useWindowAsScrollContainer
                        isInfiniteLoading
                        //  infiniteLoadBeginEdgeOffset={2}
                        onInfiniteLoad={
                            _fetchmore
                        }
                        loadingSpinnerDelegate={<div className="lds-ripple"><div></div><div></div></div>}
                    //  isInfiniteLoading={this.state.isInfiniteLoading}
                    >
                        {/* <div className='world'> */}
                        {listFeed}
                        {/* </div> */}
                    </Infinite>;
                }}
            </Query>


        );
    }
}

// ReactDOM.render(<ExampleComponent />, document.getElementById('example'));

{/* <HotTable root="hot" settings={{
            data: this.handsontableData,
            colHeaders: true,
            rowHeaders: true,
            columns: this.columns,
          }}/> */}