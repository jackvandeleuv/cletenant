function PageSelectorButton({ pageID, setCurrentPage, isHidden }) {
    const buttonClass = isHidden ? 'pageSelectorButton noDisplay' : 'pageSelectorButton';
    return (
        <button 
            onClick={(() => setCurrentPage(pageID))} 
            id="parcelPage" 
            className={buttonClass}
        >
            Overview
        </button>
    )
}

export default PageSelectorButton;