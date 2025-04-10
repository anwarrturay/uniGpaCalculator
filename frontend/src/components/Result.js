import React, {useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { format } from 'date-fns';

const Result = ({formData, result, semester, semester1Modules, semester2Modules, semester1Score, semester2Score, bothSemestersScore, setResult}) => {
    const {auth, user, setUser} = useAuth()
    const userId = auth?.userId;
    const axiosPrivate = useAxiosPrivate();
    useEffect(()=>{
        const fetchUserData = async ()=>{
    
            if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
            }
    
            try{
            const response = await axiosPrivate.get(`/users/${userId}`);
            setUser(response.data);
            }catch(err){
            console.error("Error fetching user data:", err);
            }
        }
        fetchUserData();
    }, [userId])

    function printResult(divId) {
        const content = document.getElementById(divId).innerHTML;
      
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Student Bash</title>');
      
        printWindow.document.write(`
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        `);
      
        printWindow.document.write('</head><body class="p-4">');
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
      

    console.log(user)

  return (
    <>
        {formData && result === "active" && semester && 
            <div id="result" className='max-w-6xl sm:mx-10 flex flex-col items-end'>
            <div class="main-div max-w-full mx-auto border bg-white border-gray-400 p-4 sm:p-6">
                <div class="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between w-full mb-4">
                <div class="font-bold text-xl">STATEMENT OF RESULTS</div>
                <div class="text-sm">{format(new Date(), "MMMM Mo, y")}</div>
                </div>
            
                <div class="flex flex-col text-sm mb-4 border-gray-400">
                <div className='border border-[#ccc] p-1'><span className='font-bold'>NAME:</span> {user && user?.firstname}</div>
                <div className='border border-[#ccc] p-1 -mt-[0.05rem]'><span className='font-bold'>SURNAME:</span> {user && user?.lastname}</div>
                <div className='border border-[#ccc] p-1 -mt-[0.05rem]'><span className='font-bold'>ID NO.:</span> {user && user?.idNumber}</div>
                <div className='border border-[#ccc] p-1 -mt-[0.05rem]'><span className='font-bold'>DEPARTMENT:</span> {user && user?.department}</div>
                </div>
            
                <div class="text-center font-bold mb-2 text-sm border border-gray-400 z-10 p-1 -mt-[1.05rem] bg-gray-200">{user?.level}</div>
            
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                { semester === "Semester One" || semester === "Both Semesters" ?
                <div>
                    <div class="text-center font-semibold mb-1 border border-gray-400 bg-gray-200 -mt-1">FIRST SEMESTER</div>
                    <table class="w-full border border-gray-400 text-xs">
                    <thead class="bg-gray-200">
                        <tr>
                        <th class="border border-gray-400 p-1">Semester Module</th>
                        <th class="border border-gray-400 p-1">Credit Hours</th>
                        <th class="border border-gray-400 p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester1Modules.map(module => {
                            return <tr><td class="border p-1">{module.module_name}</td><td class="border p-1">{module.credits}CHrs</td><td class="border p-1">{module.grade}</td></tr>
                        })}
                    </tbody>
                    </table>
                    <div class="text-sm border border-gray-400 p-1 bg-gray-200 -mt-[0.05rem">Semester Total Grade Point (TGP): <span className='font-bold'>{semester1Score.totalGrade}</span></div>
                    <div class="text-sm border border-gray-400 bg-gray-200 p-1 -mt-[0.05rem]">Semester Cumulative GPA (CGPA): <span className='font-bold'>{semester1Score.gpa}</span></div>
                </div> : ""
                }
            
                { semester === "Semester Two" || semester === "Both Semesters" ? 
                <div>
                    <div class="text-center font-semibold mb-1 border border-gray-400 bg-gray-200 -mt-1">SECOND SEMESTER</div>
                    <table class="w-full border border-gray-400 text-xs">
                    <thead class="bg-gray-200">
                        <tr>
                        <th class="border border-gray-400 p-1">Semester Module</th>
                        <th class="border border-gray-400 p-1">Credit Hours</th>
                        <th class="border border-gray-400 p-1">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester2Modules.map(module => {
                            return <tr><td class="border p-1">{module.module_name}</td><td class="border p-1">{module.credits}CHrs</td><td class="border p-1">{module.grade}</td></tr>
                        })}
                    </tbody>
                    </table>
                    <div class="text-sm border border-gray-400 p-1 bg-gray-200 -mt-[0.05rem]">Semester Total Grade Point (TGP): <span className='font-bold'>{semester2Score.totalGrade}</span></div>
                    <div class="text-sm border border-gray-400 bg-gray-200 p-1 -mt-[0.05rem]">Semester Cumulative GPA (CGPA): <span className='font-bold'>{semester2Score.gpa}</span></div>
                </div> : ""
                }
                </div>
                { semester === "Both Semesters" &&
                    <div class="text-sm font-medium mb-2">
                Academic Year Total Grade Point (TGP): <span className='font-bold'>{bothSemestersScore.totalGrade}</span><br></br>
                Academic Year Cumulative GPA (CGPA): <span className='font-bold'>{bothSemestersScore.gpa}</span>
                </div>
                }
                
            
                <div class="text-red-600 text-xs italic">
                NOT ISSUED BY THE UNIVERSITY OF MAKENI. 
                </div>
            </div>
            <div className='flex gap-2'>
                <button onClick={() => {setResult("inactive");}} className='bg-[#070181] text-white py-2 px-5 rounded-md mt-4 mb-8'>Close</button>
                <button onClick={() => printResult("result")} className='bg-[#070181] text-white py-2 px-5 rounded-md mt-4 mb-8'>Download</button> 
            </div>
            
            </div>
            }
    </>
  )
}

export default Result