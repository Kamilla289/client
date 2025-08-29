import React from 'react'
import { motive } from '../../data/motive'
import './SectionMain.css'
import ListIcon from '../../assets/image/Ellipse.svg'

const Motive = ({ onlyList, onlyTitle }) => {
  return (
    <div className="main-block">
      <div className="description">
        {!onlyList && <h1>Причина, по которой вы здесь</h1>}
        {!onlyTitle && (
          <div className="list-description">
            {motive.map((item) => (
              <div key={item.id} className="list">
                <img src={ListIcon} alt={item.text} />
                <div className="text-block">{item.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Motive
