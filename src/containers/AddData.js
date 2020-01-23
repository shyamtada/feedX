import { connect } from 'react-redux';
import Feed from "../Components/App";

const mapStateToProps = state => ({
  data: state
})

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch({ type: "GET_DATA" })
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
