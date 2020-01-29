import React from 'react';

export class Comment extends React.Component{
    constructor(props)
  {
    super(props);
    this.state={
      value: '',
    }
  }

  handleChange=(e)=> {
    this.setState({value: e.target.value});
  }

  handleSubmit=(e)=> {
    if (this.state.value.trim()) {

    this.props.addToList(this.state.value, this.props.id);
    }
  
    this.setState({value: ''});
    e.preventDefault();
  }

    render(){
        return(
          <div>
            <div className="addcomment">
              <div className='profileholder'>
                <div className="profilepic">
                  <img src="https://m.media-amazon.com/images/M/MV5BNDg1NTU2OWEtM2UzYi00ZWRmLWEwMTktZWNjYWQ1NWM1OThjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" alt="profilePicture" className="img" />
                </div>
              </div>
              <form className="form" onSubmit={this.handleSubmit}>
                <input className="textInput" type="text"
                  placeholder="Keep Commenting..."
                  value={this.state.value}
                  onChange={this.handleChange} />
                <button className="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>   
        )
    }
}