const RELINKING_WIZARD_ID = 'relinking-wizard'
const relinkingWizardPages = [RelinkPage, CashTransferPage, RecommendationPage]

// wizardMaker is the HOC - it makes the RelinkingWizard component
const RelinkingWizard = wizardMaker({
  wizardId: RELINKING_WIZARD_ID,
  wizardPages: relinkingWizardPages,
  sharedWizardData: {},
  isMenuLocked: false,
  redirectUrl: ACCOUNT_INVESTMENT_ROUTE
})

class RelinkingWizardContainer extends Component {
  render () {
    // you can still pass props into the component created by the HOC, for example mapSTatetoProps etc...
    return <RelinkingWizard {...this.props} />
  }
}

// ----------------------

// wizardMaker HOC - basically a function that returns a component
// you can pass arguments into the HOC and use them (kinda like props) in the new component you create
export function wizardMaker ({wizardId = '', wizardPages, progressCountingPages, sharedWizardData = {}, header, footer, isMenuLocked, redirectUrl}) {
  return class extends Component {
    static propTypes = { router: PropTypes.object }

    constructor (props) {
      super(props)
      this.state = {
        activeWizardPage: 1,
        totalNumberOfWizardPages: wizardPages.length,
        progressCountingPages: progressCountingPages || wizardPages.map((page, index) => index + 1),
        pagesVisited: [1],
        pagesCompleted: [],
        clickedBackToPage: null,
        sharedWizardData: sharedWizardData
      }
    }

    componentDidMount () {
      scrollScreenToTop()
      if (isMenuLocked) {
        disableMenuClick(true)
      }
    }

    componentWillUnmount () {
      if (isMenuLocked) {
        enableMenuClick()
      }
    }

    goToNextPage () {
      const nextPageNumber = this.state.activeWizardPage + 1
      if (nextPageNumber > this.state.totalNumberOfWizardPages) {
        this.props.router.push(redirectUrl)
      } else {
        let pagesVisited = cloneDeep(this.state.pagesVisited)
        if (!this.state.pagesVisited.includes(nextPageNumber)) {
          pagesVisited.push(nextPageNumber)
        }
        let pagesCompleted = cloneDeep(this.state.pagesCompleted)
        if (!this.state.pagesCompleted.includes(this.state.activeWizardPage)) {
          pagesCompleted.push(this.state.activeWizardPage)
        }

        this.setState({
          activeWizardPage: nextPageNumber,
          pagesVisited: pagesVisited,
          pagesCompleted: pagesCompleted,
          clickedBackToPage: null
        })
      }
    }

    goToPreviousPage () {
      const previousPageNumber = this.state.activeWizardPage - 1
      let pagesVisited = cloneDeep(this.state.pagesVisited)
      if (!this.state.pagesVisited.includes(previousPageNumber)) {
        pagesVisited.push(previousPageNumber)
      }
      this.setState({
        activeWizardPage: previousPageNumber,
        pagesVisited: pagesVisited,
        clickedBackToPage: previousPageNumber
      })
    }

    changeActivePage (newPageNumber) {
      let pagesVisited = cloneDeep(this.state.pagesVisited)
      if (!this.state.pagesVisited.includes(newPageNumber)) {
        pagesVisited.push(newPageNumber)
      }
      if (newPageNumber !== this.state.activeWizardPage) {
        this.setState({
          activeWizardPage: newPageNumber,
          pagesVisited: pagesVisited,
          clickedBackToPage: null
        })
      }
    }

    updateSharedWizardData (newWizardData) {
      if (!isEqual(newWizardData, this.state.sharedWizardData)) {
        this.setState({
          sharedWizardData: newWizardData
        })
      }
    }

    mergeSharedWizardData (newDataObject) {
      this.setState({
        sharedWizardData: merge({}, this.state.sharedWizardData, newDataObject)
      })
    }

    render () {
      let CurrentPage = wizardPages[this.state.activeWizardPage - 1]
      let Header = header
      Header = Header ? <Header wizardState={this.state} /> : ''
      let Footer = footer
      Footer = Footer ? <Footer wizardState={this.state} /> : ''
      if (CurrentPage) {
        return (
          <div id={wizardId}>
            <div id='wizard-header'>
              {Header}
            </div>
            <CurrentPage
              wizardState={this.state}
              updateSharedWizardData={::this.updateSharedWizardData}
              mergeSharedWizardData={::this.mergeSharedWizardData}
              goToNextPage={::this.goToNextPage}
              goToPreviousPage={::this.goToPreviousPage}
              changeActiveWizardPage={::this.changeActivePage}
              {...this.props} />
            <div id='wizard-footer'>
              {Footer}
            </div>
          </div>
        )
      } else {
        return <LoaderFlat size='large' />
      }
    }
  }
}
