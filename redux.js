// Example

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { updateUserInfoAction, updateUserInfoLocallyAction } from 'actions'

class ChargebeeModalContainer extends Component {

// ...
sendValidPaymentMethodToSalesForce () {
  let modifiedUser = {
    id: this.props.user.id,
    paymentMethod: PAYMENT_METHOD.PAYMENT_SOURCE_PROVIDED
  }
  updateUserInfoAction({contact: modifiedUser}, this.props.dispatch)
}
// ...

}



ChargebeeModalContainer.propTypes = {
  user: PropTypes.object,
  router: PropTypes.object,
  dispatch: PropTypes.func,
  // ...
}

function mapStateToProps ({ user }) {
  return { user }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators({}, dispatch)
  return { ...actions, dispatch }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChargebeeModalContainer))


// -----------------------------
// SAGAS -- probably way too much for an interview (understanding/memorizing above is good):

// In actions/index.js

import { createAction } from 'redux-saga-actions'

// creating the action for updateUserInfoAction method called in a component
export const updateUserInfoAction = createAction('UPDATE_USER_INFO')


// -----------------
// In sagas/sagasUser.js
import { put, take, call, fork } from 'redux-saga/effects'
import { promiseApiAction } from './sagasUtils'
import * as actions from '../actions'
import * as api from '../services/api'

// this means that when updateUserInfoAction action is called from component,
// call api.userServices.updateUserInfo - i.e. make an api call through updateUserInfo in services/servicesUser.js -- see below
const callUpdateUserInfo = promiseApiAction.bind(null, actions.updateUserInfoAction, api.userServices.updateUserInfo)

// watches for dispatched action actions.updateUserInfoAction
 // and calls handleUpdateUserInfo
export function * watchUpdateUserInfo () {
  while (true) {
    // i think this handles triggering the reducer once payload comes in -- ??? not sure what triggers reducers in this flow
    const {payload} = yield take(actions.updateUserInfoAction.REQUEST)
    yield fork(handleUpdateUserInfo, payload)
  }
}

// triggered by watchUpdateUserInfo
// calls callUpdateUserInfo above with the payload (payload.contact -- see how this is passed in from component as {contact: ...})
function * handleUpdateUserInfo (payload) {
  if (payload) {
    yield call(callUpdateUserInfo, payload.contact)
  }
}

// -------------------------
// In services/servicesUser.js
import Request from 'utils/request' // using axios


export const updateUserInfo = (contact) => {
  return Request.patch('/api/contact', contact).then(
    response => ({response: normalizeUserInfo(response.data)})
  ).catch(
    error => ({ error: _updateUserInfoFailure(error) })
  )
}

function _updateUserInfoFailure (error) {
  return {
    user: error
  }
}

// -------------
// reducers/index.js
function user (state = {}, action) {
  let payload = ReducerUtils.getPayload(action, 'user')
  if (payload) {
    return _.merge({}, state, payload)
  } else if (action.type === COMPLETE_ONBOARDING) {
    return _.merge({}, state, { localOnboardingCompleted: true })
  } else if (action.type === RESET_ONBOARDING) {
    return _.merge({}, state, { localOnboardingCompleted: false })
  }
  return state
}


// -----------------------
// When you click the button, this is what happens:
//
// The action FETCHED_DOG is dispatched
// The watcher saga (watchFetchDog) takes the dispatched action and calls the worker saga (fetchDogAsync)
// The API call is executed
// An action to update the state is dispatched (success or fail)
// If you believe some layers of indirection and a little bit of additional work is worth it, redux-saga can give you more control to handle side-effects in a functional way.
