import React from 'react';
import Popup from "reactjs-popup";
import { Comment } from "./Comment";
import FbVideoLibrary from '../REACFBGRID/lib/ReactFbImageGrid';
import FbImageLibrary from 'react-fb-image-grid';

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
        'https://pics.me.me/technology-nd-cticc-tech-memes-50400371.png',
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
        isImage: true,
        url:
            "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg",
        // thumbnail:
        //     "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000"
    },
    {
        isVideo: true,
        url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        props: {},
        // thumbnail:
        //     "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
    },
    {
        isVideo: true,
        url:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        props: {},
        // thumbnail:
        //     "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //     "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //     "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    },
    {
        url: "http://www.youtube.com/embed/5dsGWM5XGdg",
        // iFrame: true,
        isVideo: true,
        props: {},
        // thumbnail:
        //   "https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg"
    }
];

export default class Listfeed extends React.Component {
    state = {
        commentList: [],
        commentId: 0,
        likes: [],
        likeId: 0,
        showComments: false,
        showPopup: true,
        elementIdComment: 0,
        elementIdPopup: 0,
        noOfDeleted: 0,
    }

    render() {
        const { Review } = this.props

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
                if (likeList.feedId === id && likeList.likeStatus) {
                    count = likeList.totalLikes + 1;

                }
                return (<p key={likeList.id} className="like">{count} Likes</p>)
            });


            return (
                <div key={id} className='wrapper' ref={el => this.wrapper = el}>
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
                                                        // <FbImageLibrary images={images[7]} countFrom={4} />
                                                        <FbVideoLibrary images={content} />

                                                        :
                                                        // <Waypoint onEnter={()=>console.log('Hello')} onLeave={()=>console.log('World')} scrollableAncestor={window}>
                                                        // <ReactPlayer url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
                                                        //   controls
                                                        //   playing
                                                        //   pip
                                                        //   width={'100%'}
                                                        //   height={'100%'}
                                                        //   preload={'true'}
                                                        //   // muted
                                                        //   // playing={this.state.autoPlay}
                                                        //   // progressInterval={5000}
                                                        //   // onProgress={() => this.setState({ autoPlay: false })}
                                                        //   className={'experiment'}
                                                        //   ref={c => this.refs = c}
                                                        // />
                                                        // </Waypoint>
                                                        <FbImageLibrary images={images[7]} countFrom={4} />
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
                            {listComments}
                            <Comment id={id} addToList={this.addToList} />
                        </div> : null}
                </div>
            );
        })

        return listFeed;
    }
}