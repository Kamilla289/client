import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../data/mokupData'
import './Mockup.css'

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state)

  const activeStyle = isFilterTab
    ? {
      backgroundColor: isActiveTab ? snap.color : 'transparent',
      opacity: isActiveTab ? 1 : 0.5
    }
    : {};

  return (
    <div
      className={`tab-btn ${isFilterTab ? 'filter-tab-btn' : ''}`}
      onClick={handleClick}
      style={activeStyle}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'filter-tab-btn-icon' : 'tab-btn-icon'}`}
      />
    </div>
  )
}

export default Tab