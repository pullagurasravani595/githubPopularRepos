// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = itemDetails

  return (
    <li className="list-container">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="list-container-heading">{name}</h1>
      <div className="inner-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p className="star-count">
          {starsCount} <span>stars</span>
        </p>
      </div>
      <div className="inner-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-img"
        />
        <p className="star-count">
          {forksCount} <span>forks</span>
        </p>
      </div>
      <div className="inner-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-img"
        />
        <p className="star-count">
          {issuesCount} <span>open issues</span>
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
