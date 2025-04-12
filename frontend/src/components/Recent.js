import React, {useEffect, useState} from 'react'
import Header from './Header'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Download, Trash2, LoaderCircle } from 'lucide-react'
import { format } from 'date-fns'

const Recent = () => {
  const [resultHistory, setResultHistory] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState({status: false, id: null});
  const [error, setError] = useState(null);
  const {auth, user, setUser} = useAuth()
  const userId = auth?.userId;
  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
      const fetchUserData = async ()=>{
          setIsLoading(true)
          if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
          }
  
          try{
            const userResponse = await axiosPrivate.get(`/users/${userId}`);
            setUser(userResponse.data);
            const historyResponse = await axiosPrivate.get(`/users/history/${userId}`);
            const sortedHistory = historyResponse?.data?.history?.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0)
            setResultHistory(sortedHistory)
            if(historyResponse) setIsLoading(false)
            console.log(historyResponse);
          }catch(err){
            setError(err.message)
            console.log(err.message)
            setIsLoading(false)
          console.error("Error fetching user history:", err);
          }
      }
      fetchUserData();
  }, []);

  async function deleteResult (historyId) {
    console.log(historyId)
    try{
      setIsDeleting({status: true, id: `${historyId}`})
      const response = await axiosPrivate.delete(`/users/history/${userId}`);
      const sortedHistory = response?.data?.history?.sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0)
      setResultHistory(sortedHistory)
      if(response)setIsDeleting({status: false, id: null})
    } catch(err){
      setIsDeleting({status: false, id: null})
      console.log(err)
    }
  }

  function printResult(divId) {
    const content = document.getElementById(divId).innerHTML;
  
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Student Bash</title>');
  
    printWindow.document.write(`
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    `);
  
    printWindow.document.write('</head><body className="p-4">');
    printWindow.document.write("<div class='w-full flex items-center justify-center'><img class='text-center' width='100px' src='/unimak.png'/></div>")
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
  
    printWindow.document.close();
    printWindow.focus();
  
    setTimeout(() => {
      printWindow.print()
      setTimeout(() => {
        printWindow.close();
      }, 500);
    }, 1000);
  }

  return (
    <>
        <Header />
        <main className='flex flex-col w-full min-h-[100vh] px-5 items-center justify-center relative'>
            {isLoading ? <div className='flex'><div className='animate-spin'><LoaderCircle size={80} color='#070181' /></div></div> : error && error === "Network Error" ? <div className='text-center'><span className='text-2xl font-bold text-red-500'>Oops!</span><br></br>We couldn’t connect to the server.<br></br>Please check your internet connection and <a className='underline text-red-500' href='/recent'>try again</a></div> : error ? <p>{error}</p> : <>
            <h2 className='font-Montserrat font-bold mb-3 mt-20'>Recent History({resultHistory?.length})</h2>
            <div>{resultHistory && resultHistory.map(history => <div className='flex flex-col gap-2'>
              <div id={`${history._id}`} className="main-div w-full mx-auto border bg-white p-4 sm:p-6 font-Montserrat">
                              <div className="flex flex-col items-center w-full mb-4">
                              <div className="font-bold text-xl text-center">STATEMENT OF RESULTS</div>
                              </div>
              
                              <table className='text-sm w-full'>
                                  <tbody>
                                      <tr>
                                          <td className='border-black py-1 border-[0.5px] px-2 font-bold w-[20%]'>NAME</td>
                                          <td className='border-black py-1 border-[0.5px] px-2'>{user?.firstname} {user?.lastname}</td>
                                      </tr>
                                      <tr>
                                          <td className='border-black py-1 border-[0.5px] px-2 font-bold'>ID NO.</td>
                                          <td className='border-black py-1 border-[0.5px] px-2'>{user?.idNumber}</td>
                                      </tr>
                                      <tr>
                                          <td className='border-black py-1 border-[0.5px] px-2 font-bold'>DEPARTMENT</td>
                                          <td className='border-black py-1 border-[0.5px] px-2'>{history?.department}</td>
                                      </tr>
                                      <tr>
                                          <td className='border-black py-1 border-[0.5px] px-2 font-bold'>PROGRAM</td>
                                          <td className='border-black py-1 border-[0.5px] px-2'>Degree</td>
                                      </tr>
                                  </tbody>
                              </table>
                          
                              <div className="text-center font-bold mb-2 text-sm border border-black z-10 p-1 mt-1 bg-[#ded9c3]">{history?.level}</div>
                          
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                              { history.type === "semester1" || history.type === "both" ?
                              <div>
                                  <div className="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]">FIRST SEMESTER</div>
                                  <table className="w-full border border-black text-xs">
                                  <thead className="bg-[#dcedf4]">
                                      <tr>
                                      <th className="border border-black p-1">Semester Module</th>
                                      <th className="border border-black p-1">Credit Hours</th>
                                      <th className="border border-black p-1">Grade</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {history?.semester1Modules.map(module => {
                                          return <tr key={module.module_name}><td className="border border-black p-1">{module.module_name}</td><td className="border border-black p-1 text-center">{module.credits}CHrs</td><td className="border border-black p-1 text-center">{module.grade}</td></tr>
                                      })}
                                      <tr><td colSpan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{history.semester1Score.totalGrade}</span></td></tr>
                                      <tr><td  colSpan="3" className="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{history.semester1Score.gpa}</span></td></tr>
                                  </tbody>
                                  </table>
                              </div> : ""
                              }
                          
                              { history.type === "semester2" || history.type === "both" ? 
                              <div>
                                  <div className="text-center font-semibold mb-1 border border-black -mt-1 p-1 bg-[#dcedf4]">SECOND SEMESTER</div>
                                  <table className="w-full border border-black text-xs">
                                  <thead className="bg-[#dcedf4]">
                                      <tr>
                                      <th className="border border-black p-1">Semester Module</th>
                                      <th className="border border-black p-1">Credit Hours</th>
                                      <th className="border border-black p-1">Grade</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {history.semester2Modules.map(module => {
                                          return <tr><td className="border border-black p-1">{module.module_name}</td><td className="border border-black p-1 text-center">{module.credits}CHrs</td><td className="border border-black p-1 text-center">{module.grade}</td></tr>
                                      })}
                                      <tr><td colspan="3" className="border border-black p-1 text-center">Semester Total Grade Point (TGP): <span className=''>{history.semester2Score.totalGrade}</span></td></tr>
                                      <tr><td  colspan="3" className="border border-black p-1 text-center">Semester Cumulative GPA (CGPA): <span className=''>{history.semester2Score.gpa}</span></td></tr>
                                  </tbody>
                                  </table>
                              </div> : ""
                              }
                              </div>
                              { history.type === "both" && <>
                                  <div className="text-center text-sm border border-black z-10 p-1 -mt-5">Academic Year Total Grade Point (TGP): <span className='font-normal'>{history.bothSemestersScore.totalGrade}</span></div>
                                  <div className="text-center mb-2 text-sm border border-black z-10 p-1 mt-1">Academic Year Cumulative GPA (CGPA): <span className='font-normal'>{history.bothSemestersScore.gpa}</span></div>
                              </>
                              }
                              
                          
                              <div className="text-red-500 text-xs italic">
                              NOT ISSUED BY THE UNIVERSITY OF MAKENI. 
                              </div>
                              <div className="text-red-600 text-xs italic">{format(history.createdAt, "MMMM do, y")}</div>
                          </div>
                          <div className='flex gap-2'>
                            <button onClick={() => printResult(`${history._id}`)} className='bg-[#070181] text-white py-2 px-4 rounded-md mb-8 flex items-center justify-center gap-1'><Download size={16} />Download</button> 
                            <button onClick={() => deleteResult(`${history._id}`)} className='bg-red-500 text-white py-2 px-4 rounded-md mb-8 flex items-center justify-center gap-1'>{isDeleting.status === true && isDeleting.id === history._id ? <div className='flex gap-2'><div className='animate-spin'><LoaderCircle /></div><>Deleting...</></div> : <><Trash2 size={16} />Delete</>}</button> 
                          </div>
                          
            </div>)}</div></>}
        </main>
    </>
  )
}

export default Recent;