// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onClickLanguageId} = props
  const {id, language} = languageDetails
  const btnHighLight = isActive ? 'active-btn' : 'add-button'
  console.log(btnHighLight)

  const onClickButton = () => {
    onClickLanguageId(id)
  }

  return (
    <li>
      <button type="button" className={btnHighLight} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
