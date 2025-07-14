import React from 'react'
import CustomButton from './CustomButton'
import './Mockup.css'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      <div className="filepicker">
        <input type="file"
          id="file-upload" accept='image/*' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
        <label htmlFor="file-upload" className='filepicker-label'>
          Загрузить файл
        </label>
        <p className='filepicker-text'>
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>

      <div className="filepicker-button-container">
        <CustomButton type='outline' title='Лого' handleClick={() => readFile('logo')} />
        <CustomButton type='filled' title='Текстура' handleClick={() => readFile('full')} />
      </div>
    </div>
  )
}

export default FilePicker