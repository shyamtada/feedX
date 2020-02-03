// import React from 'react'
// import { connect } from 'react-redux'
// import { addComment } from '../actions'

// const AddComment = ({ dispatch ,index }) => {
//   let input

//   return (
//       <form className="form" onSubmit={e => {
//         e.preventDefault()
//         if (!input.value.trim()) {
//           return
//         }
//         dispatch(addComment(input.value, index))
//         input.value = ''
//       }}>
//         <input className="textInput" placeholder="Keep Commenting..."  ref={node => input = node} />
//         <button type="submit" className="submit">
//           Submit
//         </button>
//       </form>
//   )
// }

// export default connect()(AddComment)