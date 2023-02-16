import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusResult = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusResult.initial,
    languagesData: [],
  }

  componentDidMount() {
    this.getLanguagesData()
  }

  getLanguagesData = async () => {
    this.setState({apiStatus: apiStatusResult.inProgress})

    const {activeLanguageId} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languagesData: updateData,
        apiStatus: apiStatusResult.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusResult.failure})
    }
  }

  renderApiSuccessResults = () => {
    const {languagesData} = this.state
    return (
      <ul className="items-container">
        {languagesData.map(languageItem => (
          <RepositoryItem itemDetails={languageItem} key={languageItem.id} />
        ))}
      </ul>
    )
  }

  renderApiFailureResults = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderApiLoadingResults = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onClickLanguageId = activeLanguageId => {
    this.setState({activeLanguageId}, this.getLanguagesData)
  }

  renderBannerSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusResult.success:
        return this.renderApiSuccessResults()
      case apiStatusResult.failure:
        return this.renderApiFailureResults()
      case apiStatusResult.inProgress:
        return this.renderApiLoadingResults()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state

    return (
      <div className="repos-container">
        <h1 className="repos-main-heading">Popular</h1>
        <ul className="language-filter-item-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageDetails={eachLanguage}
              key={eachLanguage.id}
              isActive={eachLanguage.id === activeLanguageId}
              onClickLanguageId={this.onClickLanguageId}
            />
          ))}
        </ul>
        <div className="repos-item-container">{this.renderBannerSection()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
