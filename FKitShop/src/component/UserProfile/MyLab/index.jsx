import React, { useEffect, useState } from 'react'
import './index.css'
import { getMyLab, downloadMyLab } from '../../../service/userService';


export default function MyLab({ userInfo }) {
  const [labList, setLabList] = useState([]);
  useEffect(() => {
    const fetchGetMyLab = async () => {
      if (userInfo?.accountID) {
        const response = await getMyLab(userInfo.accountID);
        console.log("response in MyLab: ", response.data.orderLabs);
        setLabList(response.data.orderLabs);
      }
    };
    fetchGetMyLab();
  }, [userInfo]);

  const handleDownload = async (lab) => {
    try {
      const response = await downloadMyLab( userInfo?.accountID,lab.orderID,lab.lab.labID,lab.lab.productID,lab.lab.fileNamePDF);
      window.location.href = response;
    } catch (error) {
      console.error('Error downloading lab:', error);
      // Có thể hiển thị thông báo lỗi cho người dùng ở đây
    }
  };

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
            {labList.map((lab) => (
              <tr key={lab.lab.labID}>
                <td className="col-8">{lab.lab.fileNamePDF}</td>
                <td className='text-center col-2'>
                  <button className='btn' onClick={(e) => {
                    handleDownload(lab);
                  }}>
                    <box-icon name='download' type='solid' color='#3fe70f'></box-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
