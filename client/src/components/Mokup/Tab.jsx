import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../data/mokupData'
import './Mockup.css'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {

  const snap = useSnapshot(state)

  const activeStyle = isFilterTab && isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'filter-tab-btn' : ''}`}
      onClick={handleClick}
      style={activeStyle}>
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'tab-btn-icon' : 'filter-tab-btn-icon'}`} />
    </div>
  )
}

export default Tab