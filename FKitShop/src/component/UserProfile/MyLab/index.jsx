import React from 'react'
import './index.css'

export default function MyLab() {
  return (
    <div className="container">
      <h4 className='text-center'><strong>My LAB</strong></h4>
      <div className="lab-table">
        <table className="table table-bordered">
        <thead className="lab-thead"> 
            <tr>
              <th className="col-8">Lab Title</th>
              <th className="col-2">Download</th> 
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-8">Lab 1</td> 
              <td className='text-center col-2'><a href="#"><box-icon name='download' type='solid' color='#3fe70f' ></box-icon></a></td> 
            </tr>
            <tr>
              <td className="col-8">Lab 2</td>
              <td className='text-center col-2'><a href="#"><box-icon name='download' type='solid' color='#3fe70f' ></box-icon></a></td>
            </tr>
            <tr>
              <td className="col-8">Lab 3</td>
              <td className='text-center col-2'><a href="#"><box-icon name='download' type='solid' color='#3fe70f' ></box-icon></a></td>
            </tr>
            <tr>
              <td className="col-8">Lab 4</td>
              <td className='text-center col-2'><a href="#"><box-icon name='download' type='solid' color='#3fe70f' ></box-icon></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

